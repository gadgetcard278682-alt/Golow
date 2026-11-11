import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { HydraGlassSkinSection } from './components/HydraGlassSkinSection';
import { BridalSuite } from './components/BridalSuite';
import { InteractiveGallery } from './components/InteractiveGallery';
import { TransformationSlider } from './components/TransformationSlider';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AppTutorial } from './components/AppTutorial';
import { SuperuserModal } from './components/SuperuserModal';
import { Service, Booking, UserProfile } from './types';
import { Compass, ArrowUp } from 'lucide-react';

const DEFAULT_PROFILE: UserProfile = {
  username: 'Riya Kapoor',
  email: 'riya.kapoor@example.com',
  phone: '+91 98765 43210',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  avatarColor: 'from-[#dfc18b] via-[#c59b53] to-[#b3853b]',
  skinType: 'Combination / Sensitive',
  membershipTier: 'Glow VIP',
  notificationsEnabled: true
};

export default function App() {
  // User Profile state with local storage persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('glow_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user profile', e);
    }
    return DEFAULT_PROFILE;
  });

  // Scheduled bookings with local storage persistence
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('glow_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load bookings', e);
    }
    return [
      {
        id: 'book-sample-1',
        bookingCode: 'GLOW-2026-4819',
        clientName: 'Riya Kapoor',
        clientPhone: '+91 98765 43210',
        clientEmail: 'riya.kapoor@example.com',
        serviceName: 'Glow Radiance Facial',
        stylistName: 'Meera Kapoor',
        date: '2026-11-12',
        timeSlot: '11:00 AM',
        notes: 'Pre-wedding facial hydration session',
        totalPrice: 1999,
        status: 'Confirmed',
        createdAt: '2026-11-05'
      }
    ];
  });

  // Modals state
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isSuperuserOpen, setIsSuperuserOpen] = useState(false);

  // Studio Ambiance Theme
  const [studioTheme, setStudioTheme] = useState<'gold' | 'noir' | 'rose' | 'emerald'>(() => {
    try {
      const savedTheme = localStorage.getItem('glow_studio_theme');
      if (savedTheme && ['gold', 'noir', 'rose', 'emerald'].includes(savedTheme)) {
        return savedTheme as any;
      }
    } catch (e) {
      console.error('Failed to load theme', e);
    }
    return 'gold';
  });

  const handleThemeChange = (newTheme: 'gold' | 'noir' | 'rose' | 'emerald') => {
    setStudioTheme(newTheme);
    try {
      localStorage.setItem('glow_studio_theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };

  // Pre-fill selection for booking form
  const [bookingPrefill, setBookingPrefill] = useState<{
    serviceName?: string;
    price?: number;
    notes?: string;
  }>({
    serviceName: '24K Imperial Gold Themed Ritual',
    price: 2799
  });

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync profile to localStorage
  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    try {
      localStorage.setItem('glow_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save user profile', e);
    }
  };

  const handleResetProfile = () => {
    setUserProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem('glow_user_profile');
    } catch (e) {
      console.error('Failed to reset user profile', e);
    }
  };

  // Sync bookings to localStorage
  const handleBookingCreated = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('glow_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save booking', e);
    }
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    try {
      localStorage.setItem('glow_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update bookings', e);
    }
  };

  // Smooth scroll helper to Request an Appointment form
  const scrollToBooking = (serviceName?: string, price?: number, notes?: string) => {
    if (serviceName) {
      setBookingPrefill({ serviceName, price, notes });
    }
    const el = document.getElementById('appointment') || document.getElementById('book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus on the first input field in the booking form for effortless typing
      setTimeout(() => {
        const input = document.getElementById('client-name-input');
        if (input) {
          input.focus();
        }
      }, 550);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      data-theme={studioTheme}
      className="min-h-screen bg-[#faf5ee] text-[#2e231e] font-sans selection:bg-[#c59b53]/25 selection:text-[#19120f] overflow-x-hidden transition-colors duration-500"
    >
      {/* Navbar */}
      <Navbar
        onOpenBooking={(service) => scrollToBooking(service)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        bookingsCount={bookings.length}
        userProfile={userProfile}
        currentTheme={studioTheme}
        onThemeChange={handleThemeChange}
      />

      {/* Main Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero onBookClick={() => scrollToBooking()} />

        {/* About Section with 3D Tilt Picture */}
        <AboutSection />

        {/* Services Menu & Inclusions */}
        <ServicesSection
          onSelectService={(service) => scrollToBooking(service)}
          onViewDetails={(service) => setSelectedServiceForModal(service)}
        />

        {/* Hydra-Infusion Glass Skin Sanctuary */}
        <HydraGlassSkinSection
          onBookHydra={(service, price, notes) => scrollToBooking(service, price, notes)}
        />

        {/* The Imperial Bridal Studio & Custom Package Builder */}
        <BridalSuite
          onBookBridal={(pkg, total, notes) => scrollToBooking(pkg, total, notes)}
        />

        {/* Interactive 3D Gallery */}
        <InteractiveGallery />

        {/* Before & After Interactive Transformation Slider */}
        <div id="transformations">
          <TransformationSlider />
        </div>

        {/* Testimonials with Review Submission */}
        <TestimonialsSection />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Booking & Contact Section */}
        <BookingSection
          preselectedService={bookingPrefill.serviceName}
          preselectedPrice={bookingPrefill.price}
          preselectedNotes={bookingPrefill.notes}
          userProfile={userProfile}
          onBookingCreated={handleBookingCreated}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenBooking={() => scrollToBooking()}
        onOpenSuperuser={() => setIsSuperuserOpen(true)}
      />

      {/* Service Inclusions Modal */}
      <ServiceModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookService={(name) => scrollToBooking(name)}
      />

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyMyBookingsOpen(isMyBookingsOpen)}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        onSaveProfile={handleSaveProfile}
        onResetProfile={handleResetProfile}
      />

      {/* Superuser Sanctum Modal (Supabase Database Portal) */}
      <SuperuserModal
        isOpen={isSuperuserOpen}
        onClose={() => setIsSuperuserOpen(false)}
        localBookings={bookings}
        onUpdateBookings={setBookings}
      />

      {/* Step-by-Step App Tutorial Tour */}
      <AppTutorial
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onComplete={() => setIsTutorialOpen(false)}
      />

      {/* Floating Bottom Tour Assistant Button */}
      <button
        onClick={() => setIsTutorialOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-[#19120f] text-[#dfc18b] border border-[#c59b53]/40 hover:border-[#dfc18b] p-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase group"
        title="Start Interactive Studio Tour"
      >
        <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
        <span className="hidden sm:inline pr-1">Studio Tour</span>
      </button>

      {/* Back to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-[#19120f]/90 text-[#dfc18b] border border-[#c59b53]/40 rounded-full shadow-xl hover:bg-[#19120f] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          title="Scroll back to top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// Small helper for typescript cleanliness
function isMyMyBookingsOpen(val: boolean) {
  return val;
}
