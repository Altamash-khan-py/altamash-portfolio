'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Rocket, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useQuests } from '@/hooks/use-quests';
import type { QuestDto } from '@portfolio/types';

const statusIcons: Record<string, React.ElementType> = {
  IDEA: Lightbulb,
  PLANNING: Clock,
  IN_PROGRESS: Rocket,
  COMPLETED: CheckCircle2,
  ABANDONED: AlertCircle,
};

const statusColors: Record<string, string> = {
  IDEA: 'text-yellow-500',
  PLANNING: 'text-blue-500',
  IN_PROGRESS: 'text-purple-500',
  COMPLETED: 'text-green-500',
  ABANDONED: 'text-gray-500',
};

const priorityColors: Record<string, string> = {
  LOW: 'bg-gray-500/10 text-gray-500',
  MEDIUM: 'bg-blue-500/10 text-blue-500',
  HIGH: 'bg-orange-500/10 text-orange-500',
  CRITICAL: 'bg-red-500/10 text-red-500',
};

function QuestCard({ quest, index }: { quest: QuestDto; index: number }) {
  const StatusIcon = statusIcons[quest.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-5 rounded-xl bg-card border border-border card-hover"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 ${statusColors[quest.status]}`} />
          <h3 className="font-semibold">{quest.title}</h3>
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priorityColors[quest.priority]}`}>
          {quest.priority}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4">{quest.description}</p>

      {/* Tags */}
      {quest.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {quest.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Dates */}
      {(quest.startDate || quest.targetDate) && (
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
          {quest.startDate && (
            <span>Started: {new Date(quest.startDate).toLocaleDateString()}</span>
          )}
          {quest.targetDate && (
            <span>Target: {new Date(quest.targetDate).toLocaleDateString()}</span>
          )}
        </div>
      )}
    </motion.article>
  );
}

export function QuestsSection() {
  const { data: quests, isLoading } = useQuests();

  if (isLoading) {
    return (
      <section id="quests" className="section">
        <div className="section-container">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  const activeQuests = quests?.filter((q) => q.status !== 'COMPLETED' && q.status !== 'ABANDONED') || [];
  const completedQuests = quests?.filter((q) => q.status === 'COMPLETED') || [];

  return (
    <section id="quests" className="section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-muted-foreground mb-2 block">Goals</span>
          <h2 className="text-3xl md:text-4xl font-bold">Quests & Ideas</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Learning goals, experiments, and ideas I&apos;m exploring. A living document of my journey.
          </p>
        </motion.div>

        {/* Active Quests */}
        {activeQuests.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" />
              In Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeQuests.map((quest, index) => (
                <QuestCard key={quest.id} quest={quest} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Quests */}
        {completedQuests.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Completed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedQuests.map((quest, index) => (
                <QuestCard key={quest.id} quest={quest} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
