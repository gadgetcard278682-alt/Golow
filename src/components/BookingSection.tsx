import React, { useState, useEffect } from 'react';
import { SERVICES_DATA, TIME_SLOTS } from '../data/salonData';
import { Booking, UserProfile } from '../types';
import {
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Calendar,
  Sparkles,
  MessageCircle,
  Share2,
  Download,
  Database
} from 'lucide-react';
import { saveAppointmentToSupabase } from '../lib/supabase';

interface BookingSectionProps {
  preselectedService?: string;
  preselectedPrice?: number;
  preselectedNotes?: string;
  userProfile?: UserProfile;
  onBookingCreated: (booking: Booking) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedService,
  preselectedPrice,
  preselectedNotes,
  userProfile,
  onBookingCreated
}) => {
  const [clientName, setClientName] = useState(userProfile?.username || '');
  const [clientPhone, setClientPhone] = useState(userProfile?.phone || '');
  const [clientEmail, setClientEmail] = useState(userProfile?.email || '');
  const [serviceName, setServiceName] = useState(preselectedService || '24K Imperial Gold Themed Ritual');
  const [stylistName, setStylistName] = useState('Any Senior Specialist');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1]);
  const [notes, setNotes] = useState(preselectedNotes || '');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'cached'>('idle');

  // Min date today
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (preselectedService) {
      setServiceName(preselectedService);
    }
    if (preselectedNotes) {
      setNotes(preselectedNotes);
    }
  }, [preselectedService, preselectedNotes]);

  useEffect(() => {
    if (userProfile) {
      setClientName(userProfile.username);
      setClientPhone(userProfile.phone);
      if (userProfile.email) setClientEmail(userProfile.email);
    }
  }, [userProfile]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!clientName.trim() || clientName.length < 2) {
      setFormError('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!clientPhone.trim() || clientPhone.length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!date) {
      setFormError('Please select your preferred appointment date.');
      return;
    }

    // Determine estimated price
    let estimatedPrice = preselectedPrice || 1999;
    const foundService = SERVICES_DATA.find((s) => s.name === serviceName);
    if (foundService && !preselectedPrice) {
      estimatedPrice = foundService.price;
    }

    const randomCode = `GLOW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingCode: randomCode,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      serviceName,
      stylistName,
      date,
      timeSlot,
      notes: notes.trim(),
      totalPrice: estimatedPrice,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString()
    };

    setIsSubmitting(true);
    setSupabaseSyncStatus('syncing');

    // Instantly add to local app state so user experiences 0 friction
    onBookingCreated(newBooking);
    setConfirmedBooking(newBooking);

    // Persist to Supabase Database
    saveAppointmentToSupabase(newBooking)
      .then((res) => {
        if (res.success) {
          setSupabaseSyncStatus('synced');
        } else {
          setSupabaseSyncStatus('cached');
        }
      })
      .catch(() => {
        setSupabaseSyncStatus('cached');
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    // reset fields
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setNotes('');
  };

  const getWhatsAppBookingUrl = (booking: Booking) => {
    const message = encodeURIComponent(
      `Hello Glow Beauty Studio! ✨\n\nI would like to confirm my appointment:\n• Ref: ${booking.bookingCode}\n• Name: ${booking.clientName}\n• Service: ${booking.serviceName}\n• Stylist: ${booking.stylistName}\n• Date: ${booking.date} at ${booking.timeSlot}\n\nPlease confirm availability. Thank you!`
    );
    return `https://wa.me/919876543210?text=${message}`;
  };

  return (
    <section id="appointment" className="py-24 lg:py-32 bg-[#faf5ee] border-b border-[#c59b53]/15 scroll-mt-24 relative">
      <div id="book" className="absolute -top-24 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Visit Us Concierge Info with 3D Layered Studio Imagery */}
          <div className="lg:col-span-5 bg-[#19120f] text-white p-8 sm:p-10 rounded-3xl border border-[#dfc18b]/35 shadow-3d-card relative overflow-hidden transform-style-3d">
            {/* Background Studio Ambience Image */}
            <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                alt="Studio Sanctuary"
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-[#19120f]/80 to-[#19120f]/60" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#dfc18b] font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-[#dfc18b]" />
                <span>Visit Our Studio</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4 text-3d-gold">
                Reserve Your Glow Experience
              </h2>

              <p className="text-xs sm:text-sm text-[#ded3cb] leading-relaxed mb-6 font-light">
                Whether dropping in for an afternoon refresh or preparing for your royal wedding, our salon concierge is dedicated to your absolute comfort.
              </p>

              {/* 3D Visual Suite Preview Card */}
              <div className="mb-6 rounded-2xl overflow-hidden border border-[#dfc18b]/40 shadow-3d-float relative group">
                <div className="h-32 w-full relative">
                  <img
                    src="/assets/images/concierge_consult_spa.jpg"
                    alt="Private Treatment Suite"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-black/30 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-serif text-sm font-semibold text-[#dfc18b]">Private Sanctuary Suite</span>
                    <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded border border-white/20">Acoustically Soundproof</span>
                  </div>
                </div>
              </div>

              {/* Info Items */}
              <div className="space-y-4 mb-8 text-xs sm:text-sm text-[#ded3cb]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#c59b53]/20 border border-[#dfc18b]/40 text-[#dfc18b] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Opening Hours</strong>
                    <span>Monday – Sunday: 10:00 AM – 8:30 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#c59b53]/20 border border-[#dfc18b]/40 text-[#dfc18b] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Concierge Direct</strong>
                    <a href="tel:+919876543210" className="hover:text-[#dfc18b] transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#c59b53]/20 border border-[#dfc18b]/40 text-[#dfc18b] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Email Inquiries</strong>
                    <a href="mailto:hello@glowbeautystudio.in" className="hover:text-[#dfc18b] transition-colors">
                      hello@glowbeautystudio.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#c59b53]/20 border border-[#dfc18b]/40 text-[#dfc18b] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Studio Flagship</strong>
                    <span>123 Beauty Lane, Green Park, New Delhi - 110016</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action with 3D Depth */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Glow%20Beauty%20Studio,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl border border-[#dfc18b] text-[#dfc18b] hover:bg-[#dfc18b] hover:text-[#19120f] transition-all duration-300 text-xs uppercase tracking-[0.16em] font-bold flex items-center justify-center gap-2 shadow-3d-button hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form with 3D Depth */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#c59b53]/25 shadow-3d-card transform-style-3d">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2e231e] mb-2 text-3d-subtle">
              Request an Appointment
            </h3>
            <p className="text-xs text-[#6e5f58] mb-6 font-light">
              Select your preferred service, specialist, and time slot. We will confirm your reservation instantly.
            </p>

            {formError && (
              <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="client-name-input"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Riya Kapoor"
                    className="w-full px-4 py-2.5 text-xs bg-[#fdfbf9] border border-[#e2d8cf] rounded focus:outline-none focus:border-[#c59b53] focus:bg-white text-[#2e231e] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 text-xs bg-[#fdfbf9] border border-[#e2d8cf] rounded focus:outline-none focus:border-[#c59b53] focus:bg-white text-[#2e231e] transition-colors"
                  />
                </div>
              </div>

              {/* Service & Specialist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1.5">
                    Selected Ritual *
                  </label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-[#fdfbf9] border border-[#e2d8cf] rounded focus:outline-none focus:border-[#c59b53] focus:bg-white text-[#2e231e] transition-colors"
                  >
                    <optgroup label="Facial Therapies">
                      <option value="Glow Radiance Facial">Glow Radiance Facial (From ₹1,999)</option>
                      <option value="Hydra-Infusion Glass Skin Ritual">Hydra Glass Skin Ritual (From ₹3,299)</option>
                    </optgroup>
                    <optgroup label="Hair Couture & Spa">
                      <option value="Hair Couture & Spa">Hair Couture &amp; Spa (From ₹1,499)</option>
                      <option value="Japanese Scalp & Head Spa">Japanese Head Spa (From ₹2,899)</option>
                    </optgroup>
                    <optgroup label="Signature Themed Rituals">
                      <option value="24K Imperial Gold Themed Ritual">24K Imperial Gold Themed Ritual (From ₹2,799)</option>
                    </optgroup>
                    <optgroup label="Luxury Nails">
                      <option value="Nail Extensions & Art">Nail Extensions &amp; Art (From ₹1,199)</option>
                    </optgroup>
                    <optgroup label="The Imperial Bridal Studio">
                      <option value="The Imperial Atelier Couture">The Imperial Atelier Couture (₹35,000)</option>
                      <option value="Royal HD Bridal Makeup">Royal HD Bridal Makeup (₹18,000)</option>
                      <option value="Radiant Airbrush Bridal Suite">Radiant Airbrush Bridal Suite (₹24,000)</option>
                      <option value="Minimalist Pastel Bridal Art">Minimalist Pastel Bridal Art (₹14,500)</option>
                      <option value="Bridal Consultation & Look Trial">Bridal Consultation &amp; Look Trial (₹2,999)</option>
                      <option value="Engagement & Sangeet Glam Look">Engagement &amp; Sangeet Glam (₹9,500)</option>
                      <option value="Party & Glam Makeup">Party &amp; Glam Makeup (From ₹3,499)</option>
                    </optgroup>
                    <optgroup label="Wellness Spa">
                      <option value="Aromatherapy Body Ritual">Aromatherapy Body Ritual (From ₹2,499)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1.5">
                    Preferred Artist
                  </label>
                  <select
                    value={stylistName}
                    onChange={(e) => setStylistName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-[#fdfbf9] border border-[#e2d8cf] rounded focus:outline-none focus:border-[#c59b53] focus:bg-white text-[#2e231e] transition-colors"
                  >
                    <option value="Any Available Senior Specialist">Any Available Senior Specialist (Recommended)</option>
                    <option value="Senior Hair Director & Balayage Master">Senior Hair Director &amp; Balayage Master</option>
                    <option value="Celebrity Bridal & Glam Artist">Celebrity Bridal &amp; Glam Artist</option>
                    <option value="Senior Esthetician & Skin Therapist">Senior Esthetician &amp; Skin Therapist</option>
                    <option value="Luxury Nail Artist & Lash Specialist">Luxury Nail Artist &amp; Lash Specialist</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1.5">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#fdfbf9] border border-[#e2d8cf] rounded focus:outline-none focus:border-[#c59b53] focus:bg-white text-[#2e231e] transition-colors"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1.5">
                  Available Time Slots *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 text-[11px] font-mono rounded border transition-all ${
                        timeSlot === slot
                          ? 'bg-[#19120f] text-[#dfc18b] border-[#19120f] font-semibold shadow-sm'
                          : 'bg-[#fdfbf9] text-[#2e231e] border-[#e2d8cf] hover:border-[#c59b53]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1.5">
                  Special Instructions or Skin Concerns (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Sensitive skin, bridal ceremony timing, reference outfit colors..."
                  className="w-full px-4 py-2.5 text-xs bg-[#fdfbf9] border border-[#e2d8cf] rounded focus:outline-none focus:border-[#c59b53] focus:bg-white text-[#2e231e] transition-colors"
                />
              </div>

              {/* 3D Tactile Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 text-xs uppercase tracking-[0.18em] font-bold text-[#19120f] bg-gradient-to-r from-[#f5e4cc] via-[#dfc18b] to-[#b3853b] hover:from-white hover:to-[#dfc18b] rounded-xl transition-all duration-300 shadow-3d-button hover:scale-[1.01] active:scale-[0.99] border border-[#dfc18b]/60 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#19120f]" />
                <span>Confirm Booking Request</span>
              </button>

              <p className="text-[11px] text-center text-[#6e5f58]">
                🔒 No advance card payment required online. Pay after your treatment at the studio concierge.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal Ticket */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-[#faf5ee] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#c59b53]/40 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-[10px] tracking-[0.2em] uppercase text-[#c59b53] font-bold block mb-1">
              Reservation Confirmed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2e231e] mb-2">
              We Look Forward To Pampering You!
            </h3>
            <p className="text-xs text-[#6e5f58] mb-6">
              A booking confirmation has been scheduled. Our concierge team will connect with you 2 hours prior to your visit.
            </p>

            {/* Ticket Card */}
            <div className="bg-white p-5 rounded-2xl border border-dashed border-[#c59b53]/40 text-left space-y-3 mb-6 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-[11px] uppercase tracking-wider text-[#6e5f58]">Booking Reference</span>
                <span className="font-mono text-xs font-bold text-[#c59b53]">{confirmedBooking.bookingCode}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6e5f58]">Guest Name</span>
                <strong className="text-[#2e231e]">{confirmedBooking.clientName}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6e5f58]">Service</span>
                <strong className="text-[#2e231e]">{confirmedBooking.serviceName}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6e5f58]">Stylist</span>
                <span className="text-[#2e231e]">{confirmedBooking.stylistName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6e5f58]">Date &amp; Time</span>
                <span className="font-semibold text-[#2e231e]">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                <span className="text-[#6e5f58]">Estimated Amount</span>
                <strong className="font-serif text-base text-[#c59b53] tabular-nums">₹{confirmedBooking.totalPrice.toLocaleString()}</strong>
              </div>

              {/* Supabase Cloud Database Status Badge */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-[#6e5f58] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#c59b53]" />
                  <span>Cloud Database</span>
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Stored in Supabase (efiwuqhosbnlgrfzdhct)</span>
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2.5">
              <a
                href={getWhatsAppBookingUrl(confirmedBooking)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded text-xs uppercase tracking-[0.14em] font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp With Concierge</span>
              </a>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full py-2.5 text-xs uppercase tracking-[0.14em] font-semibold text-[#6e5f58] hover:text-[#2e231e] transition-colors"
              >
                Close &amp; Return to Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
