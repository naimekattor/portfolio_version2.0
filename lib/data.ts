import { Zap, Shield, BarChart3, Server, Database, Cpu, Globe } from 'lucide-react';

export const HERO_CONTENT = {
  badge: "Available for new projects",
  title: "Full-Stack Developer Building Scalable AI-Powered Web Applications",
  highlight: "Scalable AI-Powered",
  description: "I bridge the gap between complex technical problems and elegant, production-ready solutions that deliver real business value.",
  primaryCta: "View Projects",
  secondaryCta: "Download Resume"
};

export const PROBLEMS = [
  {
    title: "Scalability Bottlenecks",
    problem: "Legacy systems failing under high traffic loads during peak hours.",
    solution: "Implemented microservices architecture with Redis caching and horizontal scaling, reducing latency by 60%.",
    icon: Zap,
  },
  {
    title: "Data Security Risks",
    problem: "Vulnerable authentication flows and unencrypted sensitive user data.",
    solution: "Architected a secure OAuth2/OIDC flow with end-to-end encryption and automated security audits.",
    icon: Shield,
  },
  {
    title: "Inefficient Workflows",
    problem: "Manual data entry processes costing teams 20+ hours per week.",
    solution: "Built an AI-powered automation engine that reduced manual effort by 85% using LLM-based extraction.",
    icon: BarChart3,
  }
];

export const ARCHITECTURE_TECH = [
  { icon: Server, label: "Microservices", desc: "Node.js & Go" },
  { icon: Database, label: "Data Layer", desc: "PostgreSQL & Redis" },
  { icon: Cpu, label: "AI Integration", desc: "OpenAI & LangChain" },
  { icon: Globe, label: "Edge Computing", desc: "Next.js & Vercel" }
];

export const PROJECTS = [
  {
    title: "Nexus AI Analytics",
    problem: "SaaS companies lacked real-time insights into user behavior patterns.",
    solution: "Built a real-time streaming analytics platform using Kafka and Next.js.",
    impact: "Increased user retention by 24% for early adopters.",
    tech: ["Next.js", "Kafka", "PostgreSQL", "Tailwind"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "SecureFlow ERP",
    problem: "Enterprise resource planning was fragmented and insecure.",
    solution: "Developed a unified ERP with RBAC and end-to-end encrypted data storage.",
    impact: "Reduced operational costs by $15k/month for a mid-sized firm.",
    tech: ["React", "Node.js", "AWS", "Docker"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export const SKILLS = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Redis", "GraphQL"] },
  { category: "AI / LLM", items: ["OpenAI API", "LangChain", "Vector DBs", "Prompt Engineering"] },
  { category: "Cloud / DevOps", items: ["AWS", "Docker", "CI/CD", "Vercel", "Terraform"] }
];

export const BLOG_POSTS = [
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

export const METRICS = [
  { value: "60%", label: "Latency Reduction", sub: "Across core API endpoints" },
  { value: "85%", label: "Process Automation", sub: "Manual tasks eliminated" },
  { value: "$180k", label: "Annual Cost Savings", sub: "Infrastructure optimization" },
  { value: "2.4x", label: "User Growth", sub: "Post-redesign performance" }
];
