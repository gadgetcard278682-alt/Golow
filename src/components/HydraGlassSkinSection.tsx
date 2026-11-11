import React, { useState } from 'react';
import { Droplets, Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowRight, Clock, Award } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

// High-fidelity generated imagery
import hydraFacialImg from '../assets/images/hydra_glass_facial_1793899863729.jpg';
import hydraGlowImg from '../assets/images/hydra_skin_glow_1793899876817.jpg';

interface HydraGlassSkinSectionProps {
  onBookHydra: (serviceName: string, price: number, notes: string) => void;
}

export const HydraGlassSkinSection: React.FC<HydraGlassSkinSectionProps> = ({ onBookHydra }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      num: '01',
      title: 'Ultrasonic Vortex Cleansing',
      tagline: 'Deep Follicle Purify',
      desc: 'Spiral vortex suction dislodges sebum, blackheads, and environmental micro-pollutants without erythema or pinching.',
      detail: 'Uses gentle salicylic and willow bark fluid to melt sebum plugs deep within the pores.'
    },
    {
      num: '02',
      title: 'Bio-Lactic Micro Brightening Peel',
      tagline: 'Gentle Cell Resurfacing',
      desc: 'Non-aggressive lactic and glycolic acid cocktail gently dissolves dead cellular layers and lifts dull sunspots.',
      detail: 'Formulated with soothing centella asiatica to prevent any redness or skin barrier distress.'
    },
    {
      num: '03',
      title: '98% Hyperbaric Oxygen Dome',
      tagline: 'Medical Grade Saturation',
      desc: 'Purified medical-grade oxygen pressurized dome infuses multi-molecular hyaluronic acid and anti-aging peptides.',
      detail: 'Stimulates cellular ATP production, leaving the epidermis plumped and translucent like blown glass.'
    },
    {
      num: '04',
      title: 'Cryo-Sculpting & Barrier Lock',
      tagline: '-5°C Pore Minimizing',
      desc: 'Sub-zero cryo-wand contours jawlines, reduces puffiness, and locks active ingredients under a glossy lipid shield.',
      detail: 'Creates an impenetrable dewy moisture seal that stays luminous for up to 3 weeks.'
    }
  ];

  const handleBook = () => {
    onBookHydra(
      'Hydra-Infusion Glass Skin Ritual',
      3299,
      'Requested Hydra-Infusion Glass Skin Protocol with Hyperbaric Oxygen Dome & Cryo Sculpting'
    );
  };

  return (
    <section id="glass-skin" className="py-24 lg:py-32 bg-[#0d1419] text-[#e8f1f5] relative overflow-hidden">
      {/* 3D Atmospheric Aquatic Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950/70 border border-sky-400/40 text-sky-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            <Droplets className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Clinical Dermatology Innovation</span>
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-wide leading-tight mb-6">
            Hydra-Infusion{' '}
            <span className="font-serif italic text-3d-cyan text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400">
              Glass Skin
            </span>{' '}
            Sanctuary
          </h2>

          <p className="text-sm sm:text-base text-sky-100/70 leading-relaxed font-light">
            Experience Seoul's gold-standard translucent glass skin ritual. Non-invasive vortex hydro-dermabrasion, 
            98% pure hyperbaric medical oxygen dome saturation, and triple-peptide barrier sculpting for an unedited, mirror-like radiance.
          </p>
        </div>

        {/* 3D Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3D Layered Composition with Generated Images */}
          <div className="lg:col-span-6 relative perspective-1200 flex items-center justify-center">
            {/* Primary 3D Card: Hydra Facial in Action */}
            <TiltCard3D className="w-full max-w-lg aspect-[4/3] rounded-3xl shadow-3d-float border border-sky-400/30 overflow-hidden relative group">
              <div className="relative w-full h-full">
                <img
                  src={hydraFacialImg}
                  alt="Hydra-Infusion Glass Skin Facial Clinical Treatment"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/hydra_glass_facial_1793899863729.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1419] via-transparent to-black/20 opacity-80" />

                {/* Floating 3D Badge on Top Left */}
                <div className="absolute top-5 left-5 bg-[#0d1419]/90 backdrop-blur-md border border-sky-400/50 px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs text-sky-200 transform-style-3d translate-z-30">
                  <Zap className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                  <span className="font-semibold tracking-wide">Vortex Oxygen Infusion</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 transform-style-3d translate-z-20">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-sky-400 font-bold block mb-1">
                    Live Clinical Protocol
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-white font-medium">
                    Triple Hyaluronic &amp; Hydro-Peel Delivery
                  </h4>
                </div>
              </div>
            </TiltCard3D>

            {/* Secondary Floating 3D Card: Overlapping Glass Skin Result */}
            <div className="hidden sm:block absolute -bottom-10 -right-6 lg:-right-10 w-52 sm:w-60 aspect-square rounded-2xl p-1.5 bg-gradient-to-br from-sky-400/40 via-cyan-500/20 to-sky-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.3)] backdrop-blur-xl border border-sky-300/40 z-20 animate-float-3d">
              <div className="relative w-full h-full rounded-xl overflow-hidden group">
                <img
                  src={hydraGlowImg}
                  alt="Translucent Korean Glass Skin Result"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/hydra_skin_glow_1793899876817.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-300 font-bold block">
                    Immediate Result
                  </span>
                  <p className="text-xs font-serif font-semibold text-white leading-tight">
                    Poreless Glass Translucency
                  </p>
                </div>
              </div>
            </div>

            {/* 3D Floating Metrics Pill */}
            <div className="absolute -top-6 right-2 sm:right-6 bg-gradient-to-r from-sky-900/90 to-cyan-950/90 border border-sky-400/50 rounded-2xl px-4 py-2.5 shadow-2xl backdrop-blur-md flex items-center gap-3 z-20">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-300 border border-sky-400/40">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif text-base sm:text-lg font-bold text-sky-200 block leading-tight">
                  +99.4%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-sky-300/80 block">
                  Epidermal Moisture
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Phase Protocol Breakdown & Quick Booking */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sky-400 font-bold">
              <Award className="w-4 h-4 text-sky-400" />
              <span>Seoul Clinical 4-Stage Architecture</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight">
              Four Layers of Deep Botanical &amp; Medical Infusion
            </h3>

            {/* Interactive Stages Accordion / List */}
            <div className="space-y-3">
              {stages.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <div
                    key={stage.num}
                    onClick={() => setActiveStage(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-950/80 via-cyan-950/60 to-transparent border-sky-400/70 shadow-[0_8px_24px_-6px_rgba(56,189,248,0.3)] ring-1 ring-sky-400/40 translate-x-1.5'
                        : 'bg-white/[0.03] border-white/10 hover:border-sky-400/30 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`w-8 h-8 rounded-xl font-serif text-sm font-bold flex items-center justify-center shrink-0 border transition-colors ${
                            isActive
                              ? 'bg-sky-400 text-[#0d1419] border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                              : 'bg-white/5 text-sky-300/70 border-white/10'
                          }`}
                        >
                          {stage.num}
                        </span>

                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-serif text-base sm:text-lg font-semibold text-white">
                              {stage.title}
                            </h5>
                            <span className="text-[10px] uppercase tracking-wider text-sky-400/90 font-medium hidden sm:inline">
                              · {stage.tagline}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-sky-100/75 leading-relaxed mt-1">
                            {stage.desc}
                          </p>

                          {isActive && (
                            <p className="text-xs text-sky-300/90 mt-2.5 pt-2.5 border-t border-sky-400/20 italic animate-fadeIn">
                              💡 {stage.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3 Clinical Advantages Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-sky-400/20 text-center">
                <Clock className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <span className="font-serif text-sm font-bold text-white block">75 Mins</span>
                <span className="text-[10px] text-sky-200/70 block uppercase tracking-wider">Duration</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-sky-400/20 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="font-serif text-sm font-bold text-white block">0 Downtime</span>
                <span className="text-[10px] text-sky-200/70 block uppercase tracking-wider">No Peeling</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-sky-400/20 text-center">
                <CheckCircle2 className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <span className="font-serif text-sm font-bold text-white block">Instant</span>
                <span className="text-[10px] text-sky-200/70 block uppercase tracking-wider">Dewy Mirror Glow</span>
              </div>
            </div>

            {/* Reservation Card with 3D Button */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-950/90 via-[#0d1419] to-cyan-950/90 border border-sky-400/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sky-300 font-semibold block">
                  Complete Clinical Glass Protocol
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    ₹3,299
                  </span>
                  <span className="text-xs text-sky-200/60 line-through">₹4,500</span>
                  <span className="text-[11px] text-emerald-400 font-semibold ml-1">Save 27%</span>
                </div>
              </div>

              <button
                onClick={handleBook}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-[0.16em] bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 hover:from-sky-300 hover:to-cyan-200 text-[#07131a] transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(56,189,248,0.5)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <span>Reserve Glass Skin Session</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
