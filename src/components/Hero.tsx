import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Award, Heart } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

// High-fidelity generated hero beauty image
import heroBeautyImg from '../assets/images/hero_salon_beauty_1793926307323.jpg';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#19120f] pt-28 pb-20">
      {/* Background subtle atmosphere */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#c59b53]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#dfc18b]/15 rounded-full blur-[160px]" />
      </div>

      {/* Hero Content Grid (2 Columns: Editorial Text + 3D Visual Hero Asset) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#dfc18b] font-semibold">
              <span className="w-8 h-[1px] bg-[#dfc18b]" />
              <span>Luxury Salon &amp; Spa</span>
              <Sparkles className="w-3.5 h-3.5 text-[#dfc18b]" />
            </div>

            {/* Headline with 3D Extruded Gold Effect */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium text-white leading-[1.08] tracking-tight">
              Glow Your{' '}
              <span className="italic font-normal text-3d-gold text-transparent bg-clip-text bg-gradient-to-r from-[#f5e4cc] via-[#dfc18b] to-[#b3853b]">
                Natural
              </span>{' '}
              Beauty
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#ded3cb] leading-relaxed max-w-xl font-light">
              Relax · Rejuvenate · Feel Beautiful. Experience bespoke hair couture, restorative clinical facials, 
              and imperial bridal transformations crafted by certified master artists.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-[0.18em] font-bold text-[#19120f] bg-gradient-to-r from-[#dfc18b] via-[#c59b53] to-[#b3853b] hover:from-[#e8ce9e] hover:to-[#c59b53] rounded-xl transition-all duration-300 shadow-3d-button hover:-translate-y-0.5 active:translate-y-0"
                style={{ transform: 'translateZ(10px)' }}
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#19120f]" />
              </button>

              <a
                href="#glass-skin"
                className="inline-flex items-center justify-center px-6 py-4 text-xs uppercase tracking-[0.18em] font-medium text-white border border-[#c59b53]/40 hover:border-[#dfc18b] hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-md shadow-md"
              >
                Glass Skin Sanctuary
              </a>

              <a
                href="#bridal"
                className="inline-flex items-center justify-center px-6 py-4 text-xs uppercase tracking-[0.18em] font-medium text-[#dfc18b] border border-[#dfc18b]/40 hover:border-[#dfc18b] hover:bg-[#dfc18b]/10 rounded-xl transition-all duration-300 backdrop-blur-md shadow-md"
              >
                Imperial Bridal Studio
              </a>
            </div>

            {/* Trust strip */}
            <div className="pt-6 border-t border-[#c59b53]/20 flex flex-wrap items-center gap-6 text-xs text-[#ded3cb]/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dfc18b]" />
                <span>100% Cruelty-Free &amp; Luxury Formulas</span>
              </div>
              <div className="hidden sm:inline text-[#c59b53]/40">·</div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#dfc18b]" />
                <span>Complimentary Skin &amp; Hair Assessment</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visual Hero Asset Card */}
          <div className="lg:col-span-5 relative perspective-1200 flex items-center justify-center">
            <TiltCard3D className="w-full max-w-md aspect-[4/5] rounded-3xl shadow-3d-float border border-[#dfc18b]/45 overflow-hidden relative group">
              <div className="relative w-full h-full">
                <img
                  src="/assets/images/hero_salon_beauty.jpg"
                  alt="Glow Beauty Studio Signature Model"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    if (heroBeautyImg && e.currentTarget.src !== heroBeautyImg) {
                      e.currentTarget.src = heroBeautyImg;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-black/15 to-transparent opacity-80" />

                {/* Floating 3D Badge on Top Left */}
                <div className="absolute top-5 left-5 bg-[#19120f]/85 backdrop-blur-md border border-[#dfc18b]/60 px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs text-[#dfc18b] transform-style-3d translate-z-30">
                  <Star className="w-3.5 h-3.5 fill-[#dfc18b]" />
                  <span className="font-semibold tracking-wider">4.9 ★ (50k+ Reviews)</span>
                </div>

                {/* Floating 3D Badge on Top Right */}
                <div className="absolute top-5 right-5 bg-[#19120f]/85 backdrop-blur-md border border-[#dfc18b]/60 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 text-xs text-white transform-style-3d translate-z-30">
                  <Award className="w-3.5 h-3.5 text-[#dfc18b]" />
                  <span className="text-[11px] font-medium text-[#ded3cb]">Award-Winning</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 text-white transform-style-3d translate-z-20">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfc18b] font-bold block mb-1">
                    Signature Beauty Standard
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-white mb-1">
                    Radiant, Bespoke, Timeless
                  </h3>
                  <p className="text-xs text-[#ded3cb]/85 font-light leading-relaxed">
                    Customized formulations that celebrate and accentuate your natural glow.
                  </p>
                </div>
              </div>
            </TiltCard3D>

            {/* Overlapping Floating 3D Experience Chip */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-gradient-to-r from-[#221814] to-[#19120f] border border-[#dfc18b]/60 rounded-2xl p-4 shadow-2xl backdrop-blur-md items-center gap-3.5 z-20 animate-float-3d">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfc18b]/20 to-[#c59b53]/10 border border-[#dfc18b]/40 flex items-center justify-center text-[#dfc18b]">
                <Heart className="w-5 h-5 fill-[#dfc18b]" />
              </div>
              <div className="text-left">
                <span className="font-serif text-lg font-bold text-white block leading-tight">
                  12+ Years
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#dfc18b] block font-medium">
                  Couture Excellence
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
