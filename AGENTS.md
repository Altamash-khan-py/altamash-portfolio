# Portfolio Platform - Agent Guide

This document provides essential information for AI coding agents working on the Portfolio Platform project.

---

## Project Overview

The Portfolio Platform is a production-grade personal portfolio website with a full Content Management System (CMS). It consists of three main applications organized into frontend, backend, and shared packages.

### Author
- **Name**: Md Altamash Khan
- **Role**: Software Developer & Data Science Enthusiast
- **Location**: Bhagalpur, Bihar, India

### Hosting
- **Frontend**: Vercel (https://vercel.com)
- **Backend**: Render (https://render.com)
- **Database**: Render PostgreSQL or Supabase

---

## Technology Stack

### Core Technologies
| Layer | Technology | Version |
|-------|------------|---------|
| Frontend Framework | Next.js | 14.1.0 |
| Backend Framework | NestJS | 10.3.0 |
| Language | TypeScript | 5.3.3 |
| Database | PostgreSQL | 16 |
| ORM | Prisma | 5.8.1 |
| Cache | Redis | 7 (optional) |
| Styling | TailwindCSS | 3.4.1 |
| Animation | Framer Motion | 11.0.3 |
| State Management | TanStack Query | 5.17.19 |
| Monorepo Tool | Turborepo | 1.12.0 |
| Node.js | | >= 20.0.0 |
| Package Manager | npm | >= 10.0.0 |

### Key Dependencies
- **Backend**: `@nestjs/common`, `@nestjs/core`, `@prisma/client`, `passport-jwt`, `bcrypt`, `helmet`, `compression`, `class-validator`, `ioredis`
- **Frontend**: `react`, `react-dom`, `axios`, `lucide-react`, `zustand`, `date-fns`, `tailwind-merge`, `clsx`
- **Admin Dashboard**: Additional `@tanstack/react-table`, `recharts`

---

## Project Structure

```
portfolio-platform/
├── frontend/                   # Frontend applications
│   ├── apps/
│   │   ├── admin-dashboard/   # CMS Admin (Next.js 14, port 3001)
│   │   │   ├── src/
│   │   │   │   ├── app/      # Next.js App Router
│   │   │   │   ├── components/# UI Components
│   │   │   │   └── services/ # API services
│   │   │   ├── package.json
│   │   │   ├── next.config.js
│   │   │   └── tailwind.config.ts
│   │   └── portfolio-web/     # Public portfolio (Next.js 14, port 3000)
│   │       ├── src/
│   │       │   ├── app/      # Next.js App Router
│   │       │   ├── components/# UI Components
│   │       │   ├── sections/ # Page sections (hero, skills, etc.)
│   │       │   ├── hooks/    # Custom React hooks
│   │       │   └── services/ # API services
│   │       ├── package.json
│   │       ├── next.config.js
│   │       └── tailwind.config.ts
│   ├── package.json           # Frontend workspace config
│   └── turbo.json             # Frontend turbo config
├── backend/                    # Backend applications
│   ├── apps/
│   │   └── api-server/        # Backend API (NestJS, port 4000)
│   │       ├── src/
│   │       │   ├── auth/      # JWT Authentication
│   │       │   ├── profile/   # Profile management
│   │       │   ├── skills/    # Skills CRUD
│   │       │   ├── experience/# Experience CRUD
│   │       │   ├── projects/  # Projects CRUD
│   │       │   ├── books/     # Books CRUD
│   │       │   ├── quotes/    # Quotes CRUD
│   │       │   ├── quests/    # Quests CRUD
│   │       │   ├── timeline/  # Timeline CRUD
│   │       │   ├── analytics/ # Analytics & logs
│   │       │   ├── media/     # File uploads
│   │       │   ├── config/    # Configuration
│   │       │   └── main.ts    # Application entry
│   │       ├── package.json
│   │       └── tsconfig.json
│   ├── package.json           # Backend workspace config
│   └── turbo.json             # Backend turbo config
├── shared/                     # Shared packages
│   ├── packages/
│   │   ├── database/          # Prisma schema and client
│   │   │   ├── prisma/
│   │   │   │   ├── schema.prisma  # Database schema (13 tables)
│   │   │   │   └── seed.ts        # Database seeding
│   │   │   └── src/
│   │   ├── types/             # Shared TypeScript types
│   │   │   └── src/index.ts   # DTOs, request/response types
│   │   └── utils/             # Shared utilities
│   │       └── src/           # date, string, validation, api
│   ├── package.json           # Shared workspace config
│   └── turbo.json             # Shared turbo config
├── docs/                      # Documentation
│   └── ARCHITECTURE.md
├── package.json               # Root package.json (workspaces)
├── turbo.json                 # Root Turborepo configuration
└── .env.example               # Environment variables template
```

---

## Build and Development Commands

### Root Level Commands (from project root)
```bash
# Install dependencies for all workspaces
npm install

# Development - Start all apps in parallel
npm run dev

# Build all applications
npm run build

# Run linting across all packages
npm run lint

# Run tests across all packages
npm run test

# Type checking across all packages
npm run type-check

# Clean all build artifacts
npm run clean

# Database commands
npm run db:migrate      # Run migrations
npm run db:generate     # Generate Prisma client
npm run db:seed         # Seed database
npm run db:studio       # Open Prisma Studio
```

### Frontend Commands (`frontend/`)
```bash
cd frontend
npm run dev             # Start all frontend apps
npm run build           # Build all frontend apps
npm run lint            # Lint all frontend apps
npm run type-check      # TypeScript check
```

### Backend Commands (`backend/`)
```bash
cd backend
npm run dev             # Start backend with watch mode
npm run build           # Build backend
npm run test            # Run tests
npm run type-check      # TypeScript check
```

### Individual App Commands

#### API Server (`backend/apps/api-server`)
```bash
cd backend/apps/api-server
npm run dev             # Development with watch mode
npm run build           # Production build
npm run start:prod      # Start production server
npm run test            # Unit tests
npm run test:e2e        # End-to-end tests
npm run test:cov        # Test coverage
npm run lint            # ESLint
npm run type-check      # TypeScript check
```

#### Portfolio Web (`frontend/apps/portfolio-web`)
```bash
cd frontend/apps/portfolio-web
npm run dev             # Development server (port 3000)
npm run build           # Production build
npm run start           # Start production server
npm run lint            # ESLint
npm run type-check      # TypeScript check
```

#### Admin Dashboard (`frontend/apps/admin-dashboard`)
```bash
cd frontend/apps/admin-dashboard
npm run dev             # Development server (port 3001)
npm run build           # Production build
npm run start           # Start production server
npm run lint            # ESLint
npm run type-check      # TypeScript check
```

---

## Environment Configuration

Create a `.env` file in the project root by copying from `.env.example`:

```bash
cp .env.example .env
```

### Required Environment Variables

```env
# Node Environment
NODE_ENV=development

# Database (PostgreSQL)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=portfolio
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}

# Redis (optional for local dev)
REDIS_URL=redis://localhost:6379
REDIS_TTL=900

# JWT Secrets (use strong random strings in production)
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=7d

# API Server
PORT=4000
API_PREFIX=/api/v1

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# File Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Analytics
ANALYTICS_ENABLED=true
```

---

## Development Setup

### Prerequisites
- Node.js 20+ 
- PostgreSQL (local or cloud)
- Redis (optional for local dev)

### Manual Setup
```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# 3. Generate Prisma client
cd shared/packages/database && npx prisma generate

# 4. Run database migrations
npx prisma migrate dev --schema=shared/packages/database/prisma/schema.prisma

# 5. Seed database
cd shared/packages/database && npx prisma db seed

# 6. Start all services
npm run dev
```

### Access Points After Setup
- **Portfolio Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **API Server**: http://localhost:4000/api/v1
- **Prisma Studio**: Run `npm run db:studio` → http://localhost:5555

### Default Admin Credentials
- **Email**: altamash@portfolio.com
- **Password**: admin123
- ⚠️ Change these in production!

---

## Deployment Guide

### Frontend (Vercel)

1. **Create Vercel Account**: Sign up at https://vercel.com

2. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

3. **Deploy from GitHub**:
   - Connect your GitHub repository to Vercel
   - Set root directory to `frontend/apps/portfolio-web` for portfolio
   - Set root directory to `frontend/apps/admin-dashboard` for admin
   - Vercel will auto-detect Next.js

4. **Environment Variables on Vercel**:
   ```
   NEXT_PUBLIC_API_URL=https://your-render-api-url.com/api/v1
   ```

5. **Build Settings**:
   - Build Command: `cd ../../.. && npm install && npm run build`
   - Output Directory: `.next`

### Backend (Render)

1. **Create Render Account**: Sign up at https://render.com

2. **Create Web Service**:
   - Connect your GitHub repository
   - Set root directory: `backend/apps/api-server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

3. **Environment Variables on Render**:
   ```
   NODE_ENV=production
   PORT=4000
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   CORS_ORIGIN=https://your-vercel-domain.vercel.app
   ```

4. **Database Setup**:
   - Create PostgreSQL database on Render
   - Run migrations after deployment:
     ```bash
     npx prisma migrate deploy --schema=shared/packages/database/prisma/schema.prisma
     ```

### Database Options

**Option 1: Render PostgreSQL**
- Create Managed PostgreSQL on Render
- Copy connection string to environment variables

**Option 2: Supabase**
- Create project at https://supabase.com
- Copy connection string from Settings → Database

**Option 3: Local PostgreSQL**
- Install PostgreSQL locally
- Use `localhost:5432` connection

---

## Code Style Guidelines

### TypeScript Conventions

#### Naming Conventions
- **Files**: kebab-case (e.g., `skills.service.ts`, `hero-section.tsx`)
- **Classes**: PascalCase (e.g., `SkillsService`, `HeroSection`)
- **Interfaces/Types**: PascalCase with descriptive names (e.g., `SkillDto`, `CreateSkillRequest`)
- **Enums**: PascalCase (e.g., `SkillLevel`, `UserRole`)
- **Variables/Functions**: camelCase (e.g., `getSkills`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE for true constants

#### Import Order
```typescript
// 1. External dependencies
import { Injectable } from '@nestjs/common';
import { motion } from 'framer-motion';

// 2. Internal shared packages
import { prisma } from '@portfolio/database';
import { SkillDto } from '@portfolio/types';
import { formatDate } from '@portfolio/utils';

// 3. Internal app imports (use path aliases)
import { useProfile } from '@/hooks/use-profile';
import { Navigation } from '@/components/layout/navigation';
```

#### TypeScript Strictness
- Enable `strict: true` in frontend apps
- Backend uses relaxed null checks (`strictNullChecks: false`)
- Always define return types for public methods
- Use `interface` for object shapes, `type` for unions/complex types

### Backend (NestJS) Patterns

#### Module Structure
Each feature module follows this structure:
```
src/feature-name/
├── feature-name.module.ts
├── feature-name.controller.ts
├── feature-name.service.ts
├── dto/
│   └── index.ts
└── [guards/decorators if needed]
```

#### Service Pattern
```typescript
@Injectable()
export class SkillsService {
  async getSkills(): Promise<SkillCategoryDto[]> {
    // Implementation
  }

  private mapToDto(entity: any): DtoType {
    // Mapping logic
  }
}
```

#### Controller Pattern
```typescript
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async getSkills(): Promise<ApiResponse<SkillCategoryDto[]>> {
    const data = await this.skillsService.getSkills();
    return { success: true, data };
  }
}
```

### Frontend (Next.js) Patterns

#### Component Structure
- Use Server Components by default
- Mark Client Components with `'use client'` when using hooks/browser APIs
- Place reusable components in `components/`
- Place page-specific sections in `sections/`

#### React Hooks Pattern
```typescript
// Custom hooks for data fetching
export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: skillsApi.getSkills,
  });
}
```

#### Styling with TailwindCSS
- Use CSS variables for theming (defined in `globals.css`)
- Follow the existing color scheme:
  - Background: `#0a0a0a`
  - Card: `#171717`
  - Border: `#404040`
  - Primary: `#3b82f6`
  - Text: `#fafafa`
  - Muted: `#a3a3a3`

