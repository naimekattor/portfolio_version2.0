'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAdmin } from '../admin-context';
import { Sparkles, Save, Layout } from 'lucide-react';

const DEFAULT_HERO = {
  badgeText: 'Available for new projects',
  badgeDotPulse: true,
  titleLine1: 'Full-Stack Developer Building',
  titleHighlight: 'Scalable AI-Powered',
  titleLine2: 'Web Applications',
  description:
    'I bridge the gap between complex technical problems and elegant, production-ready solutions that deliver real business value.',
  primaryCtaText: 'View Projects',
  primaryCtaLink: '#projects',
  secondaryCtaText: 'Download Resume',
  secondaryCtaLink:
    'https://drive.google.com/file/d/1wlKh0G_yN_v7uOFnVjonwCqk9_ROxuPB/view?usp=sharing',
};

export default function AdminHeroPage() {
  const { siteSettings, saveSiteSettings } = useAdmin();
  const [heroForm, setHeroForm] = useState(DEFAULT_HERO);
  const [savingHero, setSavingHero] = useState(false);

  useEffect(() => {
    if (siteSettings?.hero_section) {
      setHeroForm((prev) => ({ ...prev, ...siteSettings.hero_section }));
    }
  }, [siteSettings]);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    const success = await saveSiteSettings({
      hero_section: heroForm,
    });
    setSavingHero(false);
    if (success) toast.success('Hero Section updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              Hero Section CMS Control
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Customize headline text, badges, descriptions, and call-to-action buttons for your homepage hero banner.
            </p>
          </div>
          <button
            onClick={handleSaveHero}
            disabled={savingHero}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/30"
          >
            <Save className="w-4 h-4" />
            {savingHero ? 'Saving...' : 'Save Hero Section'}
          </button>
        </div>

        <form onSubmit={handleSaveHero} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badge Text */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Badge Text
              </label>
              <input
                type="text"
                value={heroForm.badgeText}
                onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. AVAILABLE FOR NEW PROJECTS"
              />
            </div>

            {/* Pulse Dot Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Badge Pulse Dot Indicator
              </label>
              <label className="flex items-center gap-3 cursor-pointer mt-3">
                <input
                  type="checkbox"
                  checked={heroForm.badgeDotPulse}
                  onChange={(e) => setHeroForm({ ...heroForm, badgeDotPulse: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                />
                <span className="text-sm text-slate-300 font-medium">
                  Show animated green pulse dot in badge
                </span>
              </label>
            </div>

            {/* Title Line 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Main Headline (Prefix Text)
              </label>
              <input
                type="text"
                value={heroForm.titleLine1}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Full-Stack Developer Building"
              />
            </div>

            {/* Title Highlight */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Highlighted Accent Text
              </label>
              <input
                type="text"
                value={heroForm.titleHighlight}
                onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-amber-400 font-bold focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Scalable AI-Powered"
              />
            </div>

            {/* Title Line 2 */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Headline (Suffix Text)
              </label>
              <input
                type="text"
                value={heroForm.titleLine2}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Web Applications"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Hero Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={heroForm.description}
                onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                placeholder="Describe your primary proposition..."
              />
            </div>

            {/* Primary CTA */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Primary Button Label
              </label>
              <input
                type="text"
                value={heroForm.primaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. View Projects"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Primary Button Target Link
              </label>
              <input
                type="text"
                value={heroForm.primaryCtaLink}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. #projects"
              />
            </div>

            {/* Secondary CTA */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={heroForm.secondaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Download Resume"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Secondary Button Target Link (URL / Drive PDF)
              </label>
              <input
                type="text"
                value={heroForm.secondaryCtaLink}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. https://drive.google.com/..."
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
