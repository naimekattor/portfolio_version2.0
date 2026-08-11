'use client';

import React, { useEffect, useState } from 'react';
import { useAdmin } from '../admin-context';
import { Database, Search, Activity, RefreshCw, FileText, Bot } from 'lucide-react';

export default function AiRagManagementPage() {
  const { API_BASE, token } = useAdmin();
  const [status, setStatus] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [indexing, setIndexing] = useState(false);

  const fetchRagData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const statusRes = await fetch(`${API_BASE}/ai/admin/rag/status`, { headers });
      if (statusRes.ok) {
        setStatus((await statusRes.json()).data);
      }

      const docsRes = await fetch(`${API_BASE}/ai/admin/rag/documents`, { headers });
      if (docsRes.ok) {
        setDocuments((await docsRes.json()).data);
      }
    } catch (error) {
      console.error('Failed to fetch RAG data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRagData();
  }, [token]);

  const handleIndexPortfolio = async () => {
    if (!confirm('This will synchronize all portfolio content with the AI index. Continue?')) return;
    setIndexing(true);
    try {
      const res = await fetch(`${API_BASE}/ai/admin/rag/index`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Portfolio indexing started successfully.');
        fetchRagData();
      } else {
        alert('Failed to start indexing.');
      }
    } catch (error) {
      alert('Error connecting to server.');
    } finally {
      setIndexing(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Remove this document from the AI index?')) return;
    try {
      await fetch(`${API_BASE}/ai/admin/rag/documents/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRagData();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-400" />
            AI RAG System Status
          </h2>
          <p className="text-sm text-slate-400 mt-1">Manage the vector database and semantic search index</p>
        </div>
        <button
          onClick={handleIndexPortfolio}
          disabled={indexing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${indexing ? 'animate-spin' : ''}`} />
          {indexing ? 'Indexing in progress...' : 'Sync Portfolio to AI'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Documents', value: status?.totalDocs || 0, icon: FileText, color: 'text-blue-400' },
          { title: 'Vector Chunks', value: status?.totalChunks || 0, icon: Database, color: 'text-indigo-400' },
          { title: 'Indexed Successfully', value: status?.indexedDocs || 0, icon: Activity, color: 'text-emerald-400' },
          { title: 'Failed to Index', value: status?.failedDocs || 0, icon: Search, color: 'text-red-400' },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.title}</span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-white mt-4">
                {loading ? '...' : card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Documents Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-base font-bold text-white">Indexed Documents</h3>
          <button onClick={fetchRagData} className="text-slate-400 hover:text-white transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                <th className="p-4">Source Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Chunks</th>
                <th className="p-4 text-right">Last Indexed</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-slate-800">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-medium text-white">{doc.title}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                        {doc.sourceType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        doc.status === 'INDEXED' ? 'bg-emerald-500/10 text-emerald-400' :
                        doc.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono text-slate-400">{doc._count?.chunks || 0}</td>
                    <td className="p-4 text-right text-xs">
                      {doc.indexedAt ? new Date(doc.indexedAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No documents indexed yet. Click "Sync Portfolio to AI" to begin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
