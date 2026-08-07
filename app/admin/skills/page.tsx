'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '../admin-context';
import { Plus, Trash2, Edit, Code2, Save, LayoutGrid } from 'lucide-react';

export default function AdminSkillsPage() {
  const { skills, siteSettings, handleDelete, handleSave, saveSiteSettings } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({ name: '', category: 'Frontend', percentage: 85 });

  // Section Header & Subheading State
  const [headerState, setHeaderState] = useState({
    badge: 'Technical Stack',
    title: 'Built to Scale. Wired to Deliver.',
    subheading: 'A full-spectrum toolkit spanning UI to infrastructure — every layer of the modern stack, mastered.',
    yearsExp: '5+',
  });
  const [savingHeader, setSavingHeader] = useState(false);

  useEffect(() => {
    if (siteSettings?.skills_section_header) {
      setHeaderState((prev) => ({ ...prev, ...siteSettings.skills_section_header }));
    }
  }, [siteSettings]);

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHeader(true);
    const success = await saveSiteSettings({
      skills_section_header: headerState,
    });
    setSavingHeader(false);
    if (success) {
      alert('Section Header & Subheading updated successfully!');
    }
  };

  const categories = Array.from(new Set(skills.map((s) => s.category || 'Frontend')));
  if (!categories.includes('Frontend')) categories.push('Frontend');
  if (!categories.includes('Backend')) categories.push('Backend');
  if (!categories.includes('AI / LLM')) categories.push('AI / LLM');
  if (!categories.includes('Cloud / DevOps')) categories.push('Cloud / DevOps');

  const openAddModal = (defaultCat = 'Frontend') => {
    setFormData({ name: '', category: defaultCat, percentage: 85, displayOrder: 0 });
    setShowModal(true);
  };

  const openEditModal = (skill: any) => {
    setFormData({ ...skill });
    setShowModal(true);
  };

  const handleSubmitSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSave('skills', formData);
    if (success) {
      setShowModal(false);
      setFormData({ name: '', category: 'Frontend', percentage: 85 });
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Section 1: Header, Subheading & Section Controls ── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <LayoutGrid className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Technical Section Heading & Details Manager</h3>
        </div>

        <form onSubmit={handleSaveHeader} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Badge Tagline</label>
              <input
                type="text"
                value={headerState.badge}
                onChange={(e) => setHeaderState({ ...headerState, badge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                placeholder="e.g. Technical Stack"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Years Experience Metric</label>
              <input
                type="text"
                value={headerState.yearsExp}
                onChange={(e) => setHeaderState({ ...headerState, yearsExp: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                placeholder="e.g. 5+"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400">Main Heading / Title</label>
            <input
              type="text"
              value={headerState.title}
              onChange={(e) => setHeaderState({ ...headerState, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white font-semibold"
              placeholder="e.g. Built to Scale. Wired to Deliver."
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
              placeholder="A full-spectrum toolkit spanning UI to infrastructure..."
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

      {/* ── Section 2: Technical Skills List & Category Manager ── */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Technical Skills & Categories ({skills.length})</h3>
          <p className="text-xs text-slate-400">Manage individual technology stack items & proficiency levels</p>
        </div>
        <button
          onClick={() => openAddModal('Frontend')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {categories.map((catName) => {
        const catSkills = skills.filter((s) => s.category === catName);

        return (
          <div key={catName} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <h4 className="font-bold text-white text-base">{catName}</h4>
                <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full font-mono">
                  {catSkills.length} skills
                </span>
              </div>
              <button
                onClick={() => openAddModal(catName)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add to {catName}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {catSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex justify-between items-center hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm">{skill.name}</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden w-28">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-indigo-400 font-semibold">{skill.percentage}% Mastery</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(skill)}
                      className="p-2 text-slate-400 hover:text-indigo-400 transition-colors"
                      title="Edit Skill"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('skills', skill.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {catSkills.length === 0 && (
                <p className="text-xs text-slate-500 py-2 col-span-3">No skills added in this category yet.</p>
              )}
            </div>
          </div>
        );
      })}

      {/* Skill Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {formData.id ? 'Edit Skill Item' : 'Add New Skill Item'}
            </h3>
            <form onSubmit={handleSubmitSkill} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Skill Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. React, Next.js, PostgreSQL"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Category</label>
                <input
                  type="text"
                  value={formData.category || 'Frontend'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Frontend, Backend, AI / LLM, Cloud / DevOps"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Mastery Percentage (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentage ?? 85}
                  onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder ?? 0}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                />
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
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Save Skill Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
