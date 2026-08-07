'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '../admin-context';
import { Plus, Trash2, Edit, Save, FileText, LayoutGrid } from 'lucide-react';

export default function AdminBlogsPage() {
  const { blogs, siteSettings, handleDelete, handleSave, saveSiteSettings } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Header State for Writing & Insights / Technical Communication section
  const [headerState, setHeaderState] = useState({
    badge: 'Writing & Insights',
    title: 'Technical Communication',
    subheading:
      'I believe in sharing knowledge and explaining complex concepts clearly — from architecture decisions to AI integrations.',
    buttonText: 'Read all posts',
    buttonUrl: '#',
    bottomStripText: 'More articles coming soon',
  });
  const [savingHeader, setSavingHeader] = useState(false);

  useEffect(() => {
    if (siteSettings?.blogs_section_header) {
      setHeaderState((prev) => ({ ...prev, ...siteSettings.blogs_section_header }));
    }
  }, [siteSettings]);

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHeader(true);
    const success = await saveSiteSettings({
      blogs_section_header: headerState,
    });
    setSavingHeader(false);
    if (success) {
      alert('Blog Section Header & Subheading updated successfully!');
    }
  };

  const openAddModal = () => {
    setFormData({ title: '', content: '', excerpt: '', readingTime: 5, status: 'PUBLISHED' });
    setShowModal(true);
  };

  const openEditModal = (blog: any) => {
    setFormData({ ...blog });
    setShowModal(true);
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSave('blogs', formData);
    if (success) {
      setShowModal(false);
      setFormData({});
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Section 1: Section Header & Subheading Manager ── */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <LayoutGrid className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Writing & Insights Section Heading Manager</h3>
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
                placeholder="e.g. Writing & Insights"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">CTA Button Label</label>
              <input
                type="text"
                value={headerState.buttonText}
                onChange={(e) => setHeaderState({ ...headerState, buttonText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-white"
                placeholder="e.g. Read all posts"
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
              placeholder="e.g. Technical Communication"
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
              placeholder="I believe in sharing knowledge and explaining complex concepts..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">CTA Button Target URL</label>
              <input
                type="text"
                value={headerState.buttonUrl}
                onChange={(e) => setHeaderState({ ...headerState, buttonUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-slate-200"
                placeholder="e.g. # or /blogs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400">Bottom Editorial Strip Text</label>
              <input
                type="text"
                value={headerState.bottomStripText}
                onChange={(e) => setHeaderState({ ...headerState, bottomStripText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-slate-200"
                placeholder="e.g. More articles coming soon"
              />
            </div>
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

      {/* ── Section 2: Blog Posts Manager ── */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Articles & Blog Posts ({blogs.length})</h3>
          <p className="text-xs text-slate-400">Manage published articles displayed on home page</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" /> Create Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <h4 className="font-bold text-white text-base">{blog.title}</h4>
                </div>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    blog.status === 'PUBLISHED'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {blog.status || 'PUBLISHED'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">{blog.excerpt || blog.content}</p>
              {blog.readingTime && (
                <div className="text-[11px] text-slate-500 mt-3 font-mono">
                  Read time: {blog.readingTime} min read
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-4">
              <span className="text-xs text-slate-500">
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString()
                  : new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(blog)}
                  className="p-2 text-slate-400 hover:text-indigo-400 transition-colors"
                  title="Edit Article"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('blogs', blog.id)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">
              {formData.id ? 'Edit Article' : 'Create New Article'}
            </h3>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Article Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Architecting for Scale: Lessons from 1M Users"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Reading Time (Minutes)</label>
                  <input
                    type="number"
                    value={formData.readingTime ?? 5}
                    onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. 8"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-400">Status</label>
                  <select
                    value={formData.status || 'PUBLISHED'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500 text-slate-200"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Excerpt / Summary</label>
                <textarea
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  rows={2}
                  placeholder="Summary shown on article card..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Full Content</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  rows={5}
                  placeholder="Full article content body..."
                  required
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
