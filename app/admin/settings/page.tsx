'use client';

import React from 'react';
import { useAdmin } from '../admin-context';
import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  const { siteSettings } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          Site Configuration Settings
        </h3>
        <p className="text-xs text-slate-400 mb-6">Global configuration parameters stored in the database</p>

        <div className="space-y-4">
          {Object.keys(siteSettings).length > 0 ? (
            Object.entries(siteSettings).map(([key, val]: [string, any]) => (
              <div key={key} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                <span className="text-sm text-slate-300 font-mono">{key}</span>
                <span className="text-xs text-indigo-400 font-medium">{JSON.stringify(val)}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic">No custom site settings stored yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
