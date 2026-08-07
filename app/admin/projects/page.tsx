'use client';

import React, { useState } from 'react';
import { useAdmin } from '../admin-context';
import { Plus, Trash2, Edit, Globe, FolderGit2 } from 'lucide-react';

export default function AdminProjectsPage() {
  const { projects, handleDelete, handleSave } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const openAddModal = () => {
    setFormData({
      title: '',
      description: '',
      impact: '',
      category: 'Web App',
      technologies: '',
      images: '',
      liveUrl: '',
      githubUrl: '',
      featured: true,
    });
    setShowModal(true);
  };

  const openEditModal = (proj: any) => {
    setFormData({
      ...proj,
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies.join(', ')
        : proj.technologies || '',
      images: Array.isArray(proj.images) ? proj.images.join(', ') : proj.images || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSave('projects', formData);
    if (success) {
      setShowModal(false);
      setFormData({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Portfolio Projects ({projects.length})</h3>
          <p className="text-xs text-slate-400">Manage and sync frontend featured projects</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const techArray = Array.isArray(proj.technologies)
            ? proj.technologies
            : typeof proj.technologies === 'string'
            ? proj.technologies.split(',')
            : [];
          const imgUrl = (proj.images && proj.images[0]) || '/hokpath.png';

          return (
            <div
              key={proj.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {imgUrl && (
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-slate-800 bg-slate-950">
                    <img src={imgUrl} alt={proj.title} className="object-cover w-full h-full" />
                    {proj.featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-amber-500/90 text-slate-950 font-bold text-[10px] uppercase rounded-md shadow">
                        Featured
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-base">{proj.title}</h4>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {proj.category || 'Web App'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3 line-clamp-3">{proj.description}</p>

                {proj.impact && (
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl mb-3">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">Impact</span>
                    <p className="text-xs text-slate-300 line-clamp-2">{proj.impact}</p>
                  </div>
                )}

                {techArray.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techArray.map((t: string, idx: number) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-2">
                <div className="flex items-center gap-3 text-xs">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-2 text-slate-400 hover:text-indigo-400 transition-colors"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete('projects', proj.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4 capitalize">
              {formData.id ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Islamic Knowledge Center"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Category</label>
                  <input
                    type="text"
                    value={formData.category || 'Web App'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Web App"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Description / Solution</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  rows={3}
                  placeholder="Engineered a high-performance verification platform..."
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Project Impact</label>
                <textarea
                  value={formData.impact || ''}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  rows={2}
                  placeholder="e.g. Established a 'Single Source of Truth'..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Technologies (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.technologies || ''}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  placeholder="Next.js, Supabase, PostgreSQL, Tailwind CSS"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Image URL / Path</label>
                <input
                  type="text"
                  value={formData.images || ''}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. /hokpath.png or https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Live Demo URL</label>
                  <input
                    type="text"
                    value={formData.liveUrl || ''}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">GitHub / Code URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={formData.featured ?? true}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-medium text-slate-300">
                  Feature on Homepage
                </label>
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
