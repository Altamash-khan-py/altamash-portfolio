'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useExperience } from '@/hooks/use-experience';
import { formatDate, formatDuration } from '@portfolio/utils';

export function ExperienceSection() {
  const { data: experiences, isLoading } = useExperience();

  if (isLoading) {
    return (
      <section id="experience" className="section">
        <div className="section-container">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-muted-foreground mb-2 block">Career</span>
          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences?.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background transform -translate-x-1/2 mt-1.5" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="card-hover p-6 rounded-xl bg-card border border-border">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      {exp.isCurrent && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-500">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(exp.startDate, 'MMM yyyy')} - {exp.endDate ? formatDate(exp.endDate, 'MMM yyyy') : 'Present'}
                      </span>
                      <span className="text-border">•</span>
                      <span>{formatDuration(exp.startDate, exp.endDate)}</span>
                      {exp.location && (
                        <>
                          <span className="text-border">•</span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
