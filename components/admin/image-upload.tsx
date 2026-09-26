'use client';

import React, { useState, useRef } from 'react';
import { Upload, Cloud, Image as ImageIcon, Trash2, ExternalLink, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  folder?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = 'Image URL / Path',
  placeholder = 'e.g. /hokpath.png or https://res.cloudinary.com/...',
  folder = 'portfolio/projects',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  const isCloudinary = value?.includes('cloudinary.com');

  const uploadFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WEBP, SVG, GIF)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB');
      return;
    }

    setUploading(true);
    const toastId = toast.loading('Uploading image to Cloudinary...');

    try {
      const token = Cookies.get('admin_token');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      if (!token) {
        toast.dismiss(toastId);
        throw new Error('You must be logged in as an admin to upload images.');
      }

      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      // Try dedicated Cloudinary upload first
      let res = await fetch(`${API_BASE}/media/upload-cloudinary`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (res.status === 401) {
        toast.dismiss(toastId);
        Cookies.remove('admin_token');
        throw new Error('Your admin session has expired. Please refresh the page and sign in again.');
      }

      let data = await res.json().catch(() => ({}));

      // If Cloudinary credentials are not set on backend, fallback to general upload endpoint
      if (!res.ok && data?.message?.includes('Cloudinary is not configured')) {
        toast.dismiss(toastId);
        toast.loading('Cloudinary credentials not set in backend/.env. Saving via standard upload...', { id: toastId });
        res = await fetch(`${API_BASE}/media/upload`, {
          method: 'POST',
          headers,
          body: formData,
        });
        data = await res.json().catch(() => ({}));
      }

      if (res.ok && data?.data?.url) {
        onChange(data.data.url);
        toast.success(
          data.data.url.includes('cloudinary.com')
            ? 'Uploaded to Cloudinary successfully!'
            : 'Uploaded successfully!',
          { id: toastId }
        );
      } else {
        throw new Error(data?.message || 'Failed to upload image');
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      toast.error(err.message || 'Image upload failed', { id: toastId });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
          {label}
        </label>
        {isCloudinary && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Cloud className="w-2.5 h-2.5" />
            Cloudinary
          </span>
        )}
      </div>

      {/* Manual Input + Upload Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 pr-9 transition-colors"
            placeholder={placeholder}
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-400 transition-colors p-0.5"
              title="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-[6px] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 shrink-0"
          title="Upload image directly to Cloudinary"
        >
          {uploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Cloud className="w-3.5 h-3.5" />
              <span>Upload to Cloudinary</span>
            </>
          )}
        </button>
      </div>

      {/* Drag & Drop Quick Zone (visible when empty or drag active) */}
      {!value && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-[6px] p-3 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span>Drop image here or click to upload to Cloudinary</span>
          </div>
        </div>
      )}

      {/* Image Preview Box */}
      {value && (
        <div className="relative rounded-[6px] border border-slate-800 bg-slate-950 p-2 flex items-center gap-3">
          <div className="w-14 h-14 rounded-[6px] overflow-hidden bg-slate-900 border border-slate-800 shrink-0 relative flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-300 truncate" title={value}>
              {value}
            </p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {isCloudinary ? 'Cloudinary CDN active' : 'Custom Image URL active'}
            </p>
          </div>
          <div className="flex items-center gap-1 pr-1 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-800"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800"
              title="Remove image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
