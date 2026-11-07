import React, { useState } from 'react';
import { TutorialStep } from '../types';
import {
  Compass,
  Layers,
  Sparkles,
  Crown,
  MoveHorizontal,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Lightbulb,
  Check
} from 'lucide-react';

interface AppTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'step-nav',
    title: 'Welcome to Glow Beauty Studio',
    subtitle: 'Step 1 of 6 · Navigation & Studio Concierge',
    content: 'Explore our luxury salon & spa via the top navigation bar. You can quickly jump between bespoke services, bridal trousseau, 3D gallery, testimonials, and view your active bookings anytime.',
    targetElementId: 'home',
    icon: 'compass',
    tip: 'Click "Book Appointment" in the top bar from any section to jump directly into the reservation calendar.'
  },
  {
    id: 'step-3d',
    title: 'Interactive 3D Tilt Technology',
    subtitle: 'Step 2 of 6 · Spatial Sensory Showcase',
    content: 'Hover your cursor (or drag with your finger on mobile) over any treatment picture or gallery showcase. Watch the real-time 3D perspective shift, depth layers pop, and radial reflections glide across the surface.',
    targetElementId: 'gallery',
    icon: 'layers',
    tip: 'Click any 3D picture in the gallery to open our high-definition Lightbox with full-screen zoom and descriptions.'
  },
  {
    id: 'step-services',
    title: 'Curated Rituals & Detailed Inclusions',
    subtitle: 'Step 3 of 6 · Transparent Luxury Care',
    content: 'Browse facials, hair couture, nails, and massages. Use the category tabs or search bar to find exact treatments. Click "Inclusions" on any card to view step-by-step rituals, ingredients, and clinical benefits.',
    targetElementId: 'services',
    icon: 'sparkles',
    tip: 'Clicking "Book Service" automatically prefills the appointment wizard with that specific ritual and its starting rate.'
  },
  {
    id: 'step-bridal',
    title: 'The Imperial Bridal Studio & Glass Skin',
    subtitle: 'Step 4 of 6 · Royal Celebrations & Clinical Glow',
    content: 'Experience The Imperial Bridal Studio with handcrafted heirloom jewelry setting, haute couture draping, and our signature Hydra-Infusion Glass Skin Sanctuary powered by 98% medical hyperbaric oxygen.',
    targetElementId: 'bridal',
    icon: 'crown',
    tip: 'Toggle bespoke add-ons like bridal trials and draping masters to calculate live customized estimates.'
  },
  {
    id: 'step-transform',
    title: 'Interactive Transformation Slider',
    subtitle: 'Step 5 of 6 · Real Clinical & Glam Results',
    content: 'Drag the gold horizontal divider left and right to inspect authentic before-and-after results for our signature bridal airbrush and balayage treatments.',
    targetElementId: 'transformations',
    icon: 'slider',
    tip: 'Switch between "Bridal Artistry" and "Hair Couture" tabs to view distinct real-world transformations.'
  },
  {
    id: 'step-profile',
    title: 'Custom Profile & 1-Click Booking',
    subtitle: 'Step 6 of 6 · VIP Guest Privileges',
    content: 'Set your username, email, phone number, and customizable avatar. Your preferences and skin type are saved securely in your browser so reservations are pre-filled in one click.',
    targetElementId: 'appointment',
    icon: 'user',
    tip: 'After confirming an appointment, you get an instant booking code and a 1-tap WhatsApp confirmation with our concierge!'
  }
];

export const AppTutorial: React.FC<AppTutorialProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const step = TUTORIAL_STEPS[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TUTORIAL_STEPS.length - 1;

  const scrollToTarget = (elementId?: string) => {
    if (!elementId) return;
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      scrollToTarget(TUTORIAL_STEPS[nextIndex].targetElementId);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      scrollToTarget(TUTORIAL_STEPS[prevIndex].targetElementId);
    }
  };

  const renderIcon = () => {
    switch (step.icon) {
      case 'compass':
        return <Compass className="w-6 h-6 text-[#dfc18b]" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-[#dfc18b]" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-[#dfc18b]" />;
      case 'crown':
        return <Crown className="w-6 h-6 text-[#dfc18b]" />;
      case 'slider':
        return <MoveHorizontal className="w-6 h-6 text-[#dfc18b]" />;
      case 'user':
      default:
        return <UserCheck className="w-6 h-6 text-[#dfc18b]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-end sm:items-center justify-center p-4 sm:p-6">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs pointer-events-auto transition-opacity"
        onClick={onClose}
      />

      {/* Tutorial Floating Modal */}
      <div className="relative pointer-events-auto bg-[#19120f] text-[#f5ece4] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#c59b53]/45 z-10 animate-fadeIn">
        {/* Close / Skip button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
          aria-label="Skip Tutorial"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator & Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#c59b53]/20 border border-[#c59b53]/35 flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#dfc18b] font-bold block">
              {step.subtitle}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
              {step.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <p className="text-xs sm:text-sm text-[#ded3cb] leading-relaxed mb-5 font-light">
          {step.content}
        </p>

        {/* Helpful Pro-Tip Box */}
        <div className="p-3.5 bg-black/40 rounded-xl border border-[#c59b53]/25 flex items-start gap-3 mb-6">
          <Lightbulb className="w-4 h-4 text-[#dfc18b] shrink-0 mt-0.5" />
          <div className="text-[11px] text-[#ded3cb]/90 leading-normal">
            <strong className="text-[#dfc18b] font-medium">Guest Tip:</strong> {step.tip}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-between pt-2 border-t border-[#c59b53]/25">
          <div className="flex items-center gap-1.5">
            {TUTORIAL_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  scrollToTarget(TUTORIAL_STEPS[idx].targetElementId);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-[#dfc18b]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={handlePrev}
                className="px-3 py-2 text-xs font-medium text-[#ded3cb] hover:text-white flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2 text-xs uppercase tracking-[0.14em] font-bold text-[#19120f] bg-gradient-to-r from-[#dfc18b] via-[#c59b53] to-[#b3853b] hover:from-[#e8ce9e] hover:to-[#c59b53] rounded transition-transform shadow-md flex items-center gap-1.5"
            >
              <span>{isLast ? 'Finish Tour' : 'Next Step'}</span>
              {isLast ? <Check className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
