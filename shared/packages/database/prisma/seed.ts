import { PrismaClient, UserRole, SkillLevel, ProjectStatus, QuestStatus, QuestPriority, TimelineType } from '../generated/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ============================================
  // CREATE ADMIN USER
  // ============================================
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'altamash@portfolio.com' },
    update: {},
    create: {
      email: 'altamash@portfolio.com',
      passwordHash: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // ============================================
  // CREATE PROFILE
  // ============================================
  const profile = await prisma.profile.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      fullName: 'Md Altamash Khan',
      title: 'Software Developer • Data Science Enthusiast • Entrepreneur',
      bio: 'Passionate software developer with a strong foundation in data science and entrepreneurship. I believe in building intelligent systems through mathematics, code, and real-world problem solving. Currently focused on creating impactful solutions that bridge technology and human needs.',
      location: 'Bhagalpur, Bihar, India',
      birthDate: new Date('2004-09-25'),
      quote: 'Building intelligent systems through mathematics, code, and real-world problem solving.',
      avatarUrl: '/uploads/avatar.jpg',
      seoTitle: 'Md Altamash Khan - Software Developer & Data Science Enthusiast',
      seoDescription: 'Portfolio of Md Altamash Khan - Software Developer, Data Science Enthusiast, and Entrepreneur from Bhagalpur, Bihar, India.',
      seoKeywords: 'software developer, data science, entrepreneur, Bhagalpur, Bihar, India, web development, machine learning',
    },
  });

  console.log('✅ Profile created:', profile.fullName);

  // ============================================
  // CREATE SOCIAL LINKS
  // ============================================
  const socialLinks = [
    { platform: 'GitHub', url: 'https://github.com/altamashkhan', order: 1 },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/altamashkhan', order: 2 },
    { platform: 'Twitter', url: 'https://twitter.com/altamashkhan', order: 3 },
    { platform: 'Email', url: 'mailto:altamash@portfolio.com', order: 4 },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: { 
        id: `${profile.id}-${link.platform}` 
      },
      update: {},
      create: {
        profileId: profile.id,
        platform: link.platform,
        url: link.url,
        order: link.order,
      },
    });
  }

  console.log('✅ Social links created');

  // ============================================
  // CREATE SKILL CATEGORIES
  // ============================================
  const skillCategories = [
    { name: 'Programming Languages', description: 'Core programming languages I work with', order: 1 },
    { name: 'Web Development', description: 'Frontend and backend web technologies', order: 2 },
    { name: 'Data Science', description: 'Machine learning and data analysis tools', order: 3 },
    { name: 'Databases', description: 'Database systems and query languages', order: 4 },
    { name: 'Tools & DevOps', description: 'Development tools and deployment', order: 5 },
  ];

  const createdCategories = [];
  for (const cat of skillCategories) {
    const category = await prisma.skillCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    createdCategories.push(category);
  }

  console.log('✅ Skill categories created');

  // ============================================
  // CREATE SKILLS
  // ============================================
  const skills = [
    // Programming Languages
    { name: 'Python', level: SkillLevel.EXPERT, categoryId: createdCategories[0].id, order: 1, description: 'Primary language for data science and backend development' },
    { name: 'JavaScript', level: SkillLevel.ADVANCED, categoryId: createdCategories[0].id, order: 2, description: 'Full-stack web development' },
    { name: 'TypeScript', level: SkillLevel.ADVANCED, categoryId: createdCategories[0].id, order: 3, description: 'Type-safe application development' },
    { name: 'Java', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[0].id, order: 4, description: 'Enterprise application development' },
    { name: 'C++', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[0].id, order: 5, description: 'System programming and algorithms' },
    
    // Web Development
    { name: 'React', level: SkillLevel.ADVANCED, categoryId: createdCategories[1].id, order: 1, description: 'Modern UI development' },
    { name: 'Next.js', level: SkillLevel.ADVANCED, categoryId: createdCategories[1].id, order: 2, description: 'Full-stack React framework' },
    { name: 'Node.js', level: SkillLevel.ADVANCED, categoryId: createdCategories[1].id, order: 3, description: 'Server-side JavaScript runtime' },
    { name: 'NestJS', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[1].id, order: 4, description: 'Enterprise Node.js framework' },
    { name: 'TailwindCSS', level: SkillLevel.ADVANCED, categoryId: createdCategories[1].id, order: 5, description: 'Utility-first CSS framework' },
    
    // Data Science
    { name: 'TensorFlow', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[2].id, order: 1, description: 'Deep learning framework' },
    { name: 'PyTorch', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[2].id, order: 2, description: 'Machine learning research' },
    { name: 'Pandas', level: SkillLevel.ADVANCED, categoryId: createdCategories[2].id, order: 3, description: 'Data manipulation and analysis' },
    { name: 'NumPy', level: SkillLevel.ADVANCED, categoryId: createdCategories[2].id, order: 4, description: 'Numerical computing' },
    { name: 'Scikit-learn', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[2].id, order: 5, description: 'Machine learning library' },
    
    // Databases
    { name: 'PostgreSQL', level: SkillLevel.ADVANCED, categoryId: createdCategories[3].id, order: 1, description: 'Relational database' },
    { name: 'MongoDB', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[3].id, order: 2, description: 'NoSQL document database' },
    { name: 'Redis', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[3].id, order: 3, description: 'In-memory data store' },
    { name: 'Prisma', level: SkillLevel.ADVANCED, categoryId: createdCategories[3].id, order: 4, description: 'Modern database toolkit' },
    
    // Tools & DevOps
    { name: 'Git', level: SkillLevel.ADVANCED, categoryId: createdCategories[4].id, order: 1, description: 'Version control' },
    { name: 'Docker', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[4].id, order: 2, description: 'Containerization' },
    { name: 'AWS', level: SkillLevel.INTERMEDIATE, categoryId: createdCategories[4].id, order: 3, description: 'Cloud services' },
    { name: 'Linux', level: SkillLevel.ADVANCED, categoryId: createdCategories[4].id, order: 4, description: 'Operating system' },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { 
        id: `${profile.id}-${skill.name}` 
      },
      update: {},
      create: {
        profileId: profile.id,
        ...skill,
      },
    });
  }

  console.log('✅ Skills created');

  // ============================================
  // CREATE EXPERIENCE
  // ============================================
  const experiences = [
    {
      company: 'Severeon',
      role: 'Co-Founder & CTO',
      description: 'Leading technical strategy and product development for a technology startup. Building scalable solutions and managing engineering teams.',
      location: 'Remote',
      startDate: new Date('2026-01-01'),
      isCurrent: true,
      order: 1,
    },
    {
      company: 'Political Campaign',
      role: 'Data Analyst & Tech Consultant',
      description: 'Provided data-driven insights and technical solutions for political campaign strategy. Developed voter analysis tools and reporting systems.',
      location: 'Bihar, India',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      isCurrent: false,
      order: 2,
    },
    {
      company: 'Freelance',
      role: 'Full-Stack Developer',
      description: 'Developed custom web applications and data solutions for various clients. Specialized in Python and React-based solutions.',
      location: 'Remote',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-12-31'),
      isCurrent: false,
      order: 3,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({
      data: {
        profileId: profile.id,
        ...exp,
      },
    });
  }

  console.log('✅ Experience entries created');

  // ============================================
  // CREATE PROJECTS
  // ============================================
  const projects = [
    {
      title: 'Portfolio Platform',
      slug: 'portfolio-platform',
      description: 'A production-grade personal portfolio platform with full CMS capabilities. Built with Next.js, NestJS, and PostgreSQL following clean architecture principles.',
      shortDescription: 'Full-stack portfolio platform with CMS',
      tags: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
      status: ProjectStatus.COMPLETED,
      githubUrl: 'https://github.com/altamashkhan/portfolio-platform',
      liveUrl: 'https://altamashkhan.dev',
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Stock Market Analyzer',
      slug: 'stock-market-analyzer',
      description: 'Python-based stock market analysis tool with machine learning predictions. Features technical indicators, portfolio tracking, and automated alerts.',
      shortDescription: 'ML-powered stock analysis platform',
      tags: ['Python', 'TensorFlow', 'Pandas', 'FastAPI', 'React'],
      status: ProjectStatus.IN_PROGRESS,
      githubUrl: 'https://github.com/altamashkhan/stock-analyzer',
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Voter Analytics Dashboard',
      slug: 'voter-analytics',
      description: 'Data visualization dashboard for political campaign analytics. Processes voter data, demographic analysis, and campaign performance metrics.',
      shortDescription: 'Political campaign analytics platform',
      tags: ['Python', 'D3.js', 'PostgreSQL', 'React', 'Data Science'],
      status: ProjectStatus.COMPLETED,
      isFeatured: false,
      order: 3,
    },
    {
      title: 'AI Chat Assistant',
      slug: 'ai-chat-assistant',
      description: 'Intelligent chatbot powered by large language models. Features context awareness, multi-language support, and custom knowledge base integration.',
      shortDescription: 'LLM-powered conversational AI',
      tags: ['Python', 'OpenAI', 'FastAPI', 'React', 'NLP'],
      status: ProjectStatus.IN_PROGRESS,
      githubUrl: 'https://github.com/altamashkhan/ai-assistant',
      isFeatured: true,
      order: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        profileId: profile.id,
        ...project,
      },
    });
  }

  console.log('✅ Projects created');

  // ============================================
  // CREATE BOOKS
  // ============================================
  const books = [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: 'A handbook of agile software craftsmanship. Essential reading for writing maintainable and readable code.',
      lessons: 'The importance of meaningful naming, keeping functions small and focused, and the Boy Scout Rule of leaving code cleaner than you found it.',
      quotes: 'The only way to go fast is to go well.',
      rating: 5,
      readDate: new Date('2023-03-15'),
      isFavorite: true,
      order: 1,
    },
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      description: 'The big ideas behind reliable, scalable, and maintainable systems. Deep dive into distributed systems and data modeling.',
      lessons: 'Understanding trade-offs in data systems, the importance of data models, and building systems that stand the test of time.',
      rating: 5,
      readDate: new Date('2024-01-20'),
      isFavorite: true,
      order: 2,
    },
    {
      title: 'Deep Learning',
      author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
      description: 'The definitive textbook on deep learning. Comprehensive coverage of neural networks and modern AI techniques.',
      lessons: 'Mathematical foundations of neural networks, optimization techniques, and the principles behind modern AI breakthroughs.',
      rating: 4,
      readDate: new Date('2023-08-10'),
      isFavorite: false,
      order: 3,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt, David Thomas',
      description: 'Your journey to mastery as a programmer. Timeless advice on software development practices and mindset.',
      lessons: 'DRY principle, orthogonality, tracer bullets, and the importance of continuous learning in software development.',
      quotes: 'Don\'t live with broken windows.',
      rating: 5,
      readDate: new Date('2022-11-05'),
      isFavorite: true,
      order: 4,
    },
    {
      title: 'Python for Data Analysis',
      author: 'Wes McKinney',
      description: 'Data wrangling with Pandas, NumPy, and IPython. Practical guide to data manipulation and analysis in Python.',
      lessons: 'Efficient data manipulation techniques, time series analysis, and building data processing pipelines.',
      rating: 4,
      readDate: new Date('2023-05-22'),
      isFavorite: false,
      order: 5,
    },
  ];

  for (const book of books) {
    await prisma.book.create({
      data: {
        profileId: profile.id,
        ...book,
      },
    });
  }

  console.log('✅ Books created');

  // ============================================
  // CREATE QUOTES
  // ============================================
  const quotes = [
    {
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      source: 'Stanford Commencement Speech',
      isFeatured: true,
      order: 1,
    },
    {
      text: 'Software is eating the world.',
      author: 'Marc Andreessen',
      source: 'Wall Street Journal',
      isFeatured: false,
      order: 2,
    },
    {
      text: 'Any sufficiently advanced technology is indistinguishable from magic.',
      author: 'Arthur C. Clarke',
      source: 'Clarke\'s Three Laws',
      isFeatured: true,
      order: 3,
    },
    {
      text: 'Talk is cheap. Show me the code.',
      author: 'Linus Torvalds',
      source: 'Linux Kernel Mailing List',
      isFeatured: false,
      order: 4,
    },
    {
      text: 'The best way to predict the future is to invent it.',
      author: 'Alan Kay',
      source: 'Xerox PARC',
      isFeatured: true,
      order: 5,
    },
  ];

  for (const quote of quotes) {
    await prisma.quote.create({
      data: {
        profileId: profile.id,
        ...quote,
      },
    });
  }

  console.log('✅ Quotes created');

  // ============================================
  // CREATE QUESTS
  // ============================================
  const quests = [
    {
      title: 'Master Distributed Systems',
      description: 'Deep dive into distributed systems architecture, consensus algorithms, and building scalable systems.',
      status: QuestStatus.IN_PROGRESS,
      priority: QuestPriority.HIGH,
      tags: ['System Design', 'Distributed Systems', 'Architecture'],
      order: 1,
    },
    {
      title: 'Build a Production ML Pipeline',
      description: 'Create an end-to-end machine learning pipeline with data ingestion, training, deployment, and monitoring.',
      status: QuestStatus.PLANNING,
      priority: QuestPriority.HIGH,
      tags: ['Machine Learning', 'MLOps', 'Python'],
      order: 2,
    },
    {
      title: 'Contribute to Open Source',
      description: 'Make meaningful contributions to major open source projects in the data science and web development space.',
      status: QuestStatus.IN_PROGRESS,
      priority: QuestPriority.MEDIUM,
      tags: ['Open Source', 'Community', 'GitHub'],
      order: 3,
    },
    {
      title: 'Learn Rust Programming',
      description: 'Master Rust for systems programming and high-performance applications.',
      status: QuestStatus.IDEA,
      priority: QuestPriority.MEDIUM,
      tags: ['Rust', 'Systems Programming', 'Performance'],
      order: 4,
    },
    {
      title: 'Write a Technical Book',
      description: 'Author a comprehensive guide on building production-ready web applications with modern technologies.',
      status: QuestStatus.IDEA,
      priority: QuestPriority.LOW,
      tags: ['Writing', 'Teaching', 'Knowledge Sharing'],
      order: 5,
    },
  ];

  for (const quest of quests) {
    await prisma.quest.create({
      data: {
        profileId: profile.id,
        ...quest,
      },
    });
  }

  console.log('✅ Quests created');

  // ============================================
  // CREATE TIMELINE EVENTS
  // ============================================
  const timelineEvents = [
    {
      title: 'Started Trading Journey',
      description: 'Began learning about stock markets, technical analysis, and investment strategies.',
      date: new Date('2020-06-01'),
      type: TimelineType.PERSONAL,
      icon: 'TrendingUp',
      color: '#10B981',
      order: 1,
    },
    {
      title: 'First Programming Course',
      description: 'Completed first Python programming course and built initial projects.',
      date: new Date('2021-03-15'),
      type: TimelineType.EDUCATION,
      icon: 'Code',
      color: '#3B82F6',
      order: 2,
    },
    {
      title: 'Began AI/ML Journey',
      description: 'Started studying artificial intelligence and machine learning fundamentals.',
      date: new Date('2022-01-10'),
      type: TimelineType.EDUCATION,
      icon: 'Brain',
      color: '#8B5CF6',
      order: 3,
    },
    {
      title: 'First Freelance Project',
      description: 'Completed first paid web development project for a local business.',
      date: new Date('2023-05-20'),
      type: TimelineType.CAREER,
      icon: 'Briefcase',
      color: '#F59E0B',
      order: 4,
    },
    {
      title: 'Political Campaign Role',
      description: 'Joined political campaign as Data Analyst and Tech Consultant.',
      date: new Date('2025-01-15'),
      type: TimelineType.CAREER,
      icon: 'Users',
      color: '#EF4444',
      order: 5,
    },
    {
      title: 'Co-founded Severeon',
      description: 'Co-founded technology startup focused on innovative software solutions.',
      date: new Date('2026-01-01'),
      type: TimelineType.MILESTONE,
      icon: 'Rocket',
      color: '#EC4899',
      order: 6,
    },
  ];

  for (const event of timelineEvents) {
    await prisma.timelineEvent.create({
      data: {
        profileId: profile.id,
        ...event,
      },
    });
  }

  console.log('✅ Timeline events created');

  // ============================================
  // CREATE SITE SETTINGS
  // ============================================
  const siteSettings = [
    {
      key: 'site_name',
      value: 'Md Altamash Khan',
      category: 'general',
      description: 'Site name displayed in header and browser tab',
    },
    {
      key: 'site_description',
      value: 'Software Developer • Data Science Enthusiast • Entrepreneur',
      category: 'general',
      description: 'Short site description for SEO',
    },
    {
      key: 'maintenance_mode',
      value: false,
      category: 'system',
      description: 'Enable maintenance mode',
    },
    {
      key: 'analytics_enabled',
      value: true,
      category: 'analytics',
      description: 'Enable analytics tracking',
    },
  ];

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('✅ Site settings created');

  console.log('\n🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
