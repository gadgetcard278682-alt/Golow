import React, { useState } from 'react';
import { BRIDAL_PACKAGES, BRIDAL_ADDONS } from '../data/salonData';
import { TiltCard3D } from './TiltCard3D';
import { Check, Sparkles, Crown, Plus, ShieldCheck, Heart, Camera, Gem, Award } from 'lucide-react';

// High-fidelity generated imagery for The Imperial Bridal Studio
import bridalImperialArtImg from '../assets/images/bridal_imperial_art_1793899837776.jpg';
import bridalCoutureDetailsImg from '../assets/images/bridal_couture_details_1793899850599.jpg';

interface BridalSuiteProps {
  onBookBridal: (packageName: string, totalAmount: number, notes: string) => void;
}

export const BridalSuite: React.FC<BridalSuiteProps> = ({ onBookBridal }) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('royal-airbrush');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['trial']);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  const currentPackage = BRIDAL_PACKAGES.find(p => p.id === selectedPackageId) || BRIDAL_PACKAGES[2];

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    const addonsTotal = selectedAddonIds.reduce((sum, id) => {
      const addon = BRIDAL_ADDONS.find(a => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return currentPackage.price + addonsTotal;
  };

  const handleReserve = () => {
    const addonNames = selectedAddonIds
      .map(id => BRIDAL_ADDONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const note = addonNames ? `Bridal Package: ${currentPackage.name}. Add-ons: ${addonNames}` : `Bridal Package: ${currentPackage.name}`;
    onBookBridal(currentPackage.name, calculateTotal(), note);
  };

  const handleBookTrial = () => {
    onBookBridal(
      'Bridal Consultation & Look Trial',
      2999,
      'Requested 1-on-1 Imperial Bridal Look Trial with Senior Artist (Adjustable against package)'
    );
  };

  const bridalPillars = [
    {
      icon: Crown,
      title: 'Private Imperial Suite',
      desc: 'Exclusive air-conditioned sanctum with full-length vanity mirror, refreshment lounge, and space for your bridesmaids.'
    },
    {
      icon: ShieldCheck,
      title: '18-Hour Cryo Airbrush Seal',
      desc: 'Tear-proof, humidity-resistant, camera-ready formulation designed specifically for 4K cinematic cinematography.'
    },
    {
      icon: Gem,
      title: 'Haute Couture Draping',
      desc: 'Master drapists trained in royal Banarasi, double-dupatta lehenga pleating, Kanjeevaram box pleats, and modern veil tucks.'
    },
    {
      icon: Camera,
      title: 'Trousseau & Jewelry Assist',
      desc: 'Flawless placement and secure pin-setting of matha patti, heavy polki chokers, nath, and fragrant fresh jasmine veni.'
    }
  ];

  return (
    <section id="bridal" className="py-24 lg:py-32 bg-[#19120f] text-[#f5ece4] relative overflow-hidden">
      {/* 3D Warm Amber Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c59b53]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-[#b3853b]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(223,193,139,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-[#dfc18b]/40 text-[#dfc18b] text-xs font-semibold tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(197,155,83,0.3)]">
            <Crown className="w-4 h-4 text-[#dfc18b] fill-[#dfc18b]/30" />
            <span>The Imperial Bridal Studio</span>
            <Sparkles className="w-3.5 h-3.5 text-[#dfc18b]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-wide leading-tight mb-5">
            Royal Trousseau &amp;{' '}
            <span className="font-serif italic text-3d-gold text-transparent bg-clip-text bg-gradient-to-r from-[#f5e4cc] via-[#dfc18b] to-[#b3853b]">
              Bridal Artistry
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#ded3cb] leading-relaxed font-light">
            Step into our private bridal sanctum. From timeless heirloom jewelry setting and HD airbrush perfection 
            to haute couture dupatta draping, our master artists guarantee you feel regal, radiant, and immortalized in every photograph.
          </p>
        </div>

        {/* 1. Main Interactive Package Builder Container */}
        <div className="rounded-3xl border border-[#c59b53]/35 bg-gradient-to-br from-[#221814] via-[#1c1411] to-[#120d0a] shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Interactive Package List */}
            <div className="p-8 sm:p-12 lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-[#c59b53]/25 pb-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                    Select Your Bridal Package
                  </h3>
                  <p className="text-xs text-[#ded3cb]/80 mt-1">
                    Click each package to preview inclusions, styling details, and pricing
                  </p>
                </div>
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#dfc18b] bg-[#c59b53]/20 px-3 py-1 rounded-full border border-[#dfc18b]/30">
                  4 Bespoke Options
                </span>
              </div>

              {/* Package selector cards with 3D Thumbnail Imagery */}
              <div className="space-y-3.5">
                {BRIDAL_PACKAGES.map((pkg) => {
                  const isSelected = pkg.id === selectedPackageId;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between gap-3 transform-style-3d hover:translate-y-[-2px] ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#c59b53]/30 via-[#c59b53]/15 to-transparent border-[#dfc18b] shadow-[0_12px_24px_-6px_rgba(179,133,59,0.4)] ring-1 ring-[#dfc18b]/60'
                          : 'bg-white/[0.04] border-white/10 hover:border-[#c59b53]/40 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* 3D Package Thumbnail */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#dfc18b]/50 shadow-md relative group">
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = '/assets/images/bridal_imperial_art.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#dfc18b] bg-[#dfc18b]' : 'border-white/30'}`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#19120f]" />}
                            </span>
                            <span className="font-serif text-base sm:text-lg font-semibold text-white">
                              {pkg.name}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#ded3cb]/80 block ml-5 mt-0.5">
                            {pkg.duration} · {pkg.recommendedFor}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif text-lg sm:text-2xl font-bold text-[#dfc18b] block tabular-nums">
                          ₹{pkg.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Package Highlights Grid */}
              <div className="p-5 rounded-2xl bg-black/40 border border-[#c59b53]/25 shadow-inner">
                <span className="text-xs uppercase tracking-[0.16em] text-[#dfc18b] font-semibold block mb-3">
                  Inclusions for {currentPackage.name}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#ded3cb]">
                  {currentPackage.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#dfc18b] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customizer Accordion */}
              <div>
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="text-xs tracking-[0.14em] uppercase font-semibold text-[#dfc18b] hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Plus className={`w-4 h-4 transition-transform ${showCalculator ? 'rotate-45' : ''}`} />
                  <span>{showCalculator ? 'Hide Custom Add-ons' : 'Add Bridal Trials & Trousseau Customizers'}</span>
                </button>

                {showCalculator && (
                  <div className="mt-4 p-5 rounded-2xl bg-white/[0.04] border border-[#c59b53]/20 space-y-3 animate-fadeIn">
                    <span className="text-xs uppercase tracking-[0.14em] text-[#dfc18b] font-medium block">
                      Optional Bespoke Add-ons:
                    </span>
                    <div className="space-y-2">
                      {BRIDAL_ADDONS.map((addon) => {
                        const checked = selectedAddonIds.includes(addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                              checked ? 'bg-[#c59b53]/20 border-[#dfc18b]' : 'border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleAddon(addon.id)}
                                className="rounded text-[#c59b53] focus:ring-0 accent-[#c59b53]"
                              />
                              <div>
                                <span className="font-medium text-white block">{addon.name}</span>
                                <span className="text-[11px] text-[#ded3cb]/70">{addon.description}</span>
                              </div>
                            </div>
                            <span className="font-serif text-sm font-semibold text-[#dfc18b] whitespace-nowrap ml-3 tabular-nums">
                              +₹{addon.price.toLocaleString()}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Total & Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#c59b53]/30">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#ded3cb]/80 block">
                    Estimated Package Total
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white tabular-nums">
                    ₹{calculateTotal().toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleReserve}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-bold text-[#19120f] bg-gradient-to-r from-[#dfc18b] via-[#c59b53] to-[#b3853b] hover:from-[#e8ce9e] hover:to-[#c59b53] rounded-xl transition-all duration-300 shadow-3d-button active:scale-[0.98]"
                >
                  Reserve Bridal Package
                </button>
              </div>
            </div>

            {/* Right Column: 3D Tilt Preview Card */}
            <div className="p-8 lg:p-12 lg:col-span-5 flex items-center justify-center relative perspective-1200">
              <TiltCard3D className="w-full max-w-md aspect-[3/4] shadow-3d-float rounded-3xl border border-[#c59b53]/40 overflow-hidden">
                <div className="relative w-full h-full">
                  <img
                    src={currentPackage.image || '/assets/images/bridal_imperial_art.jpg'}
                    alt={currentPackage.name}
                    className="w-full h-full object-cover object-center transition-all duration-700"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/images/bridal_imperial_art.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-black/25 to-transparent opacity-90" />
                  
                  {/* Floating 3D Badge on Top */}
                  <div className="absolute top-5 right-5 bg-[#19120f]/85 backdrop-blur-md border border-[#dfc18b]/60 px-3.5 py-1.5 rounded-xl shadow-3d-float flex items-center gap-1.5 text-xs text-[#dfc18b] transform-style-3d translate-z-30">
                    <Crown className="w-3.5 h-3.5 fill-[#dfc18b]" />
                    <span className="font-semibold">{currentPackage.duration}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white transform-style-3d translate-z-20">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#dfc18b] font-semibold block mb-1">
                      {currentPackage.recommendedFor}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-2">
                      {currentPackage.name}
                    </h3>
                    <p className="text-xs text-[#ded3cb]/90 font-light leading-relaxed">
                      {currentPackage.description}
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          </div>
        </div>

        {/* 2. THE IMPERIAL BRIDAL ATELIER SHOWCASE: High-End 3D Visual Suite & Pillars */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl border border-[#c59b53]/30 bg-gradient-to-b from-[#201713]/90 via-[#18110e]/95 to-[#120d0a] shadow-2xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: 3D Layered Composition with Generated Bridal Images */}
            <div className="lg:col-span-6 relative perspective-1200 flex items-center justify-center">
              
              {/* Primary 3D Card: Full Royal Bride in Studio */}
              <TiltCard3D className="w-full max-w-lg aspect-[4/3] rounded-3xl shadow-3d-float border border-[#dfc18b]/40 overflow-hidden relative group">
                <div className="relative w-full h-full">
                  <img
                    src="/assets/images/bridal_imperial_art.jpg"
                    alt="Imperial Bridal Studio Royal Bride with Antique Kundan Jewelry"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      if (bridalImperialArtImg && e.currentTarget.src !== bridalImperialArtImg) {
                        e.currentTarget.src = bridalImperialArtImg;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-black/20 to-transparent opacity-85" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-5 left-5 bg-[#19120f]/90 backdrop-blur-md border border-[#dfc18b]/60 px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs text-[#dfc18b] transform-style-3d translate-z-30">
                    <Crown className="w-3.5 h-3.5 fill-[#dfc18b]" />
                    <span className="font-semibold tracking-wider">Imperial Atelier Look</span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 transform-style-3d translate-z-20">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfc18b] font-bold block mb-1">
                      Couture Bridal Portfolio
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Antique Polki, Emerald &amp; Zardozi Trousseau
                    </h4>
                  </div>
                </div>
              </TiltCard3D>

              {/* Secondary Overlapping Floating 3D Card: Couture Dupatta & Mehendi Details */}
              <div className="hidden sm:block absolute -bottom-10 -right-4 lg:-right-8 w-48 sm:w-56 aspect-square rounded-2xl p-1.5 bg-gradient-to-br from-[#dfc18b]/50 via-[#c59b53]/25 to-[#19120f]/95 shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(197,155,83,0.35)] backdrop-blur-xl border border-[#dfc18b]/50 z-20 animate-float-3d">
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  <img
                    src="/assets/images/bridal_couture_details.jpg"
                    alt="Intricate Couture Bridal Dupatta and Jewelry Drape"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      if (bridalCoutureDetailsImg && e.currentTarget.src !== bridalCoutureDetailsImg) {
                        e.currentTarget.src = bridalCoutureDetailsImg;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#dfc18b] font-bold block">
                      Fine Detailing
                    </span>
                    <p className="text-xs font-serif font-semibold text-white leading-tight">
                      Handcrafted Draping Art
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-6 right-4 sm:right-8 bg-gradient-to-r from-[#2a1d17] to-[#19120f] border border-[#dfc18b]/60 rounded-2xl px-4 py-2.5 shadow-2xl backdrop-blur-md flex items-center gap-3 z-20">
                <div className="w-8 h-8 rounded-full bg-[#dfc18b]/20 flex items-center justify-center text-[#dfc18b] border border-[#dfc18b]/40">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm sm:text-base font-bold text-white block leading-tight">
                    100% Guaranteed
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#dfc18b] block">
                    4K Cinematic Hold
                  </span>
                </div>
              </div>

            </div>

            {/* Right: 4 Imperial Bridal Pillars & Consultation CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#dfc18b] font-bold">
                <Crown className="w-4 h-4 text-[#dfc18b]" />
                <span>The Imperial Experience Standard</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
                Designed for the Discerning Royal Bride
              </h3>

              <p className="text-sm text-[#ded3cb]/85 font-light leading-relaxed">
                Every detail of your wedding morning is curated to eliminate stress and deliver timeless, 
                flawless magnificence.
              </p>

              {/* 4 Pillars Grid with 3D Depth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {bridalPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-[#c59b53]/25 hover:border-[#dfc18b]/60 hover:bg-white/[0.07] transition-all duration-300 group shadow-md"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#dfc18b]/20 to-[#c59b53]/10 border border-[#dfc18b]/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4 text-[#dfc18b]" />
                      </div>
                      <h5 className="font-serif text-base font-semibold text-white mb-1">
                        {pillar.title}
                      </h5>
                      <p className="text-xs text-[#ded3cb]/75 leading-relaxed font-light">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Consultation Trial Bar */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-black/60 via-[#1c1411] to-black/60 border border-[#c59b53]/35 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#dfc18b] font-semibold block">
                    Want to test your look first?
                  </span>
                  <span className="text-xs text-[#ded3cb]/80 block mt-0.5">
                    Book a comprehensive bridal trial with custom moodboard
                  </span>
                </div>

                <button
                  onClick={handleBookTrial}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold text-white bg-white/10 hover:bg-[#dfc18b] hover:text-[#19120f] border border-[#dfc18b]/50 rounded-xl transition-all duration-300 shadow-md shrink-0"
                >
                  Book Bridal Trial (₹2,999)
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
