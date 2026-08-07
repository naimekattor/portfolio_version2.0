'use client';

import React from 'react';
import { useAdmin } from '../admin-context';
import { Download } from 'lucide-react';

export default function AdminSubscribersPage() {
  const { subscribers, API_BASE } = useAdmin();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Newsletter Subscribers ({subscribers.length})</h3>
          <p className="text-xs text-slate-400">Subscribed user mailing list</p>
        </div>
        <a
          href={`${API_BASE}/newsletter/export-csv`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" /> Export CSV
        </a>
      </div>

      <div className="space-y-2">
        {subscribers.map((sub) => (
          <div key={sub.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-slate-200 font-mono">{sub.email}</span>
            <span className="text-xs text-slate-400">{new Date(sub.subscribedAt).toLocaleDateString()}</span>
          </div>
        ))}

        {subscribers.length === 0 && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
            No newsletter subscribers registered yet.
          </div>
        )}
      </div>
    </div>
  );
}
