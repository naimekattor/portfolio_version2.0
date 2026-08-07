'use client';

import React from 'react';
import { useAdmin } from './admin-context';
import { Users, Eye, TrendingUp, Activity, Globe, Smartphone } from 'lucide-react';

export default function AdminOverviewPage() {
  const { summaryData } = useAdmin();

  const summary = summaryData?.summary || {};
  const breakdowns = summaryData?.breakdowns || {};

  return (
    <div className="space-y-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Visitors', value: summary.totalVisitors || 0, icon: Users, color: 'text-indigo-400' },
          { title: 'Page Views', value: summary.totalPageViews || 0, icon: Eye, color: 'text-emerald-400' },
          { title: 'Retention Rate', value: `${summary.retentionRate || 0}%`, icon: TrendingUp, color: 'text-purple-400' },
          { title: 'Bounce Rate', value: `${summary.bounceRate || 0}%`, icon: Activity, color: 'text-amber-400' },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.title}</span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-white mt-4">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* Breakdowns Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            Top Visited Pages
          </h3>
          <div className="space-y-3">
            {(breakdowns.topPages || []).map((page: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-sm text-slate-300 font-mono">{page.path}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400">
                  {page.views} views
                </span>
              </div>
            ))}
            {(!breakdowns.topPages || breakdowns.topPages.length === 0) && (
              <p className="text-xs text-slate-500 py-4 text-center">No visitor traffic recorded yet.</p>
            )}
          </div>
        </div>

        {/* Devices Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-400" />
            Device Breakdown
          </h3>
          <div className="space-y-3">
            {(breakdowns.topDevices || []).map((dev: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-sm text-slate-300">{dev.device}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400">
                  {dev.count} users
                </span>
              </div>
            ))}
            {(!breakdowns.topDevices || breakdowns.topDevices.length === 0) && (
              <p className="text-xs text-slate-500 py-4 text-center">No device statistics available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
