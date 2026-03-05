'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Code, 
  Brain, 
  Briefcase, 
  Users, 
  Rocket,
  GraduationCap,
  Award,
  Zap
} from 'lucide-react';
import { useTimeline } from '@/hooks/use-timeline';
import { formatDate } from '@portfolio/utils';
import type { TimelineEventDto } from '@portfolio/types';

const typeIcons: Record<string, React.ElementType> = {
  PERSONAL: TrendingUp,
  EDUCATION: GraduationCap,
  CAREER: Briefcase,
  PROJECT: Code,
  SKILL: Brain,
  MILESTONE: Award,
};

const typeColors: Record<string, string> = {
  PERSONAL: '#10B981',
  EDUCATION: '#3B82F6',
  CAREER: '#F59E0B',
  PROJECT: '#8B5CF6',
  SKILL: '#EC4899',
  MILESTONE: '#EF4444',
};

function TimelineEvent({ event, index, isLeft }: { event: TimelineEventDto; index: number; isLeft: boolean }) {
  const Icon = typeIcons[event.type] || Zap;
  const color = event.color || typeColors[event.type] || '#a3a3a3';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline dot */}
      <div 
        className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-background transform -translate-x-1/2 mt-1.5 z-10"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="card-hover p-5 rounded-xl bg-card border border-border">
          {/* Date */}
          <span className="text-xs font-medium text-muted-foreground mb-2 block">
            {formatDate(event.date, 'MMMM yyyy')}
          </span>

          {/* Title */}
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4" style={{ color }} />
            <h3 className="font-semibold">{event.title}</h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground">{event.description}</p>

          {/* Link */}
          {event.linkUrl && (
            <a
              href={event.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
            >
              {event.linkText || 'Learn more'}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function TimelineSection() {
  const { data: events, isLoading } = useTimeline();

  if (isLoading) {
    return (
      <section id="timeline" className="section">
        <div className="section-container">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className="section bg-card">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-muted-foreground mb-2 block">Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold">Activity Timeline</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Key milestones and events that have shaped my path in technology and entrepreneurship.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {/* Events */}
          <div className="space-y-12">
            {events?.map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
