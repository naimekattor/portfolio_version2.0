"use client"
import { useState, useEffect } from "react";

const INITIAL_BLOG_POSTS = [
  {
    title: "Architecting for Scale: Lessons from 1M Users",
    excerpt: "How we handled a sudden 10x traffic spike without downtime using serverless functions and edge caching.",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    tag: "Infrastructure",
    url: "#",
    accent: "#174d4d",
  },
  {
    title: "The Future of AI in Web Development",
    excerpt: "Beyond chatbots: Integrating LLMs into core application logic for smarter user experiences.",
    date: "Sep 28, 2023",
    readTime: "6 min read",
    tag: "AI / LLM",
    url: "#",
    accent: "#a67a3b",
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  );
}

function PostCard({ post, index }: { post: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100 + index * 140);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(post.url, "_blank")}
      className={`relative rounded-3xl p-8 md:p-9 cursor-pointer overflow-hidden transition-all duration-500 backdrop-blur-md ${
        hovered
          ? "bg-white -translate-y-1.5 shadow-2xl"
          : "bg-white/70 translate-y-0 shadow-sm"
      } ${visible ? "opacity-100" : "opacity-0"}`}
      style={{
        border: `1.5px solid ${hovered ? post.accent + "30" : "rgba(23,60,60,0.09)"}`,
      }}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-400 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(90deg, ${post.accent}, ${post.accent}44)`,
        }}
      />

      {/* Glow */}
      <div
        className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-400 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(ellipse 80% 45% at 0% 0%, ${post.accent}08, transparent)`,
        }}
      />

      {/* Tag row */}
      <div className="flex items-center justify-between mb-5">
        <div
          className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[2.5px] uppercase px-3 py-1 rounded-full"
          style={{
            color: post.accent,
            background: `${post.accent}0e`,
            border: `1px solid ${post.accent}22`,
          }}
        >
          <BookIcon />
          {post.tag}
        </div>
        <span className="text-xs font-medium text-slate-400">
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`text-xl md:text-2xl font-extrabold leading-snug tracking-tight mb-3.5 transition-colors duration-300 ${
          hovered ? "text-[#0a1a1a]" : "text-[#1c3030]"
        }`}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p
        className={`text-sm leading-relaxed mb-7 transition-colors duration-300 ${
          hovered ? "text-[#4a6060]" : "text-slate-500"
        }`}
      >
        {post.excerpt}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-5 transition-colors duration-300"
        style={{
          borderTop: `1px solid ${hovered ? post.accent + "18" : "rgba(23,60,60,0.07)"}`,
        }}
      >
        <span className="text-xs font-medium text-slate-400">
          {post.date}
        </span>
        <div
          className={`flex items-center gap-1.5 text-xs font-bold transition-transform duration-350 ${
            hovered ? "translate-x-1" : "translate-x-0"
          }`}
          style={{ color: post.accent }}
        >
          Read article <ArrowIcon />
        </div>
      </div>
    </div>
  );
}

export default function Communication() {
  const [visible, setVisible] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [posts, setPosts] = useState<any[]>(INITIAL_BLOG_POSTS);
  const [headerInfo, setHeaderInfo] = useState({
    badge: "Writing & Insights",
    title: "Technical Communication",
    subheading:
      "I believe in sharing knowledge and explaining complex concepts clearly — from architecture decisions to AI integrations.",
    buttonText: "Read all posts",
    buttonUrl: "#",
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
            setHeaderInfo((prev) => ({ ...prev, ...jsonSet.data.blogs_section_header }));
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
                readTime: b.readingTime ? `${b.readingTime} min read` : "5 min read",
                tag: b.category?.name || (idx % 2 === 0 ? "Infrastructure" : "AI / LLM"),
                url: b.slug ? `/blogs/${b.slug}` : "#",
                accent: idx % 2 === 0 ? "#174d4d" : "#a67a3b",
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
    <section className="relative py-24 md:py-28 overflow-hidden bg-gradient-to-b from-[#f0f2ed] via-[#eceee9] to-[#f2ede8]">
      {/* Bg glows */}
      <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(23,77,77,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(166,122,59,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(23,77,77,0.07)_1px,transparent_1px)] bg-[size:28px_28px]"
        style={{
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── Header row ── */}
        <div
          className={`flex flex-wrap items-end justify-between gap-6 mb-14 transition-all duration-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[3.5px] uppercase text-[#174d4d] mb-4.5 px-4 py-1.5 rounded-full bg-[#174d4d]/10 border border-[#174d4d]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174d4d] inline-block" />
              {headerInfo.badge || "Writing & Insights"}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a1a1a] leading-tight tracking-tight mb-3.5">
              {headerInfo.title || "Technical Communication"}
            </h2>

            <p className="text-base text-[#5e7878] leading-relaxed font-normal">
              {headerInfo.subheading ||
                "I believe in sharing knowledge and explaining complex concepts clearly — from architecture decisions to AI integrations."}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={() => {
              if (headerInfo.buttonUrl && headerInfo.buttonUrl !== "#") {
                window.open(headerInfo.buttonUrl, "_blank");
              }
            }}
            className={`inline-flex items-center gap-2 text-xs font-bold tracking-wide px-6 py-3.5 rounded-xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${
              btnHover
                ? "bg-[#174d4d] border-[#174d4d] text-white -translate-y-0.5 shadow-xl shadow-[#174d4d]/20"
                : "bg-white/80 border-[#174d4d]/20 text-[#174d4d] translate-y-0 shadow-sm"
            }`}
          >
            {headerInfo.buttonText || "Read all posts"}
            <span
              className={`flex transition-transform duration-300 ${
                btnHover ? "translate-x-1" : "translate-x-0"
              }`}
            >
              <ArrowIcon />
            </span>
          </button>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <PostCard key={i} post={post} index={i} />
          ))}
        </div>

        {/* ── Bottom editorial strip ── */}
        <div
          className={`flex items-center justify-center gap-5 mt-14 transition-opacity duration-1000 delay-600 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#174d4d]/20" />
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#174d4d]/35 whitespace-nowrap">
            {headerInfo.bottomStripText || "More articles coming soon"}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#174d4d]/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}