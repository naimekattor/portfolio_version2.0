'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '../admin-context';
import { Briefcase, Plus, Trash2, Edit, Save } from 'lucide-react';

const ICON_OPTIONS = [
  'Code',
  'Cpu',
  'Server',
  'Terminal',
  'Zap',
  'Shield',
  'BarChart3',
  'CheckCircle2',
  'Wrench',
  'Layers',
  'Sparkles',
];

const DEFAULT_SERVICES = {
  sectionTitle: 'Services & Automated Solutions',
  sectionSubtitle:
    'Custom web platforms, intelligent AI agents, EdTech school systems, and end-to-end social media automation.',
  items: [
    {
      id: '1',
      title: 'E-commerce & SaaS Platforms',
      description:
        'Building scalable online stores, multi-vendor marketplaces, and full-featured SaaS web applications with Next.js, Stripe, and PostgreSQL.',
      icon: 'Code',
      tags: ['E-commerce', 'SaaS', 'Next.js', 'Stripe', 'PostgreSQL'],
    },
    {
      id: '2',
      title: 'AI Agent Building & Chatbots',
      description:
        'Architecting autonomous AI agents, intelligent RAG chatbots, and custom LLM assistants to automate customer support and business operations.',
      icon: 'Cpu',
      tags: ['AI Agents', 'AI Chatbots', 'OpenAI', 'LangChain'],
    },
    {
      id: '3',
      title: 'n8n & Social Media Automation',
      description:
        'Automating user engagement and lead generation across WhatsApp, Messenger, and Instagram alongside complex n8n backend workflows.',
      icon: 'Zap',
      tags: ['n8n', 'WhatsApp API', 'Messenger', 'Instagram Automation'],
    },
    {
      id: '4',
      title: 'AI Education & School Systems',
      description:
        'Developing modern learning management portals, student record systems, and AI-assisted grading/curriculum tools for educational institutions.',
      icon: 'Layers',
      tags: ['School Systems', 'Education', 'LMS', 'AI Portal'],
    },
    {
      id: '5',
      title: 'AI-Powered Websites',
      description:
        'Transforming traditional marketing sites into intelligent, interactive web platforms with real-time AI personalization.',
      icon: 'Sparkles',
      tags: ['AI-Powered', 'Personalization', 'React', 'TypeScript'],
    },
  ],
};

export default function AdminServicesPage() {
  const { siteSettings, saveSiteSettings } = useAdmin();
  const [title, setTitle] = useState(DEFAULT_SERVICES.sectionTitle);
  const [subtitle, setSubtitle] = useState(DEFAULT_SERVICES.sectionSubtitle);
  const [items, setItems] = useState<any[]>(DEFAULT_SERVICES.items);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (siteSettings?.services_section) {
      if (siteSettings.services_section.sectionTitle) {
        setTitle(siteSettings.services_section.sectionTitle);
      }
      if (siteSettings.services_section.sectionSubtitle) {
        setSubtitle(siteSettings.services_section.sectionSubtitle);
      }
      if (Array.isArray(siteSettings.services_section.items)) {
        setItems(siteSettings.services_section.items);
      }
    }
  }, [siteSettings]);

  const handleSaveSection = async () => {
    setSaving(true);
    const payload = {
      sectionTitle: title,
      sectionSubtitle: subtitle,
      items,
    };
    const success = await saveSiteSettings({
      services_section: payload,
    });
    setSaving(false);
    if (success) alert('Services section updated successfully!');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const itemData = {
      ...editingItem,
      tags: tagsArray,
    };

    let updated: any[];
    if (editingItem.id) {
      updated = items.map((i) => (i.id === editingItem.id ? itemData : i));
    } else {
      updated = [...items, { ...itemData, id: Date.now().toString() }];
    }
    setItems(updated);
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this service card?')) return;
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-purple-400" />
              Services Section CMS Control
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Add, edit, or remove services displayed on your homepage.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingItem({
                  title: '',
                  description: '',
                  icon: 'Code',
                  tags: [],
                });
                setTagInput('');
                setShowModal(true);
              }}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
            <button
              onClick={handleSaveSection}
              disabled={saving}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/30"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Services'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Services Section Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Services Section Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Services Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold rounded-lg">
                    {item.icon || 'Code'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setTagInput(Array.isArray(item.tags) ? item.tags.join(', ') : '');
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
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{item.description}</p>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="pt-3 border-t border-slate-900 flex flex-wrap gap-1.5">
                  {item.tags.map((t: string, ti: number) => (
                    <span
                      key={ti}
                      className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SERVICE MODAL */}
      {showModal && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingItem.id ? 'Edit Service Card' : 'Add New Service Card'}
            </h3>
            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Full-Stack Web Development"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Icon
                </label>
                <select
                  value={editingItem.icon || 'Code'}
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
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Describe what you deliver..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Tech Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Next.js, TypeScript, PostgreSQL"
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
