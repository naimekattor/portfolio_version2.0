'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  FolderGit2,
  Code2,
  Briefcase,
  FileText,
  Mail,
  Send,
  Settings,
  Image as ImageIcon,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  Shield,
  Activity,
  Globe,
  Smartphone,
  Sparkles,
  Download,
  RefreshCw,
} from 'lucide-react';

const API_BASE = 'http://localhost:4000/api/v1';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'projects' | 'skills' | 'experiences' | 'blogs' | 'contacts' | 'subscribers' | 'settings'>('dashboard');
  
  // Auth Form State
  const [email, setEmail] = useState('admin@portfolio.com');
  const [password, setPassword] = useState('AdminPassword123!');
  const [authError, setAuthError] = useState('');
  const [token, setToken] = useState<string | null>(null);

  // Dashboard & Analytics Data State
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [activeVisitorsCount, setActiveVisitorsCount] = useState<number>(1);

  // Modal / Form States for CRUD
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [formData, setFormData] = useState<any>({});

  // Check saved token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Summary & Analytics
      const resSum = await fetch(`${API_BASE}/dashboard/summary`, { headers });
      if (resSum.ok) {
        const jsonSum = await resSum.json();
        setSummaryData(jsonSum.data);
      }

      // Projects
      const resProj = await fetch(`${API_BASE}/projects`);
      if (resProj.ok) setProjects((await resProj.json()).data || []);

      // Skills
      const resSkills = await fetch(`${API_BASE}/skills`);
      if (resSkills.ok) setSkills((await resSkills.json()).data || []);

      // Experiences
      const resExp = await fetch(`${API_BASE}/experiences`);
      if (resExp.ok) setExperiences((await resExp.json()).data || []);

      // Blogs
      const resBlogs = await fetch(`${API_BASE}/blogs`);
      if (resBlogs.ok) setBlogs((await resBlogs.json()).data || []);

      // Contacts
      const resCont = await fetch(`${API_BASE}/contact`, { headers });
      if (resCont.ok) setContacts((await resCont.json()).data || []);

      // Subscribers
      const resSub = await fetch(`${API_BASE}/newsletter`, { headers });
      if (resSub.ok) setSubscribers((await resSub.json()).data || []);

      // Settings
      const resSet = await fetch(`${API_BASE}/site-settings`);
      if (resSet.ok) setSiteSettings((await resSet.json()).data || {});
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.data?.accessToken) {
        localStorage.setItem('admin_token', data.data.accessToken);
        setToken(data.data.accessToken);
        setIsAuthenticated(true);
      } else {
        setAuthError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Failed to connect to backend API server at http://localhost:4000');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const headers: any = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      let url = `${API_BASE}/${modalType}`;
      let method = 'POST';

      if (formData.id) {
        url = `${API_BASE}/${modalType}/${formData.id}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({});
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`${API_BASE}/${type}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // If not authenticated, show login UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-4 border border-indigo-500/30">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Portfolio Admin Portal</h1>
            <p className="text-sm text-slate-400 mt-1">Sign in to manage system & analytics</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const summary = summaryData?.summary || {};
  const retention = summaryData?.retention || {};
  const breakdowns = summaryData?.breakdowns || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
              P
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Portfolio Admin</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-slate-400">Live Server</span>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Overview', icon: Activity },
              { id: 'analytics', label: 'Retention & Stats', icon: TrendingUp },
              { id: 'projects', label: 'Projects CMS', icon: FolderGit2 },
              { id: 'skills', label: 'Skills', icon: Code2 },
              { id: 'experiences', label: 'Experience', icon: Briefcase },
              { id: 'blogs', label: 'Blog Posts', icon: FileText },
              { id: 'contacts', label: 'Messages', icon: Mail },
              { id: 'subscribers', label: 'Newsletter', icon: Send },
              { id: 'settings', label: 'Site Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Top Bar Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">{activeTab} Management</h1>
            <p className="text-sm text-slate-400 mt-1">Real-time portfolio backend data control panel</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all text-sm font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Active Online Visitors: {activeVisitorsCount}
            </div>
          </div>
        </div>

        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'dashboard' && (
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
                    <p className="text-xs text-slate-500 italic py-4 text-center">No visitor traffic recorded yet.</p>
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
                    <p className="text-xs text-slate-500 italic py-4 text-center">No device statistics available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Analytics & Retention */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Cohort Retention Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Day 1 Retention', value: `${retention.day1 || 0}%` },
                  { label: 'Day 7 Retention', value: `${retention.day7 || 0}%` },
                  { label: 'Day 14 Retention', value: `${retention.day14 || 0}%` },
                  { label: 'Day 30 Retention', value: `${retention.day30 || 0}%` },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-xl text-center">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{item.label}</span>
                    <div className="text-2xl font-bold text-indigo-400 mt-2">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Projects CMS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Portfolio Projects ({projects.length})</h3>
              <button
                onClick={() => {
                  setModalType('projects');
                  setFormData({ title: '', description: '', category: 'Web App', featured: false });
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-base">{proj.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {proj.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete('projects', proj.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Skills Management */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Technical Skills ({skills.length})</h3>
              <button
                onClick={() => {
                  setModalType('skills');
                  setFormData({ name: '', category: 'Frontend', percentage: 85 });
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-sm">{skill.name}</div>
                    <div className="text-xs text-indigo-400 font-semibold mt-0.5">{skill.percentage}% Mastery</div>
                  </div>
                  <button
                    onClick={() => handleDelete('skills', skill.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Contact Messages */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact Messages ({contacts.length})</h3>
            <div className="space-y-3">
              {contacts.map((msg) => (
                <div key={msg.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-sm">{msg.name} ({msg.email})</h4>
                      <div className="text-xs text-indigo-400 font-medium mt-0.5">{msg.subject}</div>
                    </div>
                    <span className="text-[11px] text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-3 bg-slate-950 p-3 rounded-xl border border-slate-800">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Newsletter Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Newsletter Subscribers ({subscribers.length})</h3>
              <a
                href={`${API_BASE}/newsletter/export-csv`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" /> Export CSV
              </a>
            </div>
            <div className="space-y-2">
              {subscribers.map((sub) => (
                <div key={sub.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-sm text-slate-200 font-mono">{sub.email}</span>
                  <span className="text-xs text-slate-400">{new Date(sub.subscribedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Dynamic Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 capitalize">Add New {modalType}</h3>
            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              {modalType === 'projects' && (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-400">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-400">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1"
                      rows={3}
                      required
                    />
                  </div>
                </>
              )}

              {modalType === 'skills' && (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-400">Skill Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-400">Percentage (0-100)</label>
                    <input
                      type="number"
                      value={formData.percentage || 80}
                      onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm mt-1"
                      required
                    />
                  </div>
                </>
              )}

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
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
