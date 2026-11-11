import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/salonData';
import { Service } from '../types';
import { TiltCard3D } from './TiltCard3D';
import { Clock, Sparkles, Search, Info, Palette } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onViewDetails: (service: Service) => void;
}

export const THEME_VARIATIONS = [
  { id: '24k-gold', name: '24K Imperial Gold', tag: 'Pure Gold Leaf + Saffron' },
  { id: 'cleopatra-rose', name: 'Cleopatra Rose & Milk', tag: 'Damascus Rose + Hydrojelly' },
  { id: 'moroccan-amber', name: 'Moroccan Amber Hammam', tag: 'Warm Argan + Eucalyptus' }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewDetails
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedThemeVariation, setSelectedThemeVariation] = useState<string>('24K Imperial Gold');

  const categories = [
    { id: 'all', label: 'All Rituals' },
    { id: 'themed', label: 'Themed Rituals' },
    { id: 'facial', label: 'Facials' },
    { id: 'hair', label: 'Hair Couture' },
    { id: 'nails', label: 'Luxury Nails' },
    { id: 'makeup', label: 'Glam Makeup' },
    { id: 'spa', label: 'Body Spa' }
  ];

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#f5ede2]/80 border-b border-[#c59b53]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#c59b53] font-bold mb-3">
            <span className="w-5 h-[1.5px] bg-[#c59b53]" />
            <span>Our Services</span>
            <span className="w-5 h-[1.5px] bg-[#c59b53]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2e231e] mb-4">
            Bespoke Salon &amp; Spa Treatments
          </h2>
          <p className="text-sm sm:text-base text-[#6e5f58] font-light leading-relaxed">
            Select from our curated menu of head-to-toe beauty rituals and signature themed wellness journeys crafted to enhance your natural radiance.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#c59b53]/20">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-white/70 backdrop-blur-sm rounded-lg border border-[#c59b53]/25 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-[0.1em] uppercase rounded-md transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#19120f] text-[#dfc18b] shadow-sm font-semibold'
                    : 'text-[#6e5f58] hover:text-[#2e231e] hover:bg-black/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#6e5f58] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments or themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white/80 border border-[#c59b53]/25 rounded-md focus:outline-none focus:border-[#c59b53] text-[#2e231e] placeholder:text-[#6e5f58]/60"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const isThemedRitual = service.id === 'gold-theme-ritual';
            return (
              <div
                key={service.id}
                className={`group bg-white rounded-3xl overflow-hidden shadow-3d-card hover:shadow-3d-float transition-all duration-300 border flex flex-col transform-style-3d hover:-translate-y-1.5 ${
                  isThemedRitual
                    ? 'border-[#dfc18b] ring-2 ring-[#dfc18b]/50 shadow-3d-float'
                    : 'border-[#c59b53]/25'
                }`}
              >
                {/* 3D Tilt Image */}
                <div className="h-56 w-full p-2.5 pb-0">
                  <TiltCard3D
                    className="w-full h-full"
                    onClick={() => onViewDetails(service)}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/images/hero_salon_beauty.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {isThemedRitual ? (
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-[#dfc18b] to-[#b3853b] text-[#19120f] text-[10px] uppercase font-bold tracking-[0.14em] px-2.5 py-0.5 rounded shadow-md flex items-center gap-1">
                          <Palette className="w-3 h-3" />
                          Signature Theme
                        </span>
                      ) : service.popular ? (
                        <span className="absolute top-3 left-3 bg-[#c59b53] text-white text-[10px] uppercase font-bold tracking-[0.14em] px-2.5 py-0.5 rounded shadow-md">
                          Signature
                        </span>
                      ) : null}

                      <span className="absolute bottom-3 right-3 bg-[#19120f]/80 text-[#dfc18b] text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.duration}
                      </span>
                    </div>
                  </TiltCard3D>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2e231e] group-hover:text-[#c59b53] transition-colors leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6e5f58] line-clamp-2 leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>

                  {/* Interactive Theme Variation Selector if it's the Themed Ritual */}
                  {isThemedRitual && (
                    <div className="mb-4 p-3 bg-[#fdfbf9] rounded-xl border border-[#c59b53]/30">
                      <div className="flex items-center justify-between text-[11px] text-[#6e5f58] mb-2 font-medium">
                        <span className="flex items-center gap-1 text-[#c59b53] font-semibold">
                          <Palette className="w-3.5 h-3.5" />
                          Choose Experience Theme:
                        </span>
                        <span className="text-[#19120f] font-bold">{selectedThemeVariation}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {THEME_VARIATIONS.map((thm) => (
                          <button
                            key={thm.id}
                            type="button"
                            onClick={() => setSelectedThemeVariation(thm.name)}
                            className={`px-2 py-1.5 text-[10px] rounded border text-center transition-all ${
                              selectedThemeVariation === thm.name
                                ? 'bg-[#19120f] text-[#dfc18b] border-[#19120f] font-bold shadow-sm'
                                : 'bg-white text-[#6e5f58] border-[#c59b53]/25 hover:border-[#c59b53]'
                            }`}
                            title={thm.tag}
                          >
                            {thm.name.split(' ')[0]} {thm.name.split(' ')[1] || ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price and Details link */}
                  <div className="pt-3 border-t border-[#c59b53]/15 flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#6e5f58] block">
                        Starting at
                      </span>
                      <span className="font-serif text-xl font-bold text-[#c59b53] tabular-nums">
                        {service.priceDisplay}
                      </span>
                    </div>
                    <button
                      onClick={() => onViewDetails(service)}
                      className="text-xs text-[#6e5f58] hover:text-[#c59b53] font-medium flex items-center gap-1 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Inclusions</span>
                    </button>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => {
                      const bookName = isThemedRitual
                        ? `${service.name} (${selectedThemeVariation})`
                        : service.name;
                      onSelectService(bookName);
                    }}
                    className={`w-full py-2.5 text-xs font-semibold tracking-[0.14em] uppercase rounded transition-all duration-300 shadow-3d-button active:scale-[0.98] flex items-center justify-center gap-2 ${
                      isThemedRitual
                        ? 'bg-gradient-to-r from-[#dfc18b] via-[#c59b53] to-[#b3853b] hover:from-[#e8ce9e] hover:to-[#c59b53] text-[#19120f] font-bold'
                        : 'text-white bg-[#19120f] hover:bg-gradient-to-r hover:from-[#dfc18b] hover:to-[#b3853b] hover:text-[#19120f]'
                    }`}
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isThemedRitual ? 'text-[#19120f]' : 'text-[#dfc18b]'}`} />
                    <span>{isThemedRitual ? `Book ${selectedThemeVariation.split(' ')[0]} Theme` : 'Book Service'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-[#c59b53]/30">
            <p className="text-base text-[#6e5f58] font-serif mb-2">
              No rituals found matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-[0.14em] font-semibold text-[#c59b53] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
