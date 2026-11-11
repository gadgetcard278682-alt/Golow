import React, { useState, useEffect } from 'react';
import {
  Shield,
  Key,
  Database,
  CheckCircle,
  Clock,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Copy,
  ExternalLink,
  X,
  FileSpreadsheet,
  AlertCircle,
  Lock,
  LogOut,
  UserCheck
} from 'lucide-react';
import { Booking } from '../types';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_SETUP_SQL,
  fetchAppointmentsFromSupabase,
  updateAppointmentStatusInSupabase,
  deleteAppointmentFromSupabase
} from '../lib/supabase';

interface SuperuserModalProps {
  isOpen: boolean;
  onClose: () => void;
  localBookings: Booking[];
  onUpdateBookings: (bookings: Booking[]) => void;
}

export const SuperuserModal: React.FC<SuperuserModalProps> = ({
  isOpen,
  onClose,
  localBookings,
  onUpdateBookings
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('glow_superuser_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'appointments' | 'database' | 'sql'>('appointments');
  const [appointments, setAppointments] = useState<Booking[]>(localBookings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupabaseLive, setIsSupabaseLive] = useState<boolean | null>(null);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedSql, setCopiedSql] = useState(false);

  // Load bookings from Supabase on open
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAppointments();
    }
  }, [isOpen, isAuthenticated]);

  const loadAppointments = async () => {
    setIsLoading(true);
    setSyncMessage('');
    const res = await fetchAppointmentsFromSupabase();

    if (res.isLive && res.data.length > 0) {
      setAppointments(res.data);
      setIsSupabaseLive(true);
      setSyncMessage(`Synced ${res.data.length} appointments from Supabase.`);
    } else if (res.isLive && res.data.length === 0) {
      setAppointments(localBookings);
      setIsSupabaseLive(true);
      setSyncMessage('Supabase connected! No records in remote table yet (showing local cache).');
    } else {
      setIsSupabaseLive(false);
      setAppointments(localBookings);
      setSyncMessage(res.error ? `Notice: ${res.error}. Showing local cache.` : 'Using local cache.');
    }
    setIsLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    // Authorized credentials check
    const isAuthorizedUser =
      inputUser === 'piyushsingh32459@gmail.com' ||
      inputUser === 'piyush' ||
      inputUser === 'admin' ||
      inputUser === 'superuser' ||
      inputUser === 'gadgetcard278682@gmail.com';

    const isAuthorizedPass =
      inputPass === 'piyush@278682' ||
      inputPass === 'GlowAdmin2026!' ||
      inputPass === 'admin' ||
      inputPass === '123456';

    if (isAuthorizedUser && isAuthorizedPass) {
      setIsAuthenticated(true);
      localStorage.setItem('glow_superuser_auth', 'true');
      loadAppointments();
    } else {
      setLoginError('गलत ईमेल या पासवर्ड! कृपया सही विवरण दर्ज करें।');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('glow_superuser_auth');
    setUsername('');
    setPassword('');
  };

  const handleStatusChange = async (
    bookingId: string,
    newStatus: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
  ) => {
    // Optimistic update
    const updated = appointments.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b));
    setAppointments(updated);
    onUpdateBookings(updated);

    // Sync to Supabase
    await updateAppointmentStatusInSupabase(bookingId, newStatus);
  };

  const handleDelete = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to remove this appointment?')) return;

    const updated = appointments.filter((b) => b.id !== bookingId);
    setAppointments(updated);
    onUpdateBookings(updated);

    await deleteAppointmentFromSupabase(bookingId);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleExportCsv = () => {
    const headers = [
      'Booking Reference',
      'Client Name',
      'Phone',
      'Email',
      'Service',
      'Stylist',
      'Date',
      'Time Slot',
      'Amount (INR)',
      'Status',
      'Notes'
    ];

    const rows = appointments.map((b) => [
      `"${b.bookingCode}"`,
      `"${b.clientName}"`,
      `"${b.clientPhone}"`,
      `"${b.clientEmail || ''}"`,
      `"${b.serviceName}"`,
      `"${b.stylistName}"`,
      `"${b.date}"`,
      `"${b.timeSlot}"`,
      b.totalPrice,
      `"${b.status}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `glow-appointments-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredAppointments = appointments.filter((b) => {
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientPhone.includes(searchQuery) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative bg-[#19120f] text-[#ded3cb] w-full max-w-5xl rounded-3xl border border-[#dfc18b]/40 shadow-3d-card overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#c59b53]/25 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfc18b]/25 to-[#c59b53]/10 border border-[#dfc18b]/50 flex items-center justify-center text-[#dfc18b]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-white">
                  Admin Panel (एडमिन पैनल)
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Supabase Powered
                </span>
              </div>
              <span className="text-[11px] text-[#ded3cb]/70">
                Salon Management &amp; Cloud Database Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Log out from superuser session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-[#ded3cb]/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Superuser Login Form */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#c59b53]/20 border border-[#dfc18b]/40 flex items-center justify-center text-[#dfc18b] shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif text-2xl font-semibold text-white mb-1.5">
                Admin Panel (एडमिन पैनल)
              </h4>
              <p className="text-xs text-[#ded3cb]/70 leading-relaxed font-light">
                Sign in to view real-time appointments, inspect Supabase database records, and manage salon bookings.
              </p>
            </div>

            {loginError && (
              <div className="w-full p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs rounded-xl flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#dfc18b] font-medium mb-1.5">
                  Admin Email / Gmail *
                </label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full px-4 py-2.5 bg-black/50 border border-[#c59b53]/40 rounded-xl text-white text-xs focus:outline-none focus:border-[#dfc18b] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#dfc18b] font-medium mb-1.5">
                  Admin Password *
                </label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 bg-black/50 border border-[#c59b53]/40 rounded-xl text-white text-xs focus:outline-none focus:border-[#dfc18b] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-[0.16em] bg-gradient-to-r from-[#dfc18b] via-[#c59b53] to-[#b3853b] hover:from-[#e8ce9e] hover:to-[#c59b53] text-[#19120f] shadow-3d-button transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Open Admin Panel (लॉग इन करें)</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Superuser Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation Tabs */}
            <div className="px-6 pt-3 border-b border-[#c59b53]/20 flex items-center justify-between gap-4 bg-black/20 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'appointments'
                      ? 'border-[#dfc18b] text-[#dfc18b]'
                      : 'border-transparent text-[#ded3cb]/70 hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Appointments ({appointments.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('database')}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'database'
                      ? 'border-[#dfc18b] text-[#dfc18b]'
                      : 'border-transparent text-[#ded3cb]/70 hover:text-white'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Supabase Config</span>
                </button>

                <button
                  onClick={() => setActiveTab('sql')}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'sql'
                      ? 'border-[#dfc18b] text-[#dfc18b]'
                      : 'border-transparent text-[#ded3cb]/70 hover:text-white'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  <span>SQL Setup Script</span>
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 pb-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSupabaseLive ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'
                  }`}
                />
                <span className="text-[11px] text-[#ded3cb]/80">
                  {isSupabaseLive ? 'Supabase Live' : 'Local + Supabase Proxy'}
                </span>
                <button
                  onClick={loadAppointments}
                  disabled={isLoading}
                  className="p-1 text-[#dfc18b] hover:text-white transition-colors"
                  title="Reload appointments"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Tab 1: Appointments List */}
            {activeTab === 'appointments' && (
              <div className="flex-1 flex flex-col p-6 overflow-hidden">
                {/* Search & Actions Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#ded3cb]/50" />
                    <input
                      type="text"
                      placeholder="Search by client, phone, ref..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-black/40 border border-[#c59b53]/30 rounded-xl text-white text-xs focus:outline-none focus:border-[#dfc18b]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 bg-black/40 border border-[#c59b53]/30 rounded-xl text-white text-xs focus:outline-none focus:border-[#dfc18b]"
                    >
                      <option value="all">All Statuses</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={handleExportCsv}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-[#dfc18b] hover:text-[#19120f] border border-[#dfc18b]/40 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {syncMessage && (
                  <div className="mb-3 text-[11px] text-amber-300 bg-amber-950/40 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                    {syncMessage}
                  </div>
                )}

                {/* Table */}
                <div className="flex-1 overflow-y-auto rounded-2xl border border-[#c59b53]/20 bg-black/30">
                  {filteredAppointments.length === 0 ? (
                    <div className="text-center py-16 text-[#ded3cb]/60 font-light text-xs">
                      No appointments match the criteria. New requests filled from the website form will appear here in real-time.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs">
                      <thead className="bg-black/60 text-[#dfc18b] uppercase tracking-wider text-[10px] sticky top-0 border-b border-[#c59b53]/30">
                        <tr>
                          <th className="p-3.5">Ref / Client</th>
                          <th className="p-3.5">Contact</th>
                          <th className="p-3.5">Ritual &amp; Specialist</th>
                          <th className="p-3.5">Schedule</th>
                          <th className="p-3.5">Price</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#c59b53]/10">
                        {filteredAppointments.map((appt) => (
                          <tr key={appt.id} className="hover:bg-white/[0.03] transition-colors">
                            <td className="p-3.5 font-medium">
                              <span className="font-mono text-[#dfc18b] block">{appt.bookingCode}</span>
                              <strong className="text-white text-sm block mt-0.5">{appt.clientName}</strong>
                            </td>
                            <td className="p-3.5 text-[#ded3cb]/90">
                              <div>{appt.clientPhone}</div>
                              {appt.clientEmail && (
                                <div className="text-[11px] text-[#ded3cb]/60">{appt.clientEmail}</div>
                              )}
                            </td>
                            <td className="p-3.5">
                              <span className="text-white font-medium block">{appt.serviceName}</span>
                              <span className="text-[11px] text-[#ded3cb]/70 block">{appt.stylistName}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="text-white block font-medium">{appt.date}</span>
                              <span className="text-[11px] text-[#dfc18b] block">{appt.timeSlot}</span>
                            </td>
                            <td className="p-3.5 font-serif text-sm font-semibold text-[#dfc18b] tabular-nums">
                              ₹{appt.totalPrice.toLocaleString()}
                            </td>
                            <td className="p-3.5">
                              <select
                                value={appt.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    appt.id,
                                    e.target.value as 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
                                  )
                                }
                                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-black/60 ${
                                  appt.status === 'Confirmed'
                                    ? 'border-emerald-500/50 text-emerald-300'
                                    : appt.status === 'Completed'
                                    ? 'border-sky-500/50 text-sky-300'
                                    : appt.status === 'Cancelled'
                                    ? 'border-red-500/50 text-red-300'
                                    : 'border-amber-500/50 text-amber-300'
                                }`}
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => handleDelete(appt.id)}
                                className="p-1.5 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete appointment"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Database Connection & Credentials */}
            {activeTab === 'database' && (
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="font-serif text-xl font-semibold text-white mb-1">
                    Supabase Live Connection Details
                  </h4>
                  <p className="text-xs text-[#ded3cb]/70 font-light">
                    Configured with your secure Cloud Database and API Key. All appointment form submissions sync directly into this database.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-[#c59b53]/30 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#dfc18b] font-bold block">
                      Database Engine
                    </span>
                    <span className="font-mono text-sm text-white block">
                      Supabase Cloud DB (Connected)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-[#c59b53]/30 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#dfc18b] font-bold block">
                      Target Table Name
                    </span>
                    <span className="font-mono text-sm text-emerald-400 block">
                      public.appointments
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-[#c59b53]/30 space-y-1 md:col-span-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#dfc18b] font-bold block">
                      Supabase Endpoint URL
                    </span>
                    <span className="font-mono text-xs text-white block select-all break-all">
                      {SUPABASE_URL}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-[#c59b53]/30 space-y-1 md:col-span-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#dfc18b] font-bold block">
                      Supabase API Key (Publishable / Anon)
                    </span>
                    <span className="font-mono text-xs text-amber-300 block select-all break-all">
                      {SUPABASE_ANON_KEY}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#c59b53]/10 border border-[#dfc18b]/30 flex items-center justify-between gap-4">
                  <div>
                    <strong className="text-white text-xs block font-semibold">
                      Open Supabase Console
                    </strong>
                    <span className="text-[11px] text-[#ded3cb]/70">
                      View your tables, run queries, and monitor real-time requests directly on Supabase.
                    </span>
                  </div>

                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#dfc18b] to-[#b3853b] text-[#19120f] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
                  >
                    <span>Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Tab 3: SQL Setup Script */}
            {activeTab === 'sql' && (
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-xl font-semibold text-white mb-1">
                      SQL Table Setup Script
                    </h4>
                    <p className="text-xs text-[#ded3cb]/70 font-light">
                      If you haven't created the <code className="text-[#dfc18b]">appointments</code> table yet, paste this SQL in your Supabase SQL Editor.
                    </p>
                  </div>

                  <button
                    onClick={handleCopySql}
                    className="px-4 py-2 rounded-xl bg-[#c59b53]/20 hover:bg-[#c59b53]/30 border border-[#dfc18b]/50 text-xs text-[#dfc18b] font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL'}</span>
                  </button>
                </div>

                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-black/80 border border-[#c59b53]/30 text-xs font-mono text-emerald-300 overflow-x-auto max-h-72 leading-relaxed">
                    {SUPABASE_SETUP_SQL}
                  </pre>
                </div>

                <div className="flex items-center justify-between text-xs text-[#ded3cb]/80 pt-2">
                  <span>
                    Direct SQL Console:{' '}
                    <a
                      href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#dfc18b] hover:text-white underline font-medium"
                    >
                      Open Supabase SQL Dashboard ↗
                    </a>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
