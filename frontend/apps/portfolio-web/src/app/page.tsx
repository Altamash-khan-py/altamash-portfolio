import { HeroSection } from '@/sections/hero';
import { ExperienceSection } from '@/sections/experience';
import { SkillsSection } from '@/sections/skills';
import { ProjectsSection } from '@/sections/projects';
import { LibrarySection } from '@/sections/library';
import { QuestsSection } from '@/sections/quests';
import { TimelineSection } from '@/sections/timeline';
import { ContactSection } from '@/sections/contact';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <LibrarySection />
      <QuestsSection />
      <TimelineSection />
      <ContactSection />
    </>
  );
}
