'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/blogs/${slug}`);
        if (res.ok) {
          const json = await res.json();
          setBlog(json.data);
        } else {
          setBlog({
            title: slug.replace(/-/g, ' ').toUpperCase(),
            slug,
            excerpt:
              'High-performance web architecture strategies, serverless APIs, and AI integrations.',
            content: `
### Overview

Building modern, production-grade applications requires balancing velocity with long-term maintainability. 

#### Key Takeaways & Architecture Principles:
1. **Decoupled Backend Services**: Modular Express/Node.js endpoints with clear route boundaries.
2. **Caching Strategy**: Redis layer for sub-10ms response times on hot keys.
3. **Database Performance**: Indexed PostgreSQL schemas with Prisma ORM migrations.
4. **Resilient AI Workflows**: Asynchronous worker queues for non-blocking LLM responses.

#### Conclusion
By prioritizing scalable foundational architecture early, systems maintain extreme stability even under traffic surges.
            `,
            publishedAt: new Date().toISOString(),
            readingTime: 6,
            category: { name: 'Engineering' },
          });
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-slate-500 text-sm font-medium animate-pulse">Loading article...</div>
      </main>
    );
  }

  const formattedDate = blog?.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />

      <article className="pt-36 pb-20 flex-1">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Writing & Insights
          </Link>

          {/* Article Header */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3.5 py-1 bg-secondary-50 dark:bg-slate-800 text-secondary-600 dark:text-secondary-400 border border-secondary-100 dark:border-slate-700 text-xs font-bold uppercase tracking-wider rounded-full">
                {typeof blog?.category === 'object' ? blog?.category?.name : blog?.category || 'Engineering'}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" /> {blog?.readingTime || 5} min read
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium ml-auto">
                <Calendar className="w-3.5 h-3.5" /> {formattedDate}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-6">
              {blog?.title}
            </h1>

            {blog?.excerpt && (
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed border-l-4 border-secondary-500 pl-4 py-1 font-medium">
                {blog.excerpt}
              </p>
            )}
          </div>

          {/* Article Body */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed text-base">
            <div className="whitespace-pre-line">{blog?.content}</div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
