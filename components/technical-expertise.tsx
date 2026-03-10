'use client';

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Redis", "GraphQL"] },
  { category: "AI / LLM", items: ["OpenAI API", "LangChain", "Vector DBs", "Prompt Engineering"] },
  { category: "Cloud / DevOps", items: ["AWS", "Docker", "CI/CD", "Vercel", "Terraform"] }
];

export function TechnicalExpertise() {
  return (
    <section id="expertise" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical Expertise</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">A comprehensive toolkit built for modern web scale.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, i) => (
            <div key={i} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 mb-6">{skill.category}</h3>
              <ul className="space-y-3">
                {skill.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-600 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
