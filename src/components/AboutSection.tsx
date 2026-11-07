import React from 'react';
import { TiltCard3D } from './TiltCard3D';
import { Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const brandPartners = ['MAC Cosmetics', 'Dyson Beauty', 'Kérastase Paris', 'Olaplex', 'Bobbi Brown', 'Huda Beauty'];

  return (
    <section id="about" className="py-24 lg:pt-32 lg:pb-36 bg-[#faf5ee] border-b border-[#c59b53]/15 scroll-mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Layered 3D Multi-Card Composition */}
          <div className="lg:col-span-5 relative perspective-1200">
            {/* Primary 3D Tilt Card */}
            <TiltCard3D className="aspect-[4/5] max-w-md mx-auto shadow-3d-card rounded-3xl">
              <div className="relative w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                  alt="Precision Hair Styling in Glow Beauty Studio"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = '/src/assets/images/hero_salon_beauty.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6 text-white transform-style-3d translate-z-20">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#dfc18b] font-semibold block mb-1">
                    Studio Masterpiece
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-white mb-1">
                    Precision &amp; Care
                  </h3>
                  <p className="text-xs text-[#ded3cb]/90 font-light">
                    Every cut, stroke, and therapy is an art form designed for your individuality.
                  </p>
                </div>
              </div>
            </TiltCard3D>

            {/* Overlapping Secondary 3D Photo (Layered Depth Element) */}
            <div className="hidden sm:block absolute -bottom-6 -right-4 w-44 h-48 rounded-2xl overflow-hidden border-2 border-[#dfc18b] shadow-3d-float z-20 transform-style-3d hover:translate-y-[-6px] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=500&q=80"
                alt="Aromatherapy Holistic Care"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/hydra_skin_glow.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <span className="text-[9px] uppercase tracking-wider text-[#dfc18b] font-bold block">Holistic Spa</span>
                <span className="text-[11px] font-medium leading-tight block">Pure Botanicals</span>
              </div>
            </div>

            {/* Floating 3D Gold Seal Badge */}
            <div className="absolute -top-4 -left-4 bg-[#19120f] border border-[#dfc18b] text-[#dfc18b] p-3 rounded-2xl shadow-3d-float z-20 flex items-center gap-2 transform-style-3d animate-float-3d">
              <Sparkles className="w-5 h-5 text-[#dfc18b]" />
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#dfc18b] font-bold block leading-none">Certified</span>
                <span className="text-xs text-white font-medium">100% Cruelty-Free</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-[#c59b53] font-bold mb-4">
              <span className="w-6 h-[1.5px] bg-[#c59b53]" />
              <span>About Us</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2e231e] leading-tight mb-6">
              Where Beauty Meets Pure Wellness
            </h2>

            <p className="text-base text-[#6e5f58] leading-relaxed mb-5 font-light">
              At <strong className="font-medium text-[#2e231e]">Glow Beauty Studio</strong>, we believe true elegance begins with dedicated self-care. Founded in 2014, our boutique salon and spa offers personalized treatments, international aesthetic trends, and a serene, calming environment designed to restore your glow.
            </p>

            <p className="text-base text-[#6e5f58] leading-relaxed mb-8 font-light">
              Our certified master artists use only cruelty-free, dermatologist-tested luxury products to ensure your skin and hair radiate vitality and health. Whether you are visiting for a restorative afternoon head spa or getting ready for your wedding walk, our concierge hospitality ensures an effortless escape.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c59b53] shrink-0 mt-0.5" />
                <span className="text-sm text-[#2e231e] font-normal">
                  Private, acoustically dampened treatment suites
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c59b53] shrink-0 mt-0.5" />
                <span className="text-sm text-[#2e231e] font-normal">
                  Medical-grade autoclave sterilization standards
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c59b53] shrink-0 mt-0.5" />
                <span className="text-sm text-[#2e231e] font-normal">
                  Complimentary artisan botanical tea selection
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c59b53] shrink-0 mt-0.5" />
                <span className="text-sm text-[#2e231e] font-normal">
                  Zero toxic parabens, phthalates, or harsh sulfates
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#c59b53]/25">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#c59b53] block leading-none mb-1 tabular-nums">
                  12+
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-[#6e5f58] font-medium">
                  Years Exp.
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#c59b53] block leading-none mb-1 tabular-nums">
                  50k+
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-[#6e5f58] font-medium">
                  Happy Clients
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#c59b53] block leading-none mb-1 tabular-nums">
                  100+
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-[#6e5f58] font-medium">
                  Treatments
                </span>
              </div>
            </div>

            {/* Brand partners */}
            <div className="mt-8 pt-6 border-t border-[#c59b53]/15">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#6e5f58] block mb-3 font-semibold">
                Trusted Luxury Formulation Partners
              </span>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#2e231e]/80">
                {brandPartners.map((brand, idx) => (
                  <span key={brand} className="flex items-center gap-2">
                    <span>{brand}</span>
                    {idx < brandPartners.length - 1 && <span className="text-[#c59b53]/40">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
