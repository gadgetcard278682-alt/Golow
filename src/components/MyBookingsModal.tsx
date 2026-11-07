import React from 'react';
import { Booking } from '../types';
import { X, Calendar, Clock, User, Phone, CheckCircle, Trash2 } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-[#faf5ee] w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#c59b53]/30 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c59b53]/20 mb-6">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#c59b53] font-bold block mb-1">
              Your Scheduled Visits
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#2e231e]">
              My Appointments ({bookings.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#c59b53]/30 text-[#6e5f58] hover:text-[#2e231e] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-[#6e5f58]">
              <Calendar className="w-12 h-12 text-[#c59b53]/40 mx-auto mb-3" />
              <p className="font-serif text-lg text-[#2e231e]">No upcoming appointments yet</p>
              <p className="text-xs text-[#6e5f58] mt-1">
                Select any treatment or bridal package to reserve your slot with our stylists.
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white p-5 rounded-xl border border-[#c59b53]/25 shadow-sm space-y-3 relative"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#c59b53] tracking-widest font-bold">
                      {b.bookingCode}
                    </span>
                    <h4 className="font-serif text-lg font-semibold text-[#2e231e]">
                      {b.serviceName}
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#6e5f58] bg-[#fdfbf9] p-3 rounded-lg border border-[#c59b53]/15">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#c59b53]" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#c59b53]" />
                    <span>{b.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#c59b53]" />
                    <span>{b.stylistName}</span>
                  </div>
                </div>

                {b.notes && (
                  <p className="text-[11px] text-[#6e5f58] italic">
                    Note: "{b.notes}"
                  </p>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-medium text-[#2e231e]">
                    Est. Total: <strong className="font-serif text-[#c59b53] text-sm tabular-nums">₹{b.totalPrice.toLocaleString()}</strong>
                  </span>

                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 text-[11px] transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Cancel Appointment</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#c59b53]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#19120f] border border-[#c59b53]/30 rounded hover:bg-black/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
