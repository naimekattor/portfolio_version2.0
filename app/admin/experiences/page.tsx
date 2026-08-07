'use client';

import React, { useState } from 'react';
import { useAdmin } from '../admin-context';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminExperiencesPage() {
  const { experiences, handleDelete, handleSave } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSave('experiences', formData);
    if (success) {
      setShowModal(false);
      setFormData({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Work Experience ({experiences.length})</h3>
          <p className="text-xs text-slate-400">Manage professional background and positions</p>
        </div>
        <button
          onClick={() => {
            setFormData({ company: '', position: '', duration: '', description: '' });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex justify-between items-start">
            <div>
              <h4 className="font-bold text-white text-base">{exp.position} @ {exp.company}</h4>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">{exp.duration}</p>
              {exp.description && <p className="text-xs text-slate-400 mt-2">{exp.description}</p>}
            </div>
            <button
              onClick={() => handleDelete('experiences', exp.id)}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Company</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Position</label>
                <input
                  type="text"
                  value={formData.position || ''}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Duration</label>
                <input
                  type="text"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. 2022 - Present"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  rows={3}
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
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
