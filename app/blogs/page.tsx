'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Search, BookOpen, Clock, Calendar, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';

const DEFAULT_BLOGS = [
  {
    id: '1',
    title: 'Architecting for Scale: Lessons from 1M Users',
    slug: 'architecting-for-scale',
    excerpt:
      'How we handled a sudden 10x traffic spike without downtime using serverless functions, Redis caching, and edge routing.',
    content: 'Full article content describing architecture decisions...',
    publishedAt: '2023-10-12T00:00:00.000Z',
    readingTime: 8,
    category: { name: 'Infrastructure' },
    seoDescription: 'Architecture patterns for scaling web applications.',
  },
  {
    id: '2',
    title: 'The Future of AI Workflows in Web Development',
    slug: 'future-of-ai-workflows',
    excerpt:
      'Beyond simple chatbots: Integrating LLMs directly into core application business logic for smarter user experiences.',
    content: 'Full article content describing LLM integrations...',
    publishedAt: '2023-09-28T00:00:00.000Z',
    readingTime: 6,
    category: { name: 'AI / LLM' },
    seoDescription: 'Integrating LLMs into production web software.',
  },
  {
    id: '3',
    title: 'Building High-Performance Next.js & GraphQL APIs',
    slug: 'nextjs-graphql-performance',
    excerpt:
      'Optimizing query response times and reducing frontend bundle sizes through modern caching and server components.',
    content: 'Full article content detailing Next.js performance optimizations...',
    publishedAt: '2023-08-15T00:00:00.000Z',
    readingTime: 5,
    category: { name: 'Full-Stack' },
    seoDescription: 'Next.js and GraphQL optimization techniques.',
  },
];

export default function BlogsPage() {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<any[]>(DEFAULT_BLOGS);
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('http://localhost:4000/api/v1/blogs');
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setBlogs(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load blog posts from backend:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const categories = [
    'All',
    ...Array.from(
      new Set(blogs.map((b) => (typeof b.category === 'object' ? b.category?.name : b.category) || 'General'))
    ),
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const categoryName = (typeof blog.category === 'object' ? blog.category?.name : blog.category) || 'General';
    const matchesCategory = selectedTag === 'All' || categoryName === selectedTag;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-50 border border-secondary-100 text-secondary-600 text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" /> {t('blogsPage.badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              {t('blogsPage.title')}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('blogsPage.subheading')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-slate-100/70 border-b border-slate-200 sticky top-[73px] z-30 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTag(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedTag === cat
                    ? 'bg-secondary-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('blogsPage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-secondary-600 transition-colors shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-6">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, idx) => {
                const categoryName =
                  (typeof blog.category === 'object' ? blog.category?.name : blog.category) || 'General';
                const formattedDate = blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Oct 12, 2023';

                return (
                  <motion.div
                    key={blog.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-7 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 bg-secondary-50 text-secondary-600 border border-secondary-100 text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {categoryName}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <Clock className="w-3.5 h-3.5" /> {blog.readingTime || 5} {t('blogsPage.minRead')}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-secondary-600 transition-colors leading-snug">
                        {blog.title}
                      </h3>

                      <p className="text-slate-600 text-xs leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt || blog.content}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" /> {formattedDate}
                      </span>
                      <Link
                        href={`/blogs/${blog.slug || blog.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-600 group-hover:translate-x-1 transition-all"
                      >
                        {t('blogsPage.readArticle')} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">{t('blogsPage.noArticlesTitle')}</h3>
              <p className="text-xs text-slate-500">{t('blogsPage.noArticlesSub')}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
