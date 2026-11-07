import React, { useState } from 'react';
import { FAQS } from '../data/salonData';
import { TiltCard3D } from './TiltCard3D';
import { Plus, HelpCircle, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';

// High-fidelity generated concierge consultation imagery
import conciergeImg from '../assets/images/concierge_consult_spa_1793959914745.jpg';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Booking', 'Bridal', 'Products', 'Policies'];

  const filteredFaqs = FAQS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#faf5ee] border-b border-[#c59b53]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#c59b53] font-bold mb-3">
            <HelpCircle className="w-4 h-4 text-[#c59b53]" />
            <span>Questions &amp; Clarity</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2e231e] mb-4 text-3d-subtle">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#6e5f58] font-light leading-relaxed">
            Everything you need to know about our appointment booking, trial sessions, luxury sanitation standards, and salon policies.
          </p>

          {/* Categories */}
          <div className="flex items-center justify-center gap-2 mt-6 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-[0.1em] font-medium rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-[#19120f] text-[#dfc18b] shadow-md'
                    : 'bg-white text-[#6e5f58] hover:text-[#2e231e] border border-[#c59b53]/20'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: 3D Ambience Photo + Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: 3D Layered Ambience Visual Card */}
          <div className="lg:col-span-5 relative perspective-1200">
            <TiltCard3D className="w-full aspect-[4/5] shadow-3d-float rounded-3xl">
              <div className="relative w-full h-full">
                <img
                  src={conciergeImg}
                  alt="We Are Here To Assist - Luxury Studio Concierge & Consultation"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/src/assets/images/concierge_consult_spa.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-black/30 to-transparent opacity-85" />

                {/* Floating 3D Badge */}
                <div className="absolute top-4 left-4 bg-[#19120f]/85 backdrop-blur-md border border-[#dfc18b]/50 px-3 py-1.5 rounded-xl shadow-3d-float flex items-center gap-2 text-xs text-[#dfc18b] transform-style-3d translate-z-20">
                  <ShieldCheck className="w-4 h-4 text-[#dfc18b]" />
                  <span className="font-semibold">Concierge Support</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white transform-style-3d translate-z-20">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#dfc18b] font-semibold block mb-1">
                    Still Have A Question?
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                    We Are Here To Assist
                  </h3>
                  <p className="text-xs text-[#ded3cb]/90 font-light mb-4 leading-relaxed">
                    Our master artists provide complimentary skin and hair consultations before every appointment.
                  </p>
                  <a
                    href="https://wa.me/919876543210?text=Hello%20Glow%20Beauty%20Studio,%20I%20have%20a%20question%20regarding%20treatments."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#dfc18b] to-[#b3853b] text-[#19120f] font-bold text-xs uppercase tracking-wider shadow-3d-button hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Ask Our Concierge</span>
                  </a>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Right Column: Accordion list */}
          <div className="lg:col-span-7 space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#c59b53]/25 overflow-hidden transition-all duration-300 shadow-3d-card"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-semibold text-[#2e231e] hover:text-[#c59b53] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#f6f0e6] text-[#c59b53] flex items-center justify-center shrink-0 transition-transform duration-300 shadow-sm ${
                        isOpen ? 'rotate-45 bg-[#19120f] text-[#dfc18b]' : ''
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#6e5f58] font-light leading-relaxed border-t border-[#c59b53]/15 pt-4 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
