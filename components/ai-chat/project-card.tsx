import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectResult } from '../../types/ai';

interface ProjectCardProps {
  project: ProjectResult;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imgSrc = project.image || '/hokpath.png'; // Fallback
  const liveLink = project.liveUrl || '#';
  const githubLink = project.githubUrl || '#';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="my-4 overflow-hidden border rounded-2xl group border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Project Image */}
        <div className="relative w-full sm:w-1/3 aspect-video sm:aspect-auto overflow-hidden bg-slate-100 dark:bg-slate-800 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 shrink-0">
          <img
            src={imgSrc}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            {project.title}
          </h4>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="flex gap-4 mt-auto">
            {liveLink !== '#' && (
              <a
                href={liveLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Live
              </a>
            )}
            {githubLink !== '#' && (
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5" /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
