'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '../admin-context';
import {
  Settings,
  Sparkles,
  Zap,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Shield,
  BarChart3,
  Code,
  Cpu,
  Server,
  Terminal,
  Wrench,
  Layers,
  Layout,
  Briefcase,
} from 'lucide-react';

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

const DEFAULT_HERO = {
  badgeText: 'Available for new projects',
  badgeDotPulse: true,
  titleLine1: 'Full-Stack Developer Building',
  titleHighlight: 'Scalable AI-Powered',
  titleLine2: 'Web Applications',
  description:
    'I bridge the gap between complex technical problems and elegant, production-ready solutions that deliver real business value.',
  primaryCtaText: 'View Projects',
  primaryCtaLink: '#projects',
  secondaryCtaText: 'Download Resume',
  secondaryCtaLink:
    'https://drive.google.com/file/d/1wlKh0G_yN_v7uOFnVjonwCqk9_ROxuPB/view?usp=sharing',
};

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

const DEFAULT_SERVICES = {
  sectionTitle: 'Services & Engineering Solutions',
  sectionSubtitle:
    'End-to-end software development services built for speed, scale, and long-term maintainability.',
  items: [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      description:
        'Building high-performance React/Next.js frontends and robust Node.js/Express backend services.',
      icon: 'Code',
    },
    {
      id: '2',
      title: 'AI & LLM Integration',
      description:
        'Embedding generative AI workflows, intelligent chatbots, and automated data extraction into business apps.',
      icon: 'Cpu',
    },
    {
      id: '3',
      title: 'Database & Microservices Architecture',
      description:
        'Designing scalable PostgreSQL/Prisma schemas, Redis caching layers, and decoupled microservices.',
      icon: 'Server',
    },
  ],
};

