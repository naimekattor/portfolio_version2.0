"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/language-context";
import { BookOpen, ArrowRight, Clock, Calendar, FileText } from "lucide-react";
import Link from "next/link";

const INITIAL_BLOG_POSTS = [
  {
    title: "Architecting for Scale: Lessons from 1M Users",
    excerpt:
      "How we handled a sudden 10x traffic spike without downtime using serverless functions and edge caching.",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    tag: "Infrastructure",
    url: "/blogs/architecting-for-scale",
  },
  {
    title: "The Future of AI Workflows in Web Development",
    excerpt:
      "Beyond simple chatbots: Integrating LLMs directly into core application business logic for smarter user experiences.",
    date: "Sep 28, 2023",
    readTime: "6 min read",
    tag: "AI / LLM",
    url: "/blogs/future-of-ai-workflows",
  },
];

export default function Communication() {
  const { t, language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState<any[]>(INITIAL_BLOG_POSTS);
  const [headerInfo, setHeaderInfo] = useState({
    badge: "Writing & Insights",
    title: "Technical Communication",
    subheading:
      "I believe in sharing knowledge and explaining complex concepts clearly — from architecture decisions to AI integrations.",
    buttonText: "Read all posts",
    buttonUrl: "/blogs",
    bottomStripText: "More articles coming soon",
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resBlogs, resSet] = await Promise.all([
          fetch("http://localhost:4000/api/v1/blogs"),
          fetch("http://localhost:4000/api/v1/site-settings"),
        ]);

        if (resSet.ok) {
          const jsonSet = await resSet.json();
          if (jsonSet.data?.blogs_section_header) {
            setHeaderInfo((prev) => ({
              ...prev,
              ...jsonSet.data.blogs_section_header,
            }));
          }
        }

        if (resBlogs.ok) {
          const jsonBlogs = await resBlogs.json();
          if (jsonBlogs.data && jsonBlogs.data.length > 0) {
            const formatted = jsonBlogs.data.map((b: any, idx: number) => {
              const formattedDate = b.publishedAt
                ? new Date(b.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Oct 12, 2023";

              return {
                title: b.title,
                excerpt: b.excerpt || b.content,
                date: formattedDate,
                readTime: b.readingTime
                  ? `${b.readingTime} min read`
                  : "5 min read",
                tag:
                  b.category?.name ||
                  (idx % 2 === 0 ? "Infrastructure" : "AI / LLM"),
                url: b.slug ? `/blogs/${b.slug}` : "/blogs",
              };
            });
            setPosts(formatted);
          }
        }
      } catch (err) {
        console.error("Failed to load blog section data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="relative py-24 md:py-28 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 transition-all duration-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[3.5px] uppercase text-primary-600 mb-4 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-slate-900 border border-primary-100 dark:border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-600 inline-block" />
              {language !== "en"
                ? t("blogsSection.badge")
                : headerInfo.badge || "Writing & Insights"}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-4">
              {language !== "en" ? (
                t("blogsSection.title")
              ) : (
                <>
                  Technical{" "}
                  <span className="text-primary-600">
                    Communication & Insights
                  </span>
                </>
              )}
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {language !== "en"
                ? t("blogsSection.subheading")
                : headerInfo.subheading ||
                  "I believe in sharing knowledge and explaining complex concepts clearly — from architecture decisions to AI integrations."}
            </p>
          </div>

          <Link href="/blogs">
            <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white transition-all shadow-md">
              {language !== "en"
                ? t("blogsSection.readAll")
                : headerInfo.buttonText || "Read all posts"}
              <ArrowRight className="w-4 h-4 rtl-flip" />
            </button>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 bg-secondary-50 dark:bg-slate-800 text-secondary-600 dark:text-secondary-400 border border-secondary-100 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" /> {post.date}
                </span>
                <Link
                  href={post.url}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-all"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Strip */}
        <div className="flex items-center justify-center gap-5 mt-14">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-800" />
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {language !== "en"
              ? t("blogsSection.comingSoon")
              : headerInfo.bottomStripText || "More articles coming soon"}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-300 dark:from-slate-800 to-transparent" />
        </div>
      </div>
    </section>
  );
}