---

## Testing Strategy

### Backend Testing
```bash
cd backend/apps/api-server

# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

### Test File Naming
- Unit tests: `*.spec.ts`
- E2E tests: `*.e2e-spec.ts`

### Frontend Testing
- Place tests alongside components: `ComponentName.test.tsx`
- Use Jest + React Testing Library

---

## API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

### Authentication
Uses JWT Bearer tokens:
```
Authorization: Bearer <access_token>
```

### Public Endpoints (No Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get public profile |
| GET | `/skills` | Get all skills |
| GET | `/experience` | Get experience |
| GET | `/projects` | Get projects |
| GET | `/books` | Get books |
| GET | `/quotes` | Get quotes |
| GET | `/quotes/featured` | Get featured quotes |
| GET | `/quests` | Get quests |
| GET | `/timeline` | Get timeline events |
| POST | `/auth/login` | Login |
| POST | `/auth/refresh` | Refresh token |

### Protected Endpoints (Admin Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST/PATCH/DELETE | All content endpoints | Content management |
| GET | `/analytics/overview` | Analytics overview |
| GET | `/analytics/activity` | Activity logs |
| POST | `/media/upload` | File upload |

### Response Format
```typescript
{
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}
```

---

## Database Schema

### Tables (13 total)

#### Core Tables
- `users` - Authentication & roles
- `profiles` - Personal information
- `social_links` - Social media links

#### Content Tables
- `skills` - Technical skills
- `skill_categories` - Skill groupings
- `experience` - Work history
- `projects` - Portfolio projects
- `books` - Reading list
- `quotes` - Favorite quotes
- `quests` - Learning goals/ideas
- `timeline_events` - Life milestones

#### System Tables
- `refresh_tokens` - JWT refresh tokens
- `admin_logs` - Admin activity tracking
- `site_settings` - Site configuration

### Running Migrations
```bash
# Development
npm run db:migrate

# Production
cd shared/packages/database && npx prisma migrate deploy
```

### Seeding Data
```bash
npm run db:seed
```

---

## Security Considerations

### Implemented Security Features
- JWT authentication with short-lived access tokens (15 min)
- Refresh token rotation (7 days)
- bcrypt password hashing
- Input validation with class-validator
- Rate limiting (10 req/s short, 100 req/min long)
- Helmet security headers
- CORS configuration
- Role-based access control (RBAC)
- SQL injection prevention via Prisma ORM

### Security Best Practices
- Never commit `.env` files
- Use strong JWT secrets in production
- Rotate secrets regularly
- Validate all user inputs
- Sanitize file uploads
- Use parameterized queries (Prisma handles this)

---

## Common Issues and Solutions

### Prisma Client Not Generated
```bash
cd shared/packages/database && npx prisma generate
```

### Database Connection Issues
Ensure PostgreSQL is running and credentials are correct in `.env`.

### Port Already in Use
Check and kill processes:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

---

## Architecture Decisions

### Clean Architecture
The backend follows Clean Architecture with 4 layers:
1. **Presentation Layer**: Controllers, Middleware, Guards
2. **Application Layer**: Services, DTOs, Use Cases
3. **Domain Layer**: Entities, Business Rules
4. **Infrastructure Layer**: Repositories (Prisma), External Services

### Monorepo Organization
- Turborepo for task orchestration
- Workspace packages for shared code
- Independent versioning per app
- Clear separation: `frontend/`, `backend/`, `shared/`

### Caching Strategy
- Redis for API response caching (optional)
- 15-minute TTL for content
- Cache invalidation on updates

---

## File Templates

### New NestJS Module
```typescript
// feature.module.ts
import { Module } from '@nestjs/common';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}

// feature.controller.ts
import { Controller, Get } from '@nestjs/common';
import { FeatureService } from './feature.service';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get()
  async getAll() {
    return this.featureService.getAll();
  }
}

// feature.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeatureService {
  async getAll() {
    // Implementation
  }
}
```

### New React Section Component
```typescript
'use client';

import { motion } from 'framer-motion';

export function NewSection() {
  return (
    <section id="section" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Content */}
      </motion.div>
    </section>
  );
}
```

---

## Path Aliases Reference

### Frontend Apps
- `@/*` → `./src/*`
- `@portfolio/types` → `../../../shared/packages/types/src`
- `@portfolio/utils` → `../../../shared/packages/utils/src`

### Backend Apps
- `@portfolio/database` → `../../../shared/packages/database/src`
- `@portfolio/types` → `../../../shared/packages/types/src`
- `@portfolio/utils` → `../../../shared/packages/utils/src`

---

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)

---

## Support

For questions or issues:
1. Check existing documentation in `/docs` folder
2. Review `README.md` and `PROJECT_SUMMARY.md`
3. Check the code comments and inline documentation
