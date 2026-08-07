'use client';

import React, { useState } from 'react';
import { useAdmin } from '../admin-context';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminBlogsPage() {
  const { blogs, handleDelete, handleSave } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSave('blogs', formData);
    if (success) {
      setShowModal(false);
      setFormData({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Blog Posts ({blogs.length})</h3>
          <p className="text-xs text-slate-400">Publish and manage portfolio articles</p>
        </div>
        <button
          onClick={() => {
            setFormData({ title: '', content: '', excerpt: '', status: 'PUBLISHED' });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex justify-between items-start">
            <div>
              <h4 className="font-bold text-white text-base">{blog.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{blog.excerpt || blog.content}</p>
            </div>
            <button
              onClick={() => handleDelete('blogs', blog.id)}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">New Blog Post</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Excerpt</label>
                <input
                  type="text"
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400">Content</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none focus:border-indigo-500"
                  rows={4}
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
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
