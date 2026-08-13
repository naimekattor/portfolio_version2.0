'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface AdminContextType {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  summaryData: any;
  projects: any[];
  skills: any[];
  experiences: any[];
  blogs: any[];
  contacts: any[];
  subscribers: any[];
  siteSettings: any;
  activeVisitorsCount: number;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  authError: string;
  fetchDashboardData: () => Promise<void>;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleLogout: () => void;
  handleDelete: (type: string, id: string) => Promise<void>;
  handleSave: (type: string, formData: any) => Promise<boolean>;
  saveSiteSettings: (settingsObject: Record<string, any>) => Promise<boolean>;
  API_BASE: string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('admin@portfolio.com');
  const [password, setPassword] = useState('AdminPassword123!');
  const [authError, setAuthError] = useState('');

  const [summaryData, setSummaryData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [activeVisitorsCount] = useState<number>(1);

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const resSum = await fetch(`${API_BASE}/dashboard/summary`, { headers });
      if (resSum.ok) setSummaryData((await resSum.json()).data);

      const resProj = await fetch(`${API_BASE}/projects`);
      if (resProj.ok) setProjects((await resProj.json()).data || []);

      const resSkills = await fetch(`${API_BASE}/skills`);
      if (resSkills.ok) setSkills((await resSkills.json()).data || []);

      const resExp = await fetch(`${API_BASE}/experiences`);
      if (resExp.ok) setExperiences((await resExp.json()).data || []);

      const resBlogs = await fetch(`${API_BASE}/blogs`);
      if (resBlogs.ok) setBlogs((await resBlogs.json()).data || []);

      const resCont = await fetch(`${API_BASE}/contact`, { headers });
      if (resCont.ok) setContacts((await resCont.json()).data || []);

      const resSub = await fetch(`${API_BASE}/newsletter`, { headers });
      if (resSub.ok) setSubscribers((await resSub.json()).data || []);

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
      setAuthError(`Failed to connect to backend API server at ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const endpoint = type === 'contacts' ? 'contact' : type;
      const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchDashboardData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSave = async (type: string, formData: any): Promise<boolean> => {
    if (!token) return false;
    try {
      const headers: any = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      let url = `${API_BASE}/${type}`;
      let method = 'POST';

      if (formData.id) {
        url = `${API_BASE}/${type}/${formData.id}`;
        method = 'PUT';
      }

      const payload = { ...formData };
      if (type === 'projects') {
        if (typeof payload.technologies === 'string') {
          payload.technologies = payload.technologies
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
        }
        if (typeof payload.images === 'string') {
          payload.images = payload.images
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
        }
      }

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchDashboardData();
        return true;
      } else {
        const errorData = await res.json();
        toast.error(`Failed to save: ${errorData.message || 'Validation error'}`);
        return false;
      }
    } catch (err) {
      console.error('Save failed:', err);
      return false;
    }
  };

  const saveSiteSettings = async (settingsObject: Record<string, any>): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/site-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ settings: settingsObject }),
      });
      if (res.ok) {
        await fetchDashboardData();
        return true;
      } else if (res.status === 401) {
        toast.error('Your admin session has expired. Please sign in again.');
        handleLogout();
        return false;
      } else {
        toast.error('Failed to save site settings');
        return false;
      }
    } catch (err) {
      console.error('Save site settings failed:', err);
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        token,
        loading,
        summaryData,
        projects,
        skills,
        experiences,
        blogs,
        contacts,
        subscribers,
        siteSettings,
        activeVisitorsCount,
        email,
        setEmail,
        password,
        setPassword,
        authError,
        fetchDashboardData,
        handleLogin,
        handleLogout,
        handleDelete,
        handleSave,
        saveSiteSettings,
        API_BASE,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
}
