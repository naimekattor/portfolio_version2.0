'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAdmin } from '../admin-context';
import { Zap, Plus, Trash2, Edit, Save } from 'lucide-react';

const ICON_OPTIONS = [
  'Zap',
  'Shield',
  'BarChart3',
  'Code',
  'Cpu',
  'CheckCircle2',
  'Server',
  'Terminal',
  'Wrench',
  'Layers',
  'Sparkles',
];

const DEFAULT_PROBLEM_SOLVING = {
  sectionTitle: 'Solving Real Problems',
  sectionSubtitle:
    "I don't just write code; I engineer solutions that address critical business pain points.",
  items: [
    {
      id: '1',
      title: 'Scalability Bottlenecks',
      problem: 'Legacy systems failing under high traffic loads during peak hours.',
      solution:
        'Implemented microservices architecture with Redis caching and horizontal scaling, reducing latency by 60%.',
      icon: 'Zap',
    },
    {
      id: '2',
      title: 'Data Security Risks',
      problem: 'Vulnerable authentication flows and unencrypted sensitive user data.',
      solution:
        'Architected a secure OAuth2/OIDC flow with end-to-end encryption and automated security audits.',
      icon: 'Shield',
    },
    {
      id: '3',
      title: 'Inefficient Workflows',
      problem: 'Manual data entry processes costing teams 20+ hours per week.',
      solution:
        'Built an AI-powered automation engine that reduced manual effort by 85% using LLM-based extraction.',
      icon: 'BarChart3',
    },
  ],
};

export default function AdminProblemsPage() {
  const { siteSettings, saveSiteSettings } = useAdmin();
  const [sectionTitle, setSectionTitle] = useState(DEFAULT_PROBLEM_SOLVING.sectionTitle);
  const [sectionSubtitle, setSectionSubtitle] = useState(DEFAULT_PROBLEM_SOLVING.sectionSubtitle);
  const [items, setItems] = useState<any[]>(DEFAULT_PROBLEM_SOLVING.items);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    if (siteSettings?.problem_solving_section) {
      if (siteSettings.problem_solving_section.sectionTitle) {
        setSectionTitle(siteSettings.problem_solving_section.sectionTitle);
      }
      if (siteSettings.problem_solving_section.sectionSubtitle) {
        setSectionSubtitle(siteSettings.problem_solving_section.sectionSubtitle);
      }
      if (Array.isArray(siteSettings.problem_solving_section.items)) {
        setItems(siteSettings.problem_solving_section.items);
      }
    }
  }, [siteSettings]);

  const handleSaveSection = async () => {
    setSaving(true);
    const payload = {
      sectionTitle,
      sectionSubtitle,
      items,
    };
    const success = await saveSiteSettings({
      problem_solving_section: payload,
    });
    setSaving(false);
    if (success) toast.success('Solving Real Problems section updated successfully!');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: any[];
    if (editingItem.id) {
      updated = items.map((i) => (i.id === editingItem.id ? editingItem : i));
    } else {
      updated = [...items, { ...editingItem, id: Date.now().toString() }];
    }
    setItems(updated);
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this problem item?')) return;
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              "Solving Real Problems" CMS Control
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Add and edit the Problem vs Solution cards displayed on your homepage.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingItem({
                  title: '',
                  problem: '',
                  solution: '',
                  icon: 'Zap',
                });
                setShowModal(true);
              }}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Problem Card
            </button>
            <button
              onClick={handleSaveSection}
              disabled={saving}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/30"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Section'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Section Subtitle
            </label>
            <input
              type="text"
              value={sectionSubtitle}
              onChange={(e) => setSectionSubtitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded-lg">
                    {item.icon || 'Zap'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setShowModal(true);
                      }}
                      className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 bg-slate-900 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-3">{item.title}</h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                      The Problem
                    </span>
                    <p className="text-slate-400 leading-relaxed">{item.problem}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                      The Solution
                    </span>
                    <p className="text-slate-200 font-medium leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingItem.id ? 'Edit Problem Card' : 'Add New Problem Card'}
            </h3>
            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Card Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Scalability Bottlenecks"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Icon
                </label>
                <select
                  value={editingItem.icon || 'Zap'}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  The Problem Statement
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.problem || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, problem: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Describe the issue..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  The Solution Statement
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.solution || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, solution: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Describe how you solved it..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
