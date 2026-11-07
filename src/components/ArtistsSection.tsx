import React from 'react';
import { TEAM_MEMBERS } from '../data/salonData';
import { TiltCard3D } from './TiltCard3D';
import { Star, Award, Calendar } from 'lucide-react';

interface ArtistsSectionProps {
  onBookWithArtist: (artistName: string) => void;
}

export const ArtistsSection: React.FC<ArtistsSectionProps> = ({ onBookWithArtist }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#faf5ee] border-b border-[#c59b53]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#c59b53] font-bold mb-3">
            <Award className="w-4 h-4 text-[#c59b53]" />
            <span>Master Craftsmen</span>
            <Award className="w-4 h-4 text-[#c59b53]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2e231e] mb-4">
            Meet Our Senior Master Artists
          </h2>
          <p className="text-sm sm:text-base text-[#6e5f58] font-light leading-relaxed">
            International-certified hair stylists and celebrity makeup artists committed to artistic perfection, anatomical precision, and heartfelt hospitality.
          </p>
        </div>

        {/* Team Grid with 3D Tilt & Layered Depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-3d-card hover:shadow-3d-float transition-all duration-300 border border-[#c59b53]/25 flex flex-col transform-style-3d hover:-translate-y-1.5"
            >
              {/* Photo 3D Tilt */}
              <div className="p-3 pb-0 h-64">
                <TiltCard3D className="w-full h-full rounded-2xl">
                  <div className="relative w-full h-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs transform-style-3d translate-z-10">
                      <span className="flex items-center gap-1 bg-[#19120f]/85 px-2 py-0.5 rounded-lg text-[#dfc18b] font-medium backdrop-blur-sm shadow border border-white/10">
                        <Star className="w-3.5 h-3.5 fill-[#dfc18b]" />
                        {member.rating} ({member.reviewsCount})
                      </span>
                      <span className="text-[10px] text-white/95 bg-black/60 px-2 py-0.5 rounded-lg border border-white/20">
                        {member.experience}
                      </span>
                    </div>
                  </div>
                </TiltCard3D>
              </div>

              {/* Info Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#2e231e] group-hover:text-[#c59b53] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.1em] text-[#c59b53] font-semibold block mb-2">
                    {member.role}
                  </span>
                  <p className="text-xs text-[#6e5f58] font-light leading-relaxed mb-4">
                    Specialty: <strong className="font-medium text-[#2e231e]">{member.specialty}</strong>
                  </p>
                </div>

                <button
                  onClick={() => onBookWithArtist(member.name)}
                  className="w-full py-2.5 text-xs uppercase tracking-[0.14em] font-bold text-[#19120f] bg-gradient-to-r from-[#f5e4cc] via-[#dfc18b] to-[#b3853b] hover:from-white hover:to-[#dfc18b] rounded-xl transition-all duration-300 shadow-3d-button hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 border border-[#dfc18b]/60"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#19120f]" />
                  <span>Book with {member.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
