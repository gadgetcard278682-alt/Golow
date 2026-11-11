import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate
}) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(items[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onNavigate(items[prevIndex]);
      }
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % items.length;
        onNavigate(items[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items, onClose, onNavigate]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 z-20 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-[#dfc18b] p-3 rounded-full bg-black/40 hover:bg-black/80 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-[#dfc18b] p-3 rounded-full bg-black/40 hover:bg-black/80 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Image & Caption Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[88vh] flex flex-col rounded-xl overflow-hidden bg-[#19120f] border border-[#c59b53]/30 shadow-2xl"
      >
        <div className="relative flex-1 max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.fullImage || item.image}
            alt={item.title}
            className="w-full h-full max-h-[70vh] object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/assets/images/bridal_imperial_art.jpg';
            }}
          />
        </div>

        <div className="p-5 sm:p-6 bg-[#19120f] border-t border-[#c59b53]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#dfc18b] font-semibold block mb-1">
              {item.tag}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#ded3cb]/80 mt-1 max-w-xl">
              {item.description}
            </p>
          </div>
          <div className="text-xs text-[#dfc18b]/60 whitespace-nowrap self-end sm:self-center font-mono">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};
