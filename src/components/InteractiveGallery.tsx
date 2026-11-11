import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem } from '../types';
import { TiltCard3D } from './TiltCard3D';
import { LightboxModal } from './LightboxModal';
import { Eye, Sparkles } from 'lucide-react';

export const InteractiveGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'hair', label: 'Haute Coiffure' },
    { id: 'makeup', label: 'Glam & Bridal' },
    { id: 'nails', label: 'Nail Art' },
    { id: 'spa', label: 'Spa Sanctum' }
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#faf5ee] border-b border-[#c59b53]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Head */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#c59b53] font-bold mb-3">
            <span className="w-5 h-[1.5px] bg-[#c59b53]" />
            <span>Interactive 3D Gallery</span>
            <span className="w-5 h-[1.5px] bg-[#c59b53]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2e231e] mb-4">
            Moments of Beauty in 3D
          </h2>
          <p className="text-sm sm:text-base text-[#6e5f58] font-light leading-relaxed">
            Hover your mouse or swipe across any picture below to experience dynamic 3D depth, light angles, and reflections. Click to enlarge.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto p-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase rounded-full transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#19120f] text-[#dfc18b] shadow-md font-semibold'
                  : 'bg-white text-[#6e5f58] hover:text-[#2e231e] border border-[#c59b53]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <TiltCard3D
              key={item.id}
              className="aspect-square group"
              onClick={() => setActiveItem(item)}
            >
              <div className="relative w-full h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/bridal_imperial_art.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Hover overlay hint */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#19120f]/70 text-[#dfc18b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Card Title Content */}
                <div className="absolute bottom-5 left-5 right-5 text-white transform-style-3d translate-z-10">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#dfc18b] font-semibold block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#ded3cb]/85 line-clamp-1 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <LightboxModal
          item={activeItem}
          items={filteredItems}
          onClose={() => setActiveItem(null)}
          onNavigate={(newItem) => setActiveItem(newItem)}
        />
      )}
    </section>
  );
};
