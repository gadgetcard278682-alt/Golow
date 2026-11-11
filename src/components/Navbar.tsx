import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { Calendar, Menu, X, Sparkles, User, Compass, Palette, Check } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenMyBookings: () => void;
  onOpenProfile: () => void;
  onOpenTutorial: () => void;
  bookingsCount: number;
  userProfile: UserProfile;
  currentTheme: 'gold' | 'noir' | 'rose' | 'emerald';
  onThemeChange: (theme: 'gold' | 'noir' | 'rose' | 'emerald') => void;
}

export const STUDIO_THEMES = [
  { id: 'gold', name: 'Imperial Gold', dot: 'bg-[#c59b53]', desc: 'Signature Warm Gold' },
  { id: 'noir', name: 'Midnight Noir', dot: 'bg-slate-400', desc: 'Obsidian & Platinum' },
  { id: 'rose', name: 'Rose Quartz', dot: 'bg-rose-400', desc: 'Blush Velvet Glow' },
  { id: 'emerald', name: 'Emerald Royale', dot: 'bg-emerald-500', desc: 'Deep Jewel Velvet' }
] as const;

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyBookings,
  onOpenProfile,
  onOpenTutorial,
  bookingsCount,
  userProfile,
  currentTheme,
  onThemeChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Glass Skin', href: '#glass-skin' },
    { label: 'Imperial Bridal', href: '#bridal' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' }
  ];

  const initials = userProfile.username.trim()
    ? userProfile.username.trim().split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'G';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#19120f]/95 backdrop-blur-xl py-2.5 border-b border-[#dfc18b]/40 shadow-3d-header'
            : 'bg-gradient-to-b from-[#19120f]/95 via-[#19120f]/75 to-transparent py-4 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Zone 1: 3D Brand Emblem & Wordmark */}
          <a
            href="#home"
            className="group flex items-center gap-3.5 leading-none whitespace-nowrap shrink-0 transform-style-3d hover:scale-[1.02] transition-transform duration-300"
          >
            {/* 3D Jewel Emblem */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl p-[1.5px] bg-gradient-to-br from-[#f5e4cc] via-[#dfc18b] to-[#8b6528] shadow-[0_8px_16px_-2px_rgba(179,133,59,0.5),inset_0_1px_1px_rgba(255,255,255,0.8)] transform-style-3d group-hover:rotate-6 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-[#2a1d17] to-[#120d0a] flex items-center justify-center border border-[#dfc18b]/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(223,193,139,0.4),transparent_60%)]" />
                <Sparkles className="w-5 h-5 text-[#dfc18b] drop-shadow-[0_2px_8px_rgba(223,193,139,0.8)] relative z-10" />
              </div>
            </div>

            {/* 3D Extruded Brand Typography */}
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white text-3d-gold flex items-center gap-1.5 leading-tight">
                Glow
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfc18b] shadow-[0_0_8px_#dfc18b]" />
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase font-semibold text-[#dfc18b] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-0.5">
                Beauty Studio
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium tracking-[0.18em] uppercase text-[#ded3cb]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-[#dfc18b] transition-colors whitespace-nowrap group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-[#dfc18b] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(223,193,139,0.8)]" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action + Theme Switcher + Profile + Tour + Visits */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Switcher Button */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#c59b53]/30 text-[#dfc18b] hover:text-white transition-colors flex items-center gap-1.5 text-xs px-2.5"
                title="Change studio atmosphere theme"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px] font-medium text-[#ded3cb] capitalize">
                  {currentTheme}
                </span>
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#19120f] border border-[#c59b53]/40 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn">
                  <span className="text-[10px] uppercase tracking-wider text-[#dfc18b] font-semibold px-2 py-1 block">
                    Studio Ambiance Theme
                  </span>
                  <div className="space-y-1">
                    {STUDIO_THEMES.map((thm) => (
                      <button
                        key={thm.id}
                        onClick={() => {
                          onThemeChange(thm.id);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors ${
                          currentTheme === thm.id
                            ? 'bg-[#c59b53]/25 text-[#dfc18b] font-semibold'
                            : 'text-[#ded3cb] hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${thm.dot}`} />
                          <span>{thm.name}</span>
                        </div>
                        {currentTheme === thm.id && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tutorial trigger */}
            <button
              onClick={onOpenTutorial}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#ded3cb] hover:text-[#dfc18b] border border-white/10 hover:border-[#c59b53]/30 rounded transition-colors"
              title="Launch interactive step-by-step app tour"
            >
              <Compass className="w-3.5 h-3.5 text-[#dfc18b]" />
              <span className="hidden xl:inline">Studio Tour</span>
            </button>

            {/* User Profile trigger with customizable avatar preview */}
            <button
              onClick={onOpenProfile}
              className="group flex items-center gap-2 p-1 pl-2 sm:pr-2.5 bg-white/5 hover:bg-white/10 border border-[#c59b53]/30 rounded-full transition-colors"
              title="Manage your user profile & avatar"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-[#19120f] border border-[#c59b53] flex items-center justify-center shrink-0">
                {userProfile.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.username}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${userProfile.avatarColor} flex items-center justify-center text-[10px] font-bold text-white font-serif`}>
                    {initials}
                  </div>
                )}
              </div>
              <span className="hidden sm:inline text-[11px] font-medium text-[#ded3cb] group-hover:text-white max-w-[85px] truncate">
                {userProfile.username.split(' ')[0]}
              </span>
            </button>

            {/* My Bookings drawer trigger */}
            {bookingsCount > 0 && (
              <button
                onClick={onOpenMyBookings}
                className="relative hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#dfc18b] bg-[#c59b53]/15 border border-[#c59b53]/40 rounded hover:bg-[#c59b53]/25 transition-colors whitespace-nowrap"
                title="View your scheduled appointments"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Visits ({bookingsCount})</span>
              </button>
            )}

            {/* 3D Primary Action Button */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-[#19120f] bg-gradient-to-r from-[#f5e4cc] via-[#dfc18b] to-[#b3853b] hover:from-white hover:to-[#dfc18b] rounded-lg transition-all duration-300 shadow-3d-button hover:scale-[1.02] active:scale-[0.98] border border-[#dfc18b]/60 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#19120f]" />
              <span className="font-extrabold hidden xs:inline">Book</span>
              <span className="font-extrabold hidden sm:inline">Appointment</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-white hover:text-[#dfc18b] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#19120f]/95 backdrop-blur-xl lg:hidden flex flex-col justify-center px-8 animate-fadeIn">
          <div className="space-y-5 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-serif text-2xl text-white hover:text-[#dfc18b] transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-6 border-t border-[#c59b53]/20 flex flex-col gap-3 max-w-xs mx-auto">
              {/* Mobile theme chooser */}
              <div className="flex items-center justify-center gap-2 py-2">
                <span className="text-xs text-[#ded3cb]">Theme:</span>
                {STUDIO_THEMES.map((thm) => (
                  <button
                    key={thm.id}
                    onClick={() => onThemeChange(thm.id)}
                    className={`px-2 py-1 text-[11px] rounded border ${
                      currentTheme === thm.id
                        ? 'border-[#dfc18b] text-[#dfc18b] font-bold bg-[#c59b53]/20'
                        : 'border-white/20 text-[#ded3cb]'
                    }`}
                  >
                    {thm.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full py-2.5 text-xs tracking-[0.14em] uppercase font-medium text-[#ded3cb] border border-white/20 rounded flex items-center justify-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#dfc18b]" />
                <span>My Profile ({userProfile.username.split(' ')[0]})</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTutorial();
                }}
                className="w-full py-2.5 text-xs tracking-[0.14em] uppercase font-medium text-[#dfc18b] border border-[#c59b53]/40 rounded flex items-center justify-center gap-2"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Interactive App Tour</span>
              </button>

              {bookingsCount > 0 && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenMyBookings();
                  }}
                  className="w-full py-2.5 text-xs tracking-[0.14em] uppercase font-medium text-[#dfc18b] border border-[#c59b53]/40 rounded"
                >
                  My Scheduled Visits ({bookingsCount})
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-xs tracking-[0.16em] uppercase font-bold text-[#19120f] bg-gradient-to-r from-[#dfc18b] to-[#b3853b] rounded"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
