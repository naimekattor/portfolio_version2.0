'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '../admin-context';
import { Plus, Trash2, Edit, Save, MessageSquare, LayoutGrid } from 'lucide-react';

const DEFAULT_TESTIMONIALS = [
  {
    id: '1',
    quote: "Working with this developer was a game-changer for our product. They didn't just build what we asked for — they challenged our assumptions and delivered a system that was far more scalable and efficient than we imagined.",
    name: 'Sarah Jenkins',
    role: 'CTO at TechFlow Systems',
    color: '#174d4d',
    initials: 'SJ',
  },
  {
    id: '2',
    quote: 'Exceptional technical depth combined with clear communication. Every sprint delivered measurable outcomes. Our infrastructure costs dropped by 40% within two months of engagement.',
    name: 'Marcus Okafor',
    role: 'VP Engineering, NovaPay',
    color: '#a67a3b',
    initials: 'MO',
  },
  {
    id: '3',
    quote: 'The AI integration they built for us went live in three weeks and immediately reduced our support ticket volume by 60%. That kind of velocity with that level of quality is rare.',
    name: 'Priya Sharma',
    role: 'Head of Product, Loopwise',
    color: '#174d4d',
    initials: 'PS',
  },
  {
    id: '4',
    quote: "They brought a product-level mindset to every technical decision. It wasn't just about writing code — it was about solving the right problems. Our team grew significantly from working alongside them.",
    name: 'Daniel Kruse',
    role: 'CEO, Stackform',
    color: '#a67a3b',
    initials: 'DK',
  },
];

export default function AdminTestimonialsPage() {
  const { siteSettings, saveSiteSettings } = useAdmin();

  // Header State
  const [headerState, setHeaderState] = useState({
    badge: 'Client Stories',
    title: 'Trusted by Teams that Ship',
    subheading: 'Real words from the people behind the products.',
    bottomStripText: '4 of many',
  });
  const [savingHeader, setSavingHeader] = useState(false);

  // Testimonials List State
  const [items, setItems] = useState<any[]>(DEFAULT_TESTIMONIALS);
  const [savingItems, setSavingItems] = useState(false);

  // Modal State for Add / Edit
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (siteSettings?.testimonials_section_header) {
      setHeaderState((prev) => ({ ...prev, ...siteSettings.testimonials_section_header }));
    }
    if (siteSettings?.testimonials_items && Array.isArray(siteSettings.testimonials_items)) {
      setItems(siteSettings.testimonials_items);
    }
  }, [siteSettings]);

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHeader(true);
    const success = await saveSiteSettings({
      testimonials_section_header: headerState,
    });
    setSavingHeader(false);
    if (success) {
      alert('Testimonials Section Header updated successfully!');
    }
  };

  const persistItems = async (newItems: any[]) => {
    setSavingItems(true);
    setItems(newItems);
    const success = await saveSiteSettings({
      testimonials_items: newItems,
    });
    setSavingItems(false);
    return success;
  };

  const openAddModal = () => {
    setFormData({
      id: Date.now().toString(),
      quote: '',
      name: '',
      role: '',
      color: '#174d4d',
      initials: '',
    });
    setShowModal(true);
  };

  const openEditModal = (item: any) => {
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client testimonial?')) return;
    const filtered = items.filter((item) => item.id !== id);
    await persistItems(filtered);
  };

  const handleSubmitItem = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedList: any[];
    const existingIndex = items.findIndex((i) => i.id === formData.id);

    // Auto generate initials if empty
    const computedInitials =
      formData.initials ||
      formData.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    const finalItem = { ...formData, initials: computedInitials };

    if (existingIndex >= 0) {
      updatedList = [...items];
      updatedList[existingIndex] = finalItem;
    } else {
      updatedList = [...items, finalItem];
    }

    const success = await persistItems(updatedList);
    if (success) {
      setShowModal(false);
      setFormData({});
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Section 1: Header & Subheading Controls ── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <LayoutGrid className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Client Stories Section Heading & Subheading Manager</h3>
        </div>

        <form onSubmit={handleSaveHeader} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Eyebrow Badge Tagline</label>
              <input
                type="text"
                value={headerState.badge}
                onChange={(e) => setHeaderState({ ...headerState, badge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                placeholder="e.g. Client Stories"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">
                Bottom Footer Strip Text (use <code className="text-indigo-400 font-mono">{'{count}'}</code> for dynamic item count)
              </label>
              <input
                type="text"
                value={headerState.bottomStripText}
                onChange={(e) => setHeaderState({ ...headerState, bottomStripText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                placeholder="e.g. {count} OF MANY or 10+ Happy Clients"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400">Main Title / Heading</label>
            <input
              type="text"
              value={headerState.title}
              onChange={(e) => setHeaderState({ ...headerState, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white font-semibold"
              placeholder="e.g. Trusted by Teams that Ship"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400">Subheading Description</label>
            <textarea
              value={headerState.subheading}
              onChange={(e) => setHeaderState({ ...headerState, subheading: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-slate-200"
              rows={2}
              placeholder="Real words from the people behind the products."
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingHeader}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {savingHeader ? 'Saving Header...' : 'Update Section Header'}
            </button>
          </div>
        </form>
      </div>

      {/* ── Section 2: Testimonials Items Manager ── */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Client Testimonials ({items.length})</h3>
          <p className="text-xs text-slate-400">Manage client quotes, names, roles, and avatar initials</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((t) => (
          <div
            key={t.id || t.name}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-md"
                  style={{ backgroundColor: t.color || '#174d4d' }}
                >
                  {t.initials || 'CT'}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 line-clamp-4">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80 mt-4">
              <button
                onClick={() => openEditModal(t)}
                className="p-2 text-slate-400 hover:text-indigo-400 transition-colors"
                title="Edit Testimonial"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteItem(t.id)}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                title="Delete Testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form for Add/Edit Testimonial */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">
              {formData.name ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <form onSubmit={handleSubmitItem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Quote Text</label>
                <textarea
                  value={formData.quote || ''}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  rows={4}
                  placeholder="They brought a product-level mindset to every technical decision..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Author Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Daniel Kruse"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Role / Company</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. CEO, Stackform"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Avatar Initials</label>
                  <input
                    type="text"
                    value={formData.initials || ''}
                    onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. DK (auto generated if empty)"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Accent Color</label>
                  <select
                    value={formData.color || '#174d4d'}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-slate-200"
                  >
                    <option value="#174d4d">Dark Teal (#174d4d)</option>
                    <option value="#a67a3b">Warm Gold (#a67a3b)</option>
                    <option value="#4f46e5">Indigo (#4f46e5)</option>
                    <option value="#059669">Emerald (#059669)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingItems}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50"
                >
                  {savingItems ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
