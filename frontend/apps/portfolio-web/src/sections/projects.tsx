'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import type { ProjectDto } from '@portfolio/types';

const statusColors: Record<string, string> = {
  PLANNING: 'bg-yellow-500/10 text-yellow-500',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-500',
  COMPLETED: 'bg-green-500/10 text-green-500',
  ON_HOLD: 'bg-orange-500/10 text-orange-500',
  ARCHIVED: 'bg-gray-500/10 text-gray-500',
};

function ProjectCard({ project, index }: { project: ProjectDto; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group card-hover rounded-xl bg-card border border-border overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-secondary overflow-hidden">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground/20">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Featured badge */}
        {project.isFeatured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
          {project.status.replace('_', ' ')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.shortDescription || project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section id="projects" className="section">
        <div className="section-container">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  const featuredProjects = projects?.filter((p) => p.isFeatured) || [];
  const otherProjects = projects?.filter((p) => !p.isFeatured) || [];

  return (
    <section id="projects" className="section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-muted-foreground mb-2 block">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Featured</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">More Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
