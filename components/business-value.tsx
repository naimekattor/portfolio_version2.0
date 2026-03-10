'use client';

import { motion } from "framer-motion";

const metrics = [
  { value: "60%", label: "Latency Reduction", sub: "Across core API endpoints" },
  { value: "85%", label: "Process Automation", sub: "Manual tasks eliminated" },
  { value: "$180k", label: "Annual Cost Savings", sub: "Infrastructure optimization" },
  { value: "2.4x", label: "User Growth", sub: "Post-redesign performance" }
];

export function BusinessValue() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Delivering Business Value</h2>
          <p className="text-slate-600">My work is measured by the impact it has on the bottom line and user experience.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div key={i} className="text-center">
              <motion.p className="text-5xl font-bold text-primary-600 mb-2">
                {metric.value}
              </motion.p>
              <p className="text-lg font-bold text-slate-900 mb-1">{metric.label}</p>
              <p className="text-sm text-slate-500">{metric.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
