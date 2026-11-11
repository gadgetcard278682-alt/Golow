import React from 'react';
import { Service } from '../types';
import { X, Clock, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#faf5ee] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-[#c59b53]/30 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#19120f]/70 hover:bg-[#19120f] text-white flex items-center justify-center transition-colors shadow-md"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-[#19120f]">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/assets/images/hero_salon_beauty.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#dfc18b] font-semibold mb-1">
              <span>{service.category.toUpperCase()}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {service.duration}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#c59b53]/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-[#6e5f58] block">
                Treatment Investment
              </span>
              <span className="font-serif text-3xl font-bold text-[#c59b53] tabular-nums">
                {service.priceDisplay}
              </span>
            </div>
            <span className="text-xs text-[#6e5f58]">Taxes &amp; Consultation included</span>
          </div>

          <p className="text-sm sm:text-base text-[#2e231e] leading-relaxed">
            {service.description}
          </p>

          {/* Inclusions */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#2e231e] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c59b53]" />
              <span>What is Included in Your Ritual</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6e5f58]">
              {service.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c59b53] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Benefits */}
          <div className="bg-[#f2eae0] p-4 rounded-xl border border-[#c59b53]/20">
            <h4 className="font-serif text-base font-semibold text-[#2e231e] mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#c59b53]" />
              <span>Visible Skin &amp; Hair Results</span>
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-[#2e231e]">
              {service.benefits.map((benefit, idx) => (
                <span
                  key={idx}
                  className="bg-white/80 px-3 py-1 rounded-full border border-[#c59b53]/30 font-medium"
                >
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBookService(service.name);
              }}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-sm text-xs uppercase tracking-[0.16em] font-bold text-white bg-gradient-to-r from-[#dfc18b] to-[#b3853b] hover:from-[#e6cda0] hover:to-[#c59b53] flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Book This Service Now</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3.5 text-xs uppercase tracking-[0.14em] font-medium text-[#6e5f58] hover:text-[#2e231e] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