export default function AdminSettingsPage() {
  const { siteSettings, saveSiteSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState<'hero' | 'problems' | 'services'>('hero');

  // Hero Section State
  const [heroForm, setHeroForm] = useState(DEFAULT_HERO);
  const [savingHero, setSavingHero] = useState(false);

  // Problem Solving Section State
  const [problemSectionTitle, setProblemSectionTitle] = useState(DEFAULT_PROBLEM_SOLVING.sectionTitle);
  const [problemSectionSubtitle, setProblemSectionSubtitle] = useState(DEFAULT_PROBLEM_SOLVING.sectionSubtitle);
  const [problemItems, setProblemItems] = useState<any[]>(DEFAULT_PROBLEM_SOLVING.items);
  const [savingProblems, setSavingProblems] = useState(false);

  // Problem Modal State
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState<any>(null);

  // Services Section State
  const [servicesTitle, setServicesTitle] = useState(DEFAULT_SERVICES.sectionTitle);
  const [servicesSubtitle, setServicesSubtitle] = useState(DEFAULT_SERVICES.sectionSubtitle);
  const [serviceItems, setServiceItems] = useState<any[]>(DEFAULT_SERVICES.items);
  const [savingServices, setSavingServices] = useState(false);

  // Service Modal State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  useEffect(() => {
    if (siteSettings?.hero_section) {
      setHeroForm((prev) => ({ ...prev, ...siteSettings.hero_section }));
    }
    if (siteSettings?.problem_solving_section) {
      if (siteSettings.problem_solving_section.sectionTitle) {
        setProblemSectionTitle(siteSettings.problem_solving_section.sectionTitle);
      }
      if (siteSettings.problem_solving_section.sectionSubtitle) {
        setProblemSectionSubtitle(siteSettings.problem_solving_section.sectionSubtitle);
      }
      if (Array.isArray(siteSettings.problem_solving_section.items)) {
        setProblemItems(siteSettings.problem_solving_section.items);
      }
    }
    if (siteSettings?.services_section) {
      if (siteSettings.services_section.sectionTitle) {
        setServicesTitle(siteSettings.services_section.sectionTitle);
      }
      if (siteSettings.services_section.sectionSubtitle) {
        setServicesSubtitle(siteSettings.services_section.sectionSubtitle);
      }
      if (Array.isArray(siteSettings.services_section.items)) {
        setServiceItems(siteSettings.services_section.items);
      }
    }
  }, [siteSettings]);

  // Save Hero Section
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    const success = await saveSiteSettings({
      hero_section: heroForm,
    });
    setSavingHero(false);
    if (success) alert('Hero Section updated successfully!');
  };

  // Save Problems Section
  const handleSaveProblems = async () => {
    setSavingProblems(true);
    const payload = {
      sectionTitle: problemSectionTitle,
      sectionSubtitle: problemSectionSubtitle,
      items: problemItems,
    };
    const success = await saveSiteSettings({
      problem_solving_section: payload,
    });
    setSavingProblems(false);
    if (success) alert('Solving Real Problems section updated successfully!');
  };

  // Add / Edit Problem Item
  const handleSaveProblemModal = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: any[];
    if (editingProblem.id) {
      updated = problemItems.map((item) =>
        item.id === editingProblem.id ? editingProblem : item
      );
    } else {
      updated = [...problemItems, { ...editingProblem, id: Date.now().toString() }];
    }
    setProblemItems(updated);
    setShowProblemModal(false);
    setEditingProblem(null);
  };

  const handleDeleteProblem = (id: string) => {
    if (!confirm('Are you sure you want to delete this problem item?')) return;
    setProblemItems(problemItems.filter((i) => i.id !== id));
  };

  // Save Services Section
  const handleSaveServices = async () => {
    setSavingServices(true);
    const payload = {
      sectionTitle: servicesTitle,
      sectionSubtitle: servicesSubtitle,
      items: serviceItems,
    };
    const success = await saveSiteSettings({
      services_section: payload,
    });
    setSavingServices(false);
    if (success) alert('Services section updated successfully!');
  };

  // Add / Edit Service Item
  const handleSaveServiceModal = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: any[];
    if (editingService.id) {
      updated = serviceItems.map((item) =>
        item.id === editingService.id ? editingService : item
      );
    } else {
      updated = [...serviceItems, { ...editingService, id: Date.now().toString() }];
    }
    setServiceItems(updated);
    setShowServiceModal(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    setServiceItems(serviceItems.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            Website Content & Section Controls
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage every field of your Hero section, Solving Real Problems cards, and Services.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'hero'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layout className="w-3.5 h-3.5" /> Hero Section
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'problems'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Solving Real Problems
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Services Section
          </button>
        </div>
      </div>

      {/* TAB 1: HERO SECTION */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Hero Section Control
            </h3>
            <button
              type="submit"
              disabled={savingHero}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {savingHero ? 'Saving...' : 'Save Hero Section'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badge Text */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Badge Text
              </label>
              <input
                type="text"
                value={heroForm.badgeText}
                onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. AVAILABLE FOR NEW PROJECTS"
              />
            </div>

            {/* Pulse Dot Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Badge Animated Green Pulse Dot
              </label>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={heroForm.badgeDotPulse}
                  onChange={(e) => setHeroForm({ ...heroForm, badgeDotPulse: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                />
                <span className="text-sm text-slate-300 font-medium">Show animated glowing green dot</span>
              </label>
            </div>

            {/* Title Line 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Main Headline - Prefix Text
              </label>
              <input
                type="text"
                value={heroForm.titleLine1}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Full-Stack Developer Building"
              />
            </div>

            {/* Title Highlight */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Main Headline - Highlighted Accent Text
              </label>
              <input
                type="text"
                value={heroForm.titleHighlight}
                onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-amber-400 font-semibold focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Scalable AI-Powered"
              />
            </div>

            {/* Title Line 2 */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Main Headline - Suffix Text
              </label>
              <input
                type="text"
                value={heroForm.titleLine2}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Web Applications"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Subtitle Description Paragraph
              </label>
              <textarea
                rows={3}
                value={heroForm.description}
                onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                placeholder="Describe your value proposition..."
              />
            </div>

            {/* Primary CTA */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Primary Button Label
              </label>
              <input
                type="text"
                value={heroForm.primaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. View Projects"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Primary Button Link Target
              </label>
              <input
                type="text"
                value={heroForm.primaryCtaLink}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. #projects or /#projects"
              />
            </div>

            {/* Secondary CTA */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={heroForm.secondaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Download Resume"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Secondary Button Link (URL or Google Drive link)
              </label>
              <input
                type="text"
                value={heroForm.secondaryCtaLink}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. https://drive.google.com/..."
              />
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: SOLVING REAL PROBLEMS */}
      {activeTab === 'problems' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                "Solving Real Problems" Section Control
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingProblem({
                      title: '',
                      problem: '',
                      solution: '',
                      icon: 'Zap',
                    });
                    setShowProblemModal(true);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Problem Card
                </button>
                <button
                  onClick={handleSaveProblems}
                  disabled={savingProblems}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {savingProblems ? 'Saving...' : 'Save Section'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Section Header Title
                </label>
                <input
                  type="text"
                  value={problemSectionTitle}
                  onChange={(e) => setProblemSectionTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Section Header Subtitle
                </label>
                <input
                  type="text"
                  value={problemSectionSubtitle}
                  onChange={(e) => setProblemSectionSubtitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Problem Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {problemItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5">
                        <Zap className="w-3 h-3" /> {item.icon || 'Zap'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProblem(item);
                            setShowProblemModal(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProblem(item.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 bg-slate-900 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
        </div>
      )}

      {/* TAB 3: SERVICES SECTION */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                Services Section Control
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingService({
                      title: '',
                      description: '',
                      icon: 'Code',
                    });
                    setShowServiceModal(true);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Service Card
                </button>
                <button
                  onClick={handleSaveServices}
                  disabled={savingServices}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {savingServices ? 'Saving...' : 'Save Services'}
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
                  value={servicesTitle}
                  onChange={(e) => setServicesTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Services Section Subtitle
                </label>
                <input
                  type="text"
                  value={servicesSubtitle}
                  onChange={(e) => setServicesSubtitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Service Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {serviceItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3" /> {item.icon || 'Code'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingService(item);
                            setShowServiceModal(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(item.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 bg-slate-900 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROBLEM MODAL */}
      {showProblemModal && editingProblem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingProblem.id ? 'Edit Problem Card' : 'Add New Problem Card'}
            </h3>
            <form onSubmit={handleSaveProblemModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Card Title
                </label>
                <input
                  type="text"
                  required
                  value={editingProblem.title || ''}
                  onChange={(e) => setEditingProblem({ ...editingProblem, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Scalability Bottlenecks"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Icon
                </label>
                <select
                  value={editingProblem.icon || 'Zap'}
                  onChange={(e) => setEditingProblem({ ...editingProblem, icon: e.target.value })}
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
                  value={editingProblem.problem || ''}
                  onChange={(e) => setEditingProblem({ ...editingProblem, problem: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Describe the problem pain point..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  The Solution Statement
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProblem.solution || ''}
                  onChange={(e) => setEditingProblem({ ...editingProblem, solution: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Describe the engineered solution..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProblemModal(false)}
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

      {/* SERVICE MODAL */}
      {showServiceModal && editingService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingService.id ? 'Edit Service Card' : 'Add New Service Card'}
            </h3>
            <form onSubmit={handleSaveServiceModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Full-Stack Web Development"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Icon
                </label>
                <select
                  value={editingService.icon || 'Code'}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
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
                  Service Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Describe your service..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
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
