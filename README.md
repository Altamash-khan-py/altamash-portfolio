# Portfolio Platform

A production-grade personal portfolio platform with a full Content Management System (CMS). Built with modern technologies and clean architecture principles.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Overview

This platform consists of two main applications:

1. **Public Portfolio Website** - A sleek, modern portfolio showcasing skills, experience, projects, and more
2. **Admin Dashboard (CMS)** - A powerful content management system for managing all portfolio data

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────┬───────────────────────────────────┤
│   Public Portfolio Website  │         Admin Dashboard (CMS)     │
│   (Next.js 14 + SSR)        │         (Next.js 14 + SPA)        │
└─────────────┬───────────────┴───────────────────────┬───────────┘
              │                                       │
              └───────────────┬───────────────────────┘
                              │ HTTPS/JSON
┌─────────────────────────────▼───────────────────────────────┐
│                    APPLICATION LAYER                         │
│                  (NestJS - REST API)                         │
├─────────────────────────────────────────────────────────────┤
│  Auth Module  │  Content Modules  │  Analytics  │  Media    │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                     DOMAIN LAYER                             │
│         (Services, DTOs, Validators, Business Logic)         │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                  INFRASTRUCTURE LAYER                        │
├─────────────────────────────┬───────────────────────────────┤
│   Repository Pattern        │   External Services           │
│   (Prisma ORM)              │   (Redis, Storage)            │
└─────────────┬───────────────┴───────────────┬───────────────┘
              │                               │
┌─────────────▼───────────────┐  ┌─────────────▼───────────────┐
│      DATA LAYER            │  │       CACHE LAYER           │
│   (PostgreSQL)             │  │       (Redis)               │
└────────────────────────────┘  └─────────────────────────────┘
```

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR/SSG
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animations
- **TanStack Query** - Server state management
- **Zustand** - Client state management

### Backend
- **NestJS** - Enterprise Node.js framework
- **TypeScript** - Type-safe development
- **Prisma** - Modern ORM
- **PostgreSQL** - Relational database
- **Redis** - Caching and sessions
- **JWT** - Authentication

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancer

## 📁 Project Structure

```
portfolio-platform/
├── apps/
│   ├── portfolio-web/          # Public portfolio (Next.js 14)
│   ├── admin-dashboard/        # Admin CMS (Next.js 14)
│   └── api-server/             # Backend API (NestJS)
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── database/               # Prisma schema + client
│   ├── types/                  # Shared TypeScript types
│   ├── utils/                  # Shared utilities
│   └── config/                 # Shared configuration
├── infrastructure/
│   ├── docker/                 # Docker configurations
│   ├── nginx/                  # Nginx configs
│   └── scripts/                # Deployment scripts
└── docs/                       # Documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (if running locally)
- Redis (if running locally)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/altamashkhan/portfolio-platform.git
   cd portfolio-platform
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run setup script**
   ```bash
   chmod +x infrastructure/scripts/setup.sh
   ./infrastructure/scripts/setup.sh
   ```

4. **Access the applications**
   - Portfolio Website: http://localhost:3000
   - Admin Dashboard: http://localhost:3001
   - API Server: http://localhost:4000/api/v1

### Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Generate Prisma client**
   ```bash
   cd packages/database && npx prisma generate
   ```

3. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Seed the database**
   ```bash
   cd packages/database && npx prisma db seed
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: API Server
   cd apps/api-server && npm run dev
   
   # Terminal 2: Portfolio Web
   cd apps/portfolio-web && npm run dev
   
   # Terminal 3: Admin Dashboard
   cd apps/admin-dashboard && npm run dev
   ```

## 📚 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Logout user |
| GET | `/api/v1/auth/me` | Get current user |

### Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/profile` | Get public profile |
| PUT | `/api/v1/profile` | Update profile |

### Skills

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/skills` | Get all skills |
| GET | `/api/v1/skills/:id` | Get skill by ID |
| POST | `/api/v1/skills` | Create skill |
| PATCH | `/api/v1/skills/:id` | Update skill |
| DELETE | `/api/v1/skills/:id` | Delete skill |

### Experience

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/experience` | Get all experience |
| POST | `/api/v1/experience` | Create experience |
| PATCH | `/api/v1/experience/:id` | Update experience |
| DELETE | `/api/v1/experience/:id` | Delete experience |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects` | Get all projects |
| GET | `/api/v1/projects/:id` | Get project by ID |
| POST | `/api/v1/projects` | Create project |
| PATCH | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/books` | Get all books |
| POST | `/api/v1/books` | Create book |
| PATCH | `/api/v1/books/:id` | Update book |
| DELETE | `/api/v1/books/:id` | Delete book |

### Quotes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/quotes` | Get all quotes |
| GET | `/api/v1/quotes/featured` | Get featured quotes |
| POST | `/api/v1/quotes` | Create quote |
| PATCH | `/api/v1/quotes/:id` | Update quote |
| DELETE | `/api/v1/quotes/:id` | Delete quote |

### Quests

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/quests` | Get all quests |
| POST | `/api/v1/quests` | Create quest |
| PATCH | `/api/v1/quests/:id` | Update quest |
| DELETE | `/api/v1/quests/:id` | Delete quest |

### Timeline

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/timeline` | Get all timeline events |
| POST | `/api/v1/timeline` | Create timeline event |
| PATCH | `/api/v1/timeline/:id` | Update timeline event |
| DELETE | `/api/v1/timeline/:id` | Delete timeline event |

### Analytics (Admin only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/overview` | Get analytics overview |
| GET | `/api/v1/analytics/activity` | Get recent activity |

## 🔐 Security Features

- JWT Authentication with refresh tokens
- Role-based access control (RBAC)
- Rate limiting
- Helmet security headers
- Input validation with class-validator
- Password hashing with bcrypt
- SQL injection prevention via Prisma
- CORS configuration

## 🎨 Design Philosophy

- **Minimalist** - Clean, uncluttered interfaces
- **Developer Aesthetic** - Code-focused, technical elegance
- **Typography Focused** - Beautiful typography as a design element
- **Dark Mode Default** - Easy on the eyes, professional look
- **Subtle Motion** - Purposeful animations that enhance UX

Inspired by: Stripe Docs, Vercel.com, Linear.app, Raycast.com

## 🚢 Deployment

### Using Docker Compose

```bash
cd infrastructure/docker
docker-compose up -d
```

### Using Deployment Script

```bash
chmod +x infrastructure/scripts/deploy.sh
./infrastructure.sh production
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | Yes |
| `CORS_ORIGIN` | Allowed CORS origins | No |

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse SEO Score | > 95 |
| API Response Time (p95) | < 200ms |

## 🧪 Testing

```bash
# Run all tests
npm test

# Run API tests
cd apps/api-server && npm test

# Run e2e tests
cd apps/api-server && npm run test:e2e
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Md Altamash Khan**
- Software Developer • Data Science Enthusiast • Entrepreneur
- Location: Bhagalpur, Bihar, India
- Quote: "Building intelligent systems through mathematics, code, and real-world problem solving."

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The backend framework
- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - The ORM
- [TailwindCSS](https://tailwindcss.com/) - The CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component inspiration

---

<p align="center">
  Built with ❤️ by Md Altamash Khan
</p>
