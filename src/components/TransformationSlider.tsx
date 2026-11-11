import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface TransformationCase {
  id: string;
  title: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  servicesUsed: string;
}

const CASES: TransformationCase[] = [
  {
    id: 'bridal-transform',
    title: 'Imperial Bridal Airbrush Transformation',
    category: 'Bridal Artistry',
    beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'From natural bare skin to regal royal bridal glow with HD airbrush foundation, kohl smoky eyes, and traditional jewellery setting.',
    servicesUsed: 'Royal HD Airbrush Bridal + Saree Draping'
  },
  {
    id: 'hair-balayage',
    title: 'Honey Caramel Dimensional Balayage',
    category: 'Hair Couture',
    beforeImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Transforming dull, flat brown hair into multi-tonal dimensional ribbons of warm caramel and gold, protected by Olaplex bond repair.',
    servicesUsed: 'Custom Balayage + Olaplex Bond Treatment'
  }
];

export const TransformationSlider: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeCase = CASES[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#f6f0e6] border-b border-[#c59b53]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#c59b53] font-bold mb-3">
            <Sparkles className="w-4 h-4 text-[#c59b53]" />
            <span>Real Results</span>
            <Sparkles className="w-4 h-4 text-[#c59b53]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2e231e] mb-4">
            Interactive Transformations
          </h2>
          <p className="text-sm sm:text-base text-[#6e5f58] font-light leading-relaxed">
            Drag the gold slider handle left and right to inspect the artistry and meticulous craft behind our signature transformations.
          </p>

          {/* Switcher */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {CASES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] rounded transition-all ${
                  activeCaseIndex === idx
                    ? 'bg-[#19120f] text-[#dfc18b] shadow-md'
                    : 'bg-white text-[#6e5f58] hover:text-[#2e231e] border border-[#c59b53]/25'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* The Comparison Canvas */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-[#c59b53]/30 select-none cursor-ew-resize bg-black"
          >
            {/* After Image (Base layer) */}
            <img
              src={activeCase.afterImg}
              alt={`${activeCase.title} - After`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/assets/images/bridal_imperial_art.jpg';
              }}
            />
            <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#19120f]/80 text-[#dfc18b] text-[11px] uppercase tracking-[0.16em] font-semibold rounded backdrop-blur-sm shadow">
              After Transformation
            </span>

            {/* Before Image (Clipped layer) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeCase.beforeImg}
                alt={`${activeCase.title} - Before`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/hydra_skin_glow.jpg';
                }}
              />
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#19120f]/80 text-[#ded3cb] text-[11px] uppercase tracking-[0.16em] font-semibold rounded backdrop-blur-sm shadow">
                Before
              </span>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 w-1 bg-gradient-to-b from-[#dfc18b] via-white to-[#b3853b] shadow-[0_0_15px_rgba(223,193,139,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#19120f] border-2 border-[#dfc18b] text-[#dfc18b] flex items-center justify-center shadow-2xl">
                <MoveHorizontal className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Details below slider */}
          <div className="mt-6 p-6 bg-white rounded-xl border border-[#c59b53]/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2e231e] mb-1">
                {activeCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6e5f58] font-light max-w-xl">
                {activeCase.description}
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#6e5f58] block">
                Signature Protocol
              </span>
              <span className="text-xs font-semibold text-[#c59b53]">
                {activeCase.servicesUsed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
