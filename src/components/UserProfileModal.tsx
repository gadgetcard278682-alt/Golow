import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, User, Mail, Phone, Sparkles, Check, RefreshCw, Palette, Shield } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
  onResetProfile: () => void;
}

export const AVATAR_OPTIONS = [
  { id: 'av-1', label: 'Elegance', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 'av-2', label: 'Radiance', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
  { id: 'av-3', label: 'Royale', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
  { id: 'av-4', label: 'Minimalist', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
  { id: 'av-5', label: 'Monogram', url: '' } // Uses custom initials with gradient
];

export const GRADIENT_PALETTES = [
  { name: 'Imperial Gold', value: 'from-[#dfc18b] via-[#c59b53] to-[#b3853b]' },
  { name: 'Rose Quartz', value: 'from-[#fbcfe8] via-[#f472b6] to-[#db2777]' },
  { name: 'Champagne Silk', value: 'from-[#fef3c7] via-[#fde68a] to-[#d97706]' },
  { name: 'Midnight Velvet', value: 'from-[#334155] via-[#1e293b] to-[#0f172a]' },
  { name: 'Emerald Serenity', value: 'from-[#6ee7b7] via-[#10b981] to-[#047857]' }
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetProfile
}) => {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [avatarColor, setAvatarColor] = useState(profile.avatarColor);
  const [skinType, setSkinType] = useState(profile.skinType || 'Combination / Sensitive');
  const [membershipTier, setMembershipTier] = useState(profile.membershipTier);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      setToastMessage('Username and Email are required.');
      return;
    }

    const updated: UserProfile = {
      username: username.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatarUrl,
      avatarColor,
      skinType,
      membershipTier,
      notificationsEnabled: true
    };

    onSaveProfile(updated);
    setToastMessage('Profile details saved successfully! All bookings will be pre-filled.');
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    onResetProfile();
    setToastMessage('Profile reset to default.');
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 1000);
  };

  const initials = username.trim()
    ? username.trim().split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'G';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#faf5ee] w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#c59b53]/35 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-[#c59b53]/25 text-[#6e5f58] hover:text-[#2e231e] flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close Profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c59b53] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Member Suite</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2e231e]">
            Your Glow Profile &amp; Preferences
          </h3>
          <p className="text-xs text-[#6e5f58]">
            Customize your avatar, contact credentials, and beauty preferences for effortless 1-click reservations.
          </p>
        </div>

        {toastMessage && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center font-medium animate-fadeIn">
            ✓ {toastMessage}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar Preview & Customization */}
          <div className="bg-white p-5 rounded-2xl border border-[#c59b53]/20 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            {/* Live Avatar Preview */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#dfc18b] via-[#c59b53] to-[#b3853b] shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#19120f] flex items-center justify-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={username}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-tr ${avatarColor} flex items-center justify-center font-serif text-2xl font-bold text-white shadow-inner`}
                    >
                      {initials}
                    </div>
                  )}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#19120f] text-[#dfc18b] text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border border-[#c59b53]/30">
                VIP
              </span>
            </div>

            {/* Avatar Selectors */}
            <div className="flex-1 w-full space-y-3">
              <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#6e5f58] block">
                Choose Avatar Style
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {AVATAR_OPTIONS.map((opt) => {
                  const isSelected = avatarUrl === opt.url;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => {
                        setAvatarUrl(opt.url);
                        setShowCustomInput(false);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-[#19120f] text-[#dfc18b] border-[#19120f]'
                          : 'bg-[#faf5ee] text-[#2e231e] border-[#c59b53]/25 hover:border-[#c59b53]'
                      }`}
                    >
                      {opt.url ? (
                        <img
                          src={opt.url}
                          alt={opt.label}
                          className="w-4 h-4 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Palette className="w-3.5 h-3.5 text-[#c59b53]" />
                      )}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className="px-2.5 py-1 text-xs text-[#c59b53] hover:underline"
                >
                  {showCustomInput ? 'Close URL' : '+ Custom URL'}
                </button>
              </div>

              {/* Custom Image URL input if opened */}
              {showCustomInput && (
                <div className="pt-2 animate-fadeIn">
                  <input
                    type="url"
                    placeholder="https://example.com/my-photo.jpg"
                    value={customUrlInput}
                    onChange={(e) => {
                      setCustomUrlInput(e.target.value);
                      setAvatarUrl(e.target.value);
                    }}
                    className="w-full px-3 py-1.5 text-xs bg-[#faf5ee] border border-[#c59b53]/30 rounded focus:outline-none focus:border-[#c59b53]"
                  />
                </div>
              )}

              {/* Color Palette for Monogram */}
              {!avatarUrl && (
                <div className="pt-2">
                  <span className="text-[10px] uppercase text-[#6e5f58] block mb-1">
                    Monogram Theme:
                  </span>
                  <div className="flex gap-2">
                    {GRADIENT_PALETTES.map((pal) => (
                      <button
                        type="button"
                        key={pal.name}
                        title={pal.name}
                        onClick={() => setAvatarColor(pal.value)}
                        className={`w-6 h-6 rounded-full bg-gradient-to-tr ${pal.value} border-2 ${
                          avatarColor === pal.value ? 'border-[#19120f] scale-110' : 'border-transparent'
                        } transition-transform`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1">
                Full Name / Username *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6e5f58] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Riya Kapoor"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-white border border-[#e2d8cf] rounded-lg focus:outline-none focus:border-[#c59b53] text-[#2e231e]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6e5f58] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="riya@example.com"
                    className="w-full pl-10 pr-3 py-2.5 text-xs bg-white border border-[#e2d8cf] rounded-lg focus:outline-none focus:border-[#c59b53] text-[#2e231e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#6e5f58] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-3 py-2.5 text-xs bg-white border border-[#e2d8cf] rounded-lg focus:outline-none focus:border-[#c59b53] text-[#2e231e]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1">
                  Skin &amp; Hair Type
                </label>
                <select
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#e2d8cf] rounded-lg focus:outline-none focus:border-[#c59b53] text-[#2e231e]"
                >
                  <option value="Normal / Balanced">Normal / Balanced</option>
                  <option value="Dry / Dehydrated">Dry / Dehydrated</option>
                  <option value="Sensitive & Redness Prone">Sensitive &amp; Redness Prone</option>
                  <option value="Combination / T-Zone">Combination / T-Zone</option>
                  <option value="Oily / Acne Prone">Oily / Acne Prone</option>
                  <option value="Bridal Preparation Mode">Bridal Preparation Focus</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6e5f58] font-semibold mb-1">
                  Membership Tier
                </label>
                <select
                  value={membershipTier}
                  onChange={(e) => setMembershipTier(e.target.value as any)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#e2d8cf] rounded-lg focus:outline-none focus:border-[#c59b53] text-[#2e231e]"
                >
                  <option value="Glow Member">Glow Member (Standard Privileges)</option>
                  <option value="Glow VIP">Glow VIP (Complimentary Consultation)</option>
                  <option value="Royal Bridal Privileged">Royal Bridal Privileged (Priority Stylist)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#c59b53]/25 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#6e5f58] hover:text-[#2e231e] flex items-center gap-1.5 font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 text-xs uppercase tracking-[0.12em] font-semibold text-[#6e5f58] hover:text-[#2e231e]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 sm:w-auto px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-bold text-white bg-gradient-to-r from-[#dfc18b] via-[#c59b53] to-[#b3853b] hover:from-[#e8ce9e] hover:to-[#c59b53] rounded shadow-md transition-transform"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
