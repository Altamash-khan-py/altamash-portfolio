'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code2, Database, Brain, Server, Wrench } from 'lucide-react';
import { useSkills } from '@/hooks/use-skills';
import type { SkillDto } from '@portfolio/types';

const categoryIcons: Record<string, React.ElementType> = {
  'Programming Languages': Code2,
  'Web Development': Server,
  'Data Science': Brain,
  'Databases': Database,
  'Tools & DevOps': Wrench,
};

const levelWidths: Record<string, string> = {
  BEGINNER: 'w-1/4',
  INTERMEDIATE: 'w-2/4',
  ADVANCED: 'w-3/4',
  EXPERT: 'w-full',
};

const levelColors: Record<string, string> = {
  BEGINNER: 'bg-yellow-500',
  INTERMEDIATE: 'bg-blue-500',
  ADVANCED: 'bg-purple-500',
  EXPERT: 'bg-green-500',
};

function SkillCard({ skill }: { skill: SkillDto }) {
  return (
    <div className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm">{skill.name}</span>
        <span className="text-xs text-muted-foreground capitalize">{skill.level.toLowerCase()}</span>
      </div>
      <div className="skill-bar">
        <div 
          className={`skill-bar-fill ${levelColors[skill.level]}`}
          style={{ width: skill.level === 'BEGINNER' ? '25%' : skill.level === 'INTERMEDIATE' ? '50%' : skill.level === 'ADVANCED' ? '75%' : '100%' }}
        />
      </div>
      {skill.description && (
        <p className="text-xs text-muted-foreground mt-2">{skill.description}</p>
      )}
    </div>
  );
}

export function SkillsSection() {
  const { data: categories, isLoading } = useSkills();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isLoading) {
    return (
      <section id="skills" className="section">
        <div className="section-container">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section bg-card">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-muted-foreground mb-2 block">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories?.map((category, index) => {
            const Icon = categoryIcons[category.name] || Code2;
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-background border border-border overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.skills.length} skills</p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Skills List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 space-y-3">
                        {category.skills.map((skill) => (
                          <SkillCard key={skill.id} skill={skill} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Preview (when collapsed) */}
                {!isExpanded && (
                  <div className="px-5 pb-5">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 4).map((skill) => (
                        <span key={skill.id} className="tag">
                          {skill.name}
                        </span>
                      ))}
                      {category.skills.length > 4 && (
                        <span className="tag">+{category.skills.length - 4}</span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
