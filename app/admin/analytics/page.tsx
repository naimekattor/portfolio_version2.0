'use client';

import React from 'react';
import { useAdmin } from '../admin-context';
import { TrendingUp } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const { summaryData } = useAdmin();
  const retention = summaryData?.retention || {};

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Cohort Retention Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Day 1 Retention', value: `${retention.day1 || 0}%` },
            { label: 'Day 7 Retention', value: `${retention.day7 || 0}%` },
            { label: 'Day 14 Retention', value: `${retention.day14 || 0}%` },
            { label: 'Day 30 Retention', value: `${retention.day30 || 0}%` },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-xl text-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{item.label}</span>
              <div className="text-2xl font-bold text-indigo-400 mt-2">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
