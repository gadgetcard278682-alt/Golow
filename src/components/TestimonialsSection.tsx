import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/salonData';
import { Review } from '../types';
import { Star, CheckCircle, MessageSquareQuote, Plus, X } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [filterService, setFilterService] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Guest');
  const [newService, setNewService] = useState('Glow Radiance Facial');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const servicesList = [
    'all',
    'Royal HD Bridal Makeup',
    'Glow Radiance Facial',
    'Hair Couture & Balayage',
    'Party & Glam Makeup'
  ];

  const filteredReviews = reviews.filter(
    (rev) => filterService === 'all' || rev.service.toLowerCase().includes(filterService.toLowerCase())
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      role: newRole,
      service: newService,
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
      avatarLetter: newAuthor.trim().charAt(0).toUpperCase(),
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewComment('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#f5ede2]/70 border-b border-[#c59b53]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#c59b53] font-bold mb-3">
              <span className="w-5 h-[1.5px] bg-[#c59b53]" />
              <span>Client Voices</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2e231e]">
              What Our Clients Say
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#6e5f58] mt-2">
              <div className="flex text-[#c59b53]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c59b53]" />
                ))}
              </div>
              <span className="font-semibold text-[#2e231e]">4.98 out of 5</span>
              <span>· Based on 1,200+ verified studio appointments</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.14em] font-semibold text-white bg-[#19120f] hover:bg-[#c59b53] rounded transition-colors shadow-sm self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Leave A Review</span>
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 max-w-full">
          {servicesList.map((srv) => (
            <button
              key={srv}
              onClick={() => setFilterService(srv)}
              className={`px-3.5 py-1.5 text-xs rounded-full transition-all whitespace-nowrap ${
                filterService === srv
                  ? 'bg-[#19120f] text-[#dfc18b] font-medium'
                  : 'bg-white text-[#6e5f58] hover:text-[#2e231e] border border-[#c59b53]/20'
              }`}
            >
              {srv === 'all' ? 'All Reviews' : srv}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-3xl shadow-3d-card hover:shadow-3d-float border border-[#c59b53]/25 flex flex-col justify-between transition-all duration-300 relative transform-style-3d hover:-translate-y-1"
            >
              <MessageSquareQuote className="w-8 h-8 text-[#c59b53]/25 absolute top-5 right-5" />

              <div>
                {/* Rating Stars & Service */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#c59b53]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c59b53]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#6e5f58]">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#2e231e] italic font-light leading-relaxed mb-6">
                  “{rev.comment}”
                </p>
              </div>

              {/* Author & Service Meta */}
              <div className="pt-4 border-t border-[#c59b53]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfc18b] to-[#b3853b] text-white flex items-center justify-center font-serif font-bold text-base shadow">
                    {rev.avatarLetter}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#2e231e] flex items-center gap-1.5">
                      {rev.author}
                      {rev.verified && (
                        <span title="Verified Client" className="inline-flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] text-[#6e5f58] block">{rev.role}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[#c59b53] max-w-[110px] text-right truncate">
                  {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-[#faf5ee] w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#c59b53]/30">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#6e5f58] hover:text-[#2e231e]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-semibold text-[#2e231e] mb-2">
              Share Your Studio Experience
            </h3>
            <p className="text-xs text-[#6e5f58] mb-6">
              Your honest feedback helps us maintain our uncompromising standard of luxury care.
            </p>

            {formSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm text-center">
                ✓ Thank you! Your review has been published.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-[#6e5f58] mb-1 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Radhika Mehra"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-[#c59b53]/30 rounded focus:outline-none focus:border-[#c59b53]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.1em] text-[#6e5f58] mb-1 font-medium">
                      Service Enjoyed *
                    </label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#c59b53]/30 rounded focus:outline-none focus:border-[#c59b53]"
                    >
                      <option value="Glow Radiance Facial">Glow Radiance Facial</option>
                      <option value="Hair Couture & Spa">Hair Couture &amp; Spa</option>
                      <option value="Royal HD Bridal Makeup">Royal HD Bridal Makeup</option>
                      <option value="Nail Extensions & Art">Nail Extensions &amp; Art</option>
                      <option value="Aromatherapy Body Ritual">Aromatherapy Body Ritual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.1em] text-[#6e5f58] mb-1 font-medium">
                      Rating *
                    </label>
                    <div className="flex items-center gap-1.5 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newRating ? 'fill-[#c59b53] text-[#c59b53]' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-[#6e5f58] mb-1 font-medium">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us about the ambiance, your stylist, and results..."
                    className="w-full p-3 text-xs bg-white border border-[#c59b53]/30 rounded focus:outline-none focus:border-[#c59b53]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs uppercase tracking-[0.16em] font-bold text-white bg-gradient-to-r from-[#dfc18b] to-[#b3853b] hover:from-[#e8ce9e] hover:to-[#c59b53] rounded transition-transform"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
