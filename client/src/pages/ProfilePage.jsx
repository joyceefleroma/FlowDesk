import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { User, Mail, Globe, Save, Shield, Sliders, Bell } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || '');
  const [timezone, setTimezone] = useState(user?.timezone || 'UTC');
  const [inAppNotifications, setInAppNotifications] = useState(
    user?.preferences?.inAppNotifications ?? true
  );
  const [advanceHours, setAdvanceHours] = useState(
    user?.preferences?.upcomingDeadlineThresholdHours || 24
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.warning('Name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({
        name: name.trim(),
        timezone: timezone.trim(),
        preferences: {
          inAppNotifications,
          upcomingDeadlineThresholdHours: Number(advanceHours),
        },
      });
      toast.success('Profile and preferences updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Profile & Preferences
        </h2>
        <p className="text-xs sm:text-sm text-white/60">
          Manage your account profile, timezone localization, and automation notification settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Details Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-sm font-bold text-white">
            <User className="w-4 h-4 text-brand-lightRed" />
            Account Information
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email Address (Immutable)"
              icon={Mail}
              value={user?.email || ''}
              disabled
              className="opacity-60 cursor-not-allowed"
            />
          </div>

          <Input
            label="Default Timezone"
            icon={Globe}
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            placeholder="e.g. America/New_York, Asia/Kolkata, Europe/London"
          />
        </div>

        {/* Automation Preferences Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-sm font-bold text-white">
            <Sliders className="w-4 h-4 text-white" />
            Automation & Notification Preferences
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div>
              <h5 className="text-xs font-bold text-white">In-App Notifications</h5>
              <p className="text-[11px] text-white/60">
                Receive live alerts and toast notifications when workflows execute
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={inAppNotifications}
                onChange={(e) => setInAppNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
              Default Upcoming Deadline Notice Window (Hours)
            </label>
            <input
              type="number"
              min={1}
              max={168}
              value={advanceHours}
              onChange={(e) => setAdvanceHours(Number(e.target.value))}
              className="w-full sm:w-48 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red focus:bg-white/[0.06] transition-all"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" variant="glow" size="lg" icon={Save} isLoading={isSubmitting}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
