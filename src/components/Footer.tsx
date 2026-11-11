import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Sparkles, User, HelpCircle, Shield } from 'lucide-react';

interface FooterProps {
  onOpenProfile: () => void;
  onOpenTutorial: () => void;
  onOpenBooking: () => void;
  onOpenSuperuser?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenProfile,
  onOpenTutorial,
  onOpenBooking,
  onOpenSuperuser,
}) => {
  return (
    <footer className="bg-[#140e0b] text-[#ded3cb] border-t border-[#c59b53]/25 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#c59b53]/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="inline-block">
              <span className="font-serif text-3xl font-semibold tracking-wider text-white flex items-center gap-1.5">
                Glow
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b53]" />
              </span>
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#dfc18b] font-medium block mt-0.5">
                Beauty Studio
              </span>
            </a>
            <p className="text-xs sm:text-sm text-[#ded3cb]/80 leading-relaxed font-light max-w-sm">
              Redefining luxury beauty, holistic skincare, and imperial bridal styling with heartfelt hospitality and cruelty-free international formulations.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenProfile}
                className="inline-flex items-center gap-1.5 text-xs text-[#dfc18b] hover:text-white transition-colors bg-white/5 border border-[#c59b53]/30 px-3 py-1.5 rounded"
              >
                <User className="w-3.5 h-3.5" />
                <span>Guest Profile</span>
              </button>
              <button
                onClick={onOpenTutorial}
                className="inline-flex items-center gap-1.5 text-xs text-[#ded3cb] hover:text-[#dfc18b] transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Interactive Tour</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#dfc18b] block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-[#ded3cb]/80">
              <li><a href="#home" className="hover:text-[#dfc18b] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#dfc18b] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#dfc18b] transition-colors">Our Services</a></li>
              <li><a href="#bridal" className="hover:text-[#dfc18b] transition-colors">Bridal Suite</a></li>
              <li><a href="#gallery" className="hover:text-[#dfc18b] transition-colors">3D Gallery</a></li>
              <li><a href="#faq" className="hover:text-[#dfc18b] transition-colors">FAQs</a></li>
              <li><a href="#appointment" className="text-[#dfc18b] hover:text-white transition-colors font-semibold">Request Appointment</a></li>
            </ul>
          </div>

          {/* Studio Hours */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#dfc18b] block">
              Hours &amp; Location
            </span>
            <div className="space-y-2 text-xs text-[#ded3cb]/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#dfc18b] shrink-0 mt-0.5" />
                <span>Mon – Sun: 10:00 AM – 8:30 PM (No weekly off)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#dfc18b] shrink-0 mt-0.5" />
                <span>123 Beauty Lane, Green Park, New Delhi - 110016</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#dfc18b] shrink-0 mt-0.5" />
                <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
              </div>
            </div>
          </div>

          {/* Concierge & WhatsApp */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#dfc18b] block">
              Concierge Direct
            </span>
            <p className="text-xs text-[#ded3cb]/80 leading-relaxed">
              Have an urgent bridal inquiry or want to check immediate walk-in availability?
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20Glow%20Beauty%20Studio,%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs uppercase tracking-[0.14em] font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded transition-colors shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 text-xs uppercase tracking-[0.14em] font-bold text-[#19120f] bg-gradient-to-r from-[#dfc18b] to-[#b3853b] hover:from-[#e8ce9e] hover:to-[#c59b53] rounded transition-colors text-center"
            >
              Book Online Now
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ded3cb]/60">
          <div>
            © 2026 Glow Beauty Studio. All Rights Reserved. Crafted for elegance &amp; glow.
          </div>
          <div className="flex items-center gap-3.5 flex-wrap">
            <button onClick={onOpenTutorial} className="hover:text-[#dfc18b] transition-colors">
              App Tour Guide
            </button>
            <span>·</span>
            <button onClick={onOpenProfile} className="hover:text-[#dfc18b] transition-colors">
              VIP Profile
            </button>
            {onOpenSuperuser && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenSuperuser}
                  className="text-[#dfc18b] hover:text-white font-semibold transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dfc18b]/15 hover:bg-[#dfc18b]/25 border border-[#dfc18b]/35 shadow-sm"
                  title="Admin Panel"
                >
                  <Shield className="w-3.5 h-3.5 text-[#dfc18b]" />
                  <span>Admin Panel</span>
                </button>
              </>
            )}
            <span>·</span>
            <a href="#services" className="hover:text-[#dfc18b] transition-colors">
              Rituals Menu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
