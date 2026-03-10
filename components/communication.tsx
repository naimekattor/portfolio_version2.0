'use client';

import { BookOpen } from 'lucide-react';

const BLOG_POSTS = [
  {
    title: "Architecting for Scale: Lessons from 1M Users",
    excerpt: "How we handled a sudden 10x traffic spike without downtime using serverless functions and edge caching.",
    date: "Oct 12, 2023",
    url: "#"
  },
  {
    title: "The Future of AI in Web Development",
    excerpt: "Beyond chatbots: Integrating LLMs into core application logic for smarter user experiences.",
    date: "Sep 28, 2023",
    url: "#"
  }
];

export function Communication() {
  return (
    <section id="blog" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Communication</h2>
            <p className="text-slate-400 max-w-2xl">I believe in sharing knowledge and explaining complex concepts in simple terms.</p>
          </div>
          <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all">Read all posts</button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <div 
              key={i} 
              onClick={() => window.open(post.url, '_blank')}
              className="group p-8 rounded-2xl border border-slate-800 hover:border-slate-700 bg-slate-800/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 text-secondary-400 text-xs font-bold uppercase tracking-wider mb-4">
                <BookOpen className="w-4 h-4" /> Technical Article
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary-400 transition-colors">{post.title}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">{post.excerpt}</p>
              <p className="text-slate-500 text-sm">{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
