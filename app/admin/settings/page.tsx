'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '../admin-context';
import { Sliders, Languages, Type, Palette, Globe, Save } from 'lucide-react';

const DEFAULT_GLOBAL_SETTINGS = {
  language: 'en',
  fontFamily: 'Inter',
  colorTheme: 'warm-amber',
  siteTitle: "Naim's Portfolio - Full-Stack Developer",
  metaDescription:
    'Full-Stack Developer building scalable AI-powered web applications and robust microservices.',
  ownerName: 'Naim',
  contactEmail: 'naim.coder@gmail.com',
  analyticsId: 'G-XXXXXXX',
};

const LANGUAGES = [
  { code: 'en', label: 'English (US)' },
  { code: 'es', label: 'Spanish (Español)' },
  { code: 'fr', label: 'French (Français)' },
  { code: 'de', label: 'German (Deutsch)' },
  { code: 'bn', label: 'Bengali (বাংলা)' },
  { code: 'ja', label: 'Japanese (日本語)' },
];

const FONTS = [
  { name: 'Inter', family: 'var(--font-inter), sans-serif' },
  { name: 'Outfit', family: 'var(--font-outfit), sans-serif' },
  { name: 'Plus Jakarta Sans', family: 'sans-serif' },
  { name: 'Roboto', family: 'sans-serif' },
  { name: 'Space Grotesk', family: 'monospace' },
  { name: 'Fira Code', family: 'monospace' },
];

const COLOR_THEMES = [
  { id: 'warm-amber', label: 'Warm Amber & Dark Forest', primary: '#171310', accent: '#b5502f' },
  { id: 'emerald-dark', label: 'Emerald Tech', primary: '#064e3b', accent: '#10b981' },
  { id: 'deep-indigo', label: 'Deep Indigo Modern', primary: '#1e1b4b', accent: '#6366f1' },
  { id: 'slate-minimal', label: 'Minimalist Slate', primary: '#0f172a', accent: '#38bdf8' },
  { id: 'sunset-purple', label: 'Sunset Violet', primary: '#2e1065', accent: '#a855f7' },
];

export default function AdminSettingsPage() {
  const { siteSettings, saveSiteSettings } = useAdmin();
  const [globalSettings, setGlobalSettings] = useState(DEFAULT_GLOBAL_SETTINGS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteSettings?.global_site_settings) {
      setGlobalSettings((prev) => ({ ...prev, ...siteSettings.global_site_settings }));
    }
  }, [siteSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const success = await saveSiteSettings({
      global_site_settings: globalSettings,
    });
    setSaving(false);
    if (success) {
      alert('Global site settings, language, font, and theme updated successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sliders className="w-6 h-6 text-indigo-400" />
              Global Site Settings & Customizations
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Configure system language, font typography, color theme palette, and SEO metadata.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/30"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* SECTION 1: LANGUAGE CONTROL */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-indigo-400">
              <Languages className="w-4 h-4" /> System Language & Localization
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => setGlobalSettings({ ...globalSettings, language: lang.code })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    globalSettings.language === lang.code
                      ? 'bg-indigo-600/10 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{lang.label}</span>
                    <span className="text-xs font-mono uppercase bg-slate-900 px-2 py-0.5 rounded text-slate-400">
                      {lang.code}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* SECTION 2: FONT TYPOGRAPHY CONTROL */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-indigo-400">
              <Type className="w-4 h-4" /> Typography & Font Family
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {FONTS.map((font) => (
                <div
                  key={font.name}
                  onClick={() => setGlobalSettings({ ...globalSettings, fontFamily: font.name })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    globalSettings.fontFamily === font.name
                      ? 'bg-indigo-600/10 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-base font-bold block mb-1" style={{ fontFamily: font.family }}>
                    {font.name}
                  </span>
                  <span className="text-xs text-slate-500">Sample: The quick brown fox jumps</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* SECTION 3: COLOR THEME CONTROL */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-indigo-400">
              <Palette className="w-4 h-4" /> Color Theme Palette
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {COLOR_THEMES.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setGlobalSettings({ ...globalSettings, colorTheme: theme.id })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    globalSettings.colorTheme === theme.id
                      ? 'bg-indigo-600/10 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span className="text-sm font-bold ml-1">{theme.label}</span>
                  </div>
                  <span className="text-xs text-slate-500">Theme ID: {theme.id}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* SECTION 4: GENERAL SITE METADATA */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-indigo-400">
              <Globe className="w-4 h-4" /> Site Metadata & Global Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Portfolio Site Title
                </label>
                <input
                  type="text"
                  value={globalSettings.siteTitle}
                  onChange={(e) =>
                    setGlobalSettings({ ...globalSettings, siteTitle: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Owner Full Name
                </label>
                <input
                  type="text"
                  value={globalSettings.ownerName}
                  onChange={(e) =>
                    setGlobalSettings({ ...globalSettings, ownerName: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Contact Receiver Email
                </label>
                <input
                  type="email"
                  value={globalSettings.contactEmail}
                  onChange={(e) =>
                    setGlobalSettings({ ...globalSettings, contactEmail: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Google Analytics Measurement ID
                </label>
                <input
                  type="text"
                  value={globalSettings.analyticsId}
                  onChange={(e) =>
                    setGlobalSettings({ ...globalSettings, analyticsId: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  SEO Meta Description
                </label>
                <textarea
                  rows={2}
                  value={globalSettings.metaDescription}
                  onChange={(e) =>
                    setGlobalSettings({ ...globalSettings, metaDescription: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
