import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Booking } from '../types';

/**
 * Extracts standard Supabase project ID from an ID, domain, or full URL
 */
export function extractProjectId(raw?: string): string {
  const fallback = 'efiwuqhosbnlgrfzdhct';
  if (!raw || typeof raw !== 'string') return fallback;
  const clean = raw.trim();
  if (!clean) return fallback;

  // Extract from full URL e.g. https://efiwuqhosbnlgrfzdhct.supabase.co
  const match = clean.match(/(?:https?:\/\/)?([a-z0-9_-]+)(?:\.supabase\.co)/i);
  if (match && match[1]) {
    return match[1];
  }
  // If it's a bare alphanumeric project id
  if (/^[a-z0-9_-]+$/i.test(clean)) {
    return clean;
  }
  return fallback;
}

/**
 * Normalizes any Supabase URL, bare project ID, or domain into a valid HTTPS URL
 */
export function normalizeSupabaseUrl(rawUrlOrId?: string): string {
  const defaultProjectId = 'efiwuqhosbnlgrfzdhct';
  if (!rawUrlOrId || typeof rawUrlOrId !== 'string') {
    return `https://${defaultProjectId}.supabase.co`;
  }
  const clean = rawUrlOrId.trim();
  if (!clean) {
    return `https://${defaultProjectId}.supabase.co`;
  }

  // If already starts with http:// or https://
  if (/^https?:\/\//i.test(clean)) {
    // If it's a protocol + bare project ID like http://efiwuqhosbnlgrfzdhct
    if (!clean.includes('.')) {
      const id = clean.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
      return `https://${id}.supabase.co`;
    }
    return clean;
  }

  // If it's a domain like efiwuqhosbnlgrfzdhct.supabase.co
  if (clean.includes('.supabase.co')) {
    return `https://${clean.replace(/^\/+/, '')}`;
  }

  // If it's just the project ID e.g. "efiwuqhosbnlgrfzdhct"
  return `https://${clean}.supabase.co`;
}

// User-provided Project ID and publishable API Key
export const SUPABASE_PROJECT_ID = extractProjectId(
  import.meta.env.VITE_SUPABASE_PROJECT_ID || import.meta.env.VITE_SUPABASE_URL || 'efiwuqhosbnlgrfzdhct'
);

export const SUPABASE_URL = normalizeSupabaseUrl(
  import.meta.env.VITE_SUPABASE_URL || SUPABASE_PROJECT_ID
);

export const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY && import.meta.env.VITE_SUPABASE_ANON_KEY.trim()) ||
  'sb_publishable_79mDOUDXNdu_DUT-2Q2c3w_g6j2EIxf';

// Initialize Supabase Client with fail-safe initialization
let client: SupabaseClient | null = null;
let initError: string | null = null;

try {
  client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
} catch (err: any) {
  console.warn('Supabase client initialization warning:', err?.message || err);
  initError = err?.message || 'Invalid configuration';
}

export const supabase = client as SupabaseClient;
export const supabaseInitializationError = initError;

// SQL Schema script for user's convenience in Supabase SQL Editor
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql)

CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  booking_code TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT,
  service_name TEXT NOT NULL,
  stylist_name TEXT,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  notes TEXT,
  total_price NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts (for website booking requests)
CREATE POLICY "Allow public booking requests" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

-- Allow reading appointments for client verification & superuser dashboard
CREATE POLICY "Allow reading appointments" 
ON public.appointments 
FOR SELECT 
USING (true);

-- Allow updating appointment status
CREATE POLICY "Allow updating appointments" 
ON public.appointments 
FOR UPDATE 
USING (true);

-- Allow deleting appointments
CREATE POLICY "Allow deleting appointments" 
ON public.appointments 
FOR DELETE 
USING (true);
`;

/**
 * Save booking into Supabase database table 'appointments'
 */
export async function saveAppointmentToSupabase(booking: Booking): Promise<{
  success: boolean;
  error?: string;
  isFallback?: boolean;
}> {
  if (!supabase || typeof supabase.from !== 'function') {
    return { success: false, error: 'Database client not initialized', isFallback: true };
  }

  try {
    const payload = {
      id: booking.id,
      booking_code: booking.bookingCode,
      client_name: booking.clientName,
      client_phone: booking.clientPhone,
      client_email: booking.clientEmail || '',
      service_name: booking.serviceName,
      stylist_name: booking.stylistName || 'Any Available Senior Specialist',
      booking_date: booking.date,
      time_slot: booking.timeSlot,
      notes: booking.notes || '',
      total_price: booking.totalPrice || 0,
      status: booking.status || 'Confirmed'
    };

    const { error } = await supabase.from('appointments').insert([payload]);

    if (error) {
      console.warn('Supabase insert notice:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to save to Supabase:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * Fetch all appointments from Supabase
 */
export async function fetchAppointmentsFromSupabase(): Promise<{
  data: Booking[];
  error?: string;
  isLive: boolean;
}> {
  if (!supabase || typeof supabase.from !== 'function') {
    return { data: [], error: 'Database client not initialized', isLive: false };
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: [], error: error.message, isLive: false };
    }

    const mapped: Booking[] = (data || []).map((row: any) => ({
      id: row.id || `sup-${Date.now()}`,
      bookingCode: row.booking_code || 'GLW-0000',
      clientName: row.client_name || 'Guest',
      clientPhone: row.client_phone || '',
      clientEmail: row.client_email || '',
      serviceName: row.service_name || 'General Service',
      stylistName: row.stylist_name || 'Senior Specialist',
      date: row.booking_date || new Date().toISOString().split('T')[0],
      timeSlot: row.time_slot || '10:00 AM',
      notes: row.notes || '',
      totalPrice: Number(row.total_price) || 0,
      status: row.status || 'Confirmed',
      createdAt: row.created_at ? new Date(row.created_at).toLocaleDateString() : 'Today'
    }));

    return { data: mapped, isLive: true };
  } catch (err: any) {
    return { data: [], error: err?.message || 'Failed to connect', isLive: false };
  }
}

/**
 * Update appointment status in Supabase
 */
export async function updateAppointmentStatusInSupabase(
  bookingId: string,
  newStatus: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
): Promise<boolean> {
  if (!supabase || typeof supabase.from !== 'function') return false;

  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', bookingId);

    return !error;
  } catch (err) {
    console.error('Update status failed', err);
    return false;
  }
}

/**
 * Delete appointment from Supabase
 */
export async function deleteAppointmentFromSupabase(bookingId: string): Promise<boolean> {
  if (!supabase || typeof supabase.from !== 'function') return false;

  try {
    const { error } = await supabase.from('appointments').delete().eq('id', bookingId);
    return !error;
  } catch (err) {
    console.error('Delete failed', err);
    return false;
  }
}
