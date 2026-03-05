# System Architecture Document

## Portfolio Platform with CMS

**Version:** 1.0.0  
**Author:** Principal Software Architect  
**Date:** March 2026

---

## 1. Executive Summary

This document outlines the architecture for a production-grade personal portfolio platform with a full Content Management System (CMS). The system is designed as a small SaaS platform with clean architecture principles, supporting two main applications: a public portfolio website and an admin dashboard.

---

## 2. System Overview

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────┬───────────────────────────────────────────────┤
│   Public Portfolio Website  │         Admin Dashboard (CMS)                 │
│   (Next.js 14 + SSR)        │         (Next.js 14 + SPA)                    │
└─────────────┬───────────────┴───────────────────────┬───────────────────────┘
              │                                       │
              └───────────────┬───────────────────────┘
                              │ HTTPS/JSON
┌─────────────────────────────▼───────────────────────────────┐
│                      API GATEWAY                             │
│              (Nginx - Reverse Proxy + Rate Limit)            │
└─────────────────────────────┬───────────────────────────────┘
                              │
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

### 2.2 Monorepo Structure

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

---

## 3. Clean Architecture Layers

### 3.1 Layer Responsibilities

```
┌─────────────────────────────────────────┐
│      PRESENTATION LAYER                 │
│  - Controllers, Middleware, Guards      │
│  - HTTP request/response handling       │
│  - No business logic                    │
├─────────────────────────────────────────┤
│      APPLICATION LAYER                  │
│  - Services, Use Cases                  │
│  - DTOs, Validation                     │
│  - Orchestration logic                  │
├─────────────────────────────────────────┤
│      DOMAIN LAYER                       │
│  - Entities, Value Objects              │
│  - Domain Services                      │
│  - Business rules                       │
├─────────────────────────────────────────┤
│      INFRASTRUCTURE LAYER               │
│  - Repositories (Prisma)                │
│  - External services                    │
│  - Database access                      │
└─────────────────────────────────────────┘
```

### 3.2 Dependency Rule

Dependencies flow inward:
- Infrastructure → Domain → Application → Presentation
- Inner layers know nothing about outer layers
- Dependency Injection used throughout

---

## 4. Database Architecture

### 4.1 Entity Relationship Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     users       │     │    profiles     │     │  social_links   │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │◄────│ user_id (FK)    │     │ id (PK)         │
│ email           │     │ full_name       │     │ profile_id (FK) │
│ password_hash   │     │ title           │     │ platform        │
│ role            │     │ bio             │     │ url             │
│ created_at      │     │ location        │     │ created_at      │
│ updated_at      │     │ birth_date      │     └─────────────────┘
└─────────────────┘     │ quote           │
                        │ avatar_url      │
                        └─────────────────┘
                                │
                                │
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ skill_categories│◄────│     skills      │     │   experience    │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ name            │     │ category_id(FK) │     │ profile_id (FK) │
│ description     │     │ name            │     │ company         │
│ order           │     │ level           │     │ role            │
│ created_at      │     │ description     │     │ description     │
└─────────────────┘     │ icon            │     │ start_date      │
                        │ order           │     │ end_date        │
                        └─────────────────┘     │ is_current      │
                                                │ created_at      │
                                                └─────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     books       │     │    projects     │     │     quotes      │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ profile_id (FK) │     │ profile_id (FK) │     │ profile_id (FK) │
│ title           │     │ title           │     │ text            │
│ author          │     │ description     │     │ author          │
│ cover_url       │     │ thumbnail_url   │     │ source          │
│ lessons         │     │ github_url      │     │ is_featured     │
│ rating          │     │ live_url        │     │ created_at      │
│ read_date       │     │ tags            │     └─────────────────┘
│ created_at      │     │ status          │
└─────────────────┘     │ start_date      │
                        │ end_date        │
                        └─────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     quests      │     │ timeline_events │     │   admin_logs    │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ profile_id (FK) │     │ profile_id (FK) │     │ admin_id (FK)   │
│ title           │     │ title           │     │ action          │
│ description     │     │ description     │     │ entity_type     │
│ status          │     │ date            │     │ entity_id       │
│ priority        │     │ type            │     │ details         │
│ tags            │     │ icon            │     │ ip_address      │
│ created_at      │     │ created_at      │     │ created_at      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 4.2 Indexing Strategy

| Table | Index | Purpose |
|-------|-------|---------|
| users | email (unique) | Fast login lookup |
| skills | category_id + order | Sorted category fetch |
| experience | profile_id + start_date | Chronological order |
| projects | profile_id + status | Filtered project lists |
| timeline_events | profile_id + date | Chronological timeline |
| admin_logs | created_at | Recent activity queries |

---

## 5. API Architecture

### 5.1 REST API Design

```
Base URL: /api/v1

AUTHENTICATION
├── POST   /auth/login
├── POST   /auth/refresh
├── POST   /auth/logout
└── GET    /auth/me

PROFILE
├── GET    /profile
└── PUT    /profile

SKILLS
├── GET    /skills
├── GET    /skills/:id
├── POST   /skills
├── PATCH  /skills/:id
└── DELETE /skills/:id

EXPERIENCE
├── GET    /experience
├── GET    /experience/:id
├── POST   /experience
├── PATCH  /experience/:id
└── DELETE /experience/:id

PROJECTS
├── GET    /projects
├── GET    /projects/:id
├── GET    /projects/:slug
├── POST   /projects
├── PATCH  /projects/:id
└── DELETE /projects/:id

BOOKS
├── GET    /books
├── GET    /books/:id
├── POST   /books
├── PATCH  /books/:id
└── DELETE /books/:id

QUOTES
├── GET    /quotes
├── GET    /quotes/featured
├── POST   /quotes
├── PATCH  /quotes/:id
└── DELETE /quotes/:id

QUESTS
├── GET    /quests
├── GET    /quests/:id
├── POST   /quests
├── PATCH  /quests/:id
└── DELETE /quests/:id

TIMELINE
├── GET    /timeline
├── POST   /timeline
├── PATCH  /timeline/:id
└── DELETE /timeline/:id

ANALYTICS (Admin only)
├── GET    /analytics/overview
├── GET    /analytics/activity
└── GET    /admin/logs

MEDIA
├── POST   /media/upload
└── DELETE /media/:id
```

### 5.2 Response Format

```typescript
// Standard Response
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [ ... ]
  }
}
```

---

## 6. Security Architecture

### 6.1 Authentication Flow

```
┌─────────┐                    ┌─────────┐                    ┌─────────┐
│ Client  │                    │  API    │                    │  DB     │
└────┬────┘                    └────┬────┘                    └────┬────┘
     │                              │                              │
     │ POST /auth/login             │                              │
     │ {email, password}            │                              │
     │─────────────────────────────▶│                              │
     │                              │                              │
     │                              │ Verify credentials           │
     │                              │─────────────────────────────▶│
     │                              │◀─────────────────────────────│
     │                              │                              │
     │                              │ Generate tokens              │
     │                              │ (Access + Refresh)           │
     │                              │                              │
     │  {accessToken, refreshToken} │                              │
     │◀─────────────────────────────│                              │
     │                              │                              │
     │ Store refresh token (httpOnly│                              │
     │ cookie)                      │                              │
     │                              │                              │
```

### 6.2 Security Layers

```
┌─────────────────────────────────────────┐
│  1. Network Layer                       │
│     - HTTPS only                        │
│     - Nginx rate limiting               │
│     - IP blocking                       │
├─────────────────────────────────────────┤
│  2. Application Layer                   │
│     - Helmet security headers           │
│     - CORS configuration                │
│     - Request validation                │
├─────────────────────────────────────────┤
│  3. Authentication Layer                │
│     - JWT with short expiry             │
│     - Refresh token rotation            │
│     - Role-based access control         │
├─────────────────────────────────────────┤
│  4. Data Layer                          │
│     - Password hashing (bcrypt)         │
│     - SQL injection prevention          │
│     - Input sanitization                │
└─────────────────────────────────────────┘
```

---

## 7. Caching Strategy

### 7.1 Redis Cache Layers

```
┌─────────────────────────────────────────┐
│         CACHE HIERARCHY                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐    ┌─────────────┐    │
│  │   L1 Cache  │    │   L2 Cache  │    │
│  │  (In-Memory)│    │   (Redis)   │    │
│  │   5 min TTL │    │   15 min TTL│    │
│  └──────┬──────┘    └──────┬──────┘    │
│         │                  │           │
│         └────────┬─────────┘           │
│                  │                     │
│         ┌────────▼─────────┐           │
│         │   Database       │           │
│         └──────────────────┘           │
│                                         │
├─────────────────────────────────────────┤
│  Cache Keys:                            │
│  - profile:public                       │
│  - skills:list                          │
│  - projects:list                        │
│  - experience:list                      │
│  - books:list                           │
│  - timeline:list                        │
└─────────────────────────────────────────┘
```

### 7.2 Cache Invalidation

| Event | Action |
|-------|--------|
| Content create | Invalidate list caches |
| Content update | Invalidate specific + list caches |
| Content delete | Invalidate all related caches |
| Admin action | Clear all caches |

---

## 8. SEO Architecture

### 8.1 Metadata Generation

```
┌─────────────────────────────────────────┐
│      SEO SYSTEM ARCHITECTURE            │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐    ┌─────────────┐    │
│  │   CMS SEO   │    │   Next.js   │    │
│  │   Fields    │───▶│   Metadata  │    │
│  │             │    │   API       │    │
│  └─────────────┘    └──────┬──────┘    │
│                            │           │
│                            ▼           │
│  ┌─────────────────────────────────┐   │
│  │      Generated Metadata         │   │
│  │  - title                        │   │
│  │  - description                  │   │
│  │  - canonical                    │   │
│  │  - OpenGraph                    │   │
│  │  - Twitter Cards                │   │
│  │  - JSON-LD Schema               │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### 8.2 Structured Data Types

| Page | Schema Type |
|------|-------------|
| Home | Person, WebSite |
| Projects | SoftwareSourceCode |
| Books | Article |
| Skills | ItemList |
| Experience | ProfilePage |

---

## 9. Frontend Architecture

### 9.1 Component Hierarchy

```
┌─────────────────────────────────────────┐
│           PAGE LAYOUT                   │
├─────────────────────────────────────────┤
│  RootLayout                             │
│  ├── MetadataProvider                   │
│  ├── ThemeProvider                      │
│  └── QueryProvider                      │
│       └── PageLayout                    │
│            ├── Navigation               │
│            ├── Main Content             │
│            │    └── Section Components   │
│            └── Footer                   │
└─────────────────────────────────────────┘
```

### 9.2 State Management

```
┌─────────────────────────────────────────┐
│         STATE ARCHITECTURE              │
├─────────────────────────────────────────┤
│                                         │
│  Server State (TanStack Query)          │
│  ├── Profile data                       │
│  ├── Skills list                        │
│  ├── Projects                           │
│  └── All CMS content                    │
│                                         │
│  Client State (Zustand)                 │
│  ├── Theme (dark/light)                 │
│  ├── Navigation state                   │
│  └── UI preferences                     │
│                                         │
│  URL State                              │
│  ├── Active section                     │
│  └── Filter parameters                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 10. Admin Dashboard Architecture

### 10.1 Module Structure

```
┌─────────────────────────────────────────┐
│        ADMIN DASHBOARD                  │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Sidebar │ │  Main   │ │ Context │   │
│  │   Nav   │ │ Content │ │  Panel  │   │
│  └────┬────┘ └────┬────┘ └────┬────┘   │
│       │           │           │         │
│       └───────────┼───────────┘         │
│                   │                     │
│                   ▼                     │
│  ┌─────────────────────────────────┐   │
│  │        Feature Modules          │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐       │   │
│  │  │Dashboard│ │Content│ │Media │       │   │
│  │  └─────┘ └─────┘ └─────┘       │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐       │   │
│  │  │Analytics│ │Settings│ │Logs │       │   │
│  │  └─────┘ └─────┘ └─────┘       │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 11. Deployment Architecture

### 11.1 Docker Architecture

```
┌─────────────────────────────────────────┐
│         DOCKER COMPOSE STACK            │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │  Nginx  │  │Portfolio│  │  Admin  │ │
│  │ (Proxy) │  │  Web    │  │ Dashboard│ │
│  │  :80    │  │  :3000  │  │  :3001  │ │
│  └────┬────┘  └─────────┘  └─────────┘ │
│       │                                 │
│       │  ┌─────────┐  ┌─────────┐      │
│       └──┤   API   │  │  Redis  │      │
│          │ Server  │  │  :6379  │      │
│          │  :4000  │  └─────────┘      │
│          └────┬────┘                   │
│               │                        │
│          ┌────┴────┐                   │
│          │PostgreSQL│                   │
│          │  :5432  │                   │
│          └─────────┘                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 12. Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse SEO Score | > 95 |
| API Response Time (p95) | < 200ms |
| Database Query Time (p95) | < 50ms |

---

## 13. Technology Decisions

| Decision | Rationale |
|----------|-----------|
| NestJS | Clean architecture support, DI, enterprise patterns |
| Next.js 14 | SSR for SEO, App Router, React Server Components |
| Prisma | Type-safe ORM, migration system, excellent DX |
| PostgreSQL | ACID compliance, JSON support, full-text search |
| Redis | Fast caching, session storage, pub/sub |
| TanStack Query | Server state management, caching, optimistic updates |
| Zustand | Lightweight client state management |
| TailwindCSS | Utility-first, design system consistency |
| Shadcn UI | Accessible, customizable component primitives |

---

## 14. Scalability Considerations

### 14.1 Horizontal Scaling Path

```
Phase 1: Single Instance
├── All services on one server
└── Docker Compose orchestration

Phase 2: Separate Services
├── Frontend on CDN/Vercel
├── API on application server
└── Database on managed service

Phase 3: Microservices (Future)
├── API Gateway
├── Auth Service
├── Content Service
├── Media Service
└── Analytics Service
```

---

## 15. Monitoring & Observability

### 15.1 Logging Strategy

| Layer | Log Type | Destination |
|-------|----------|-------------|
| Application | Structured JSON | stdout → aggregator |
| Database | Query logs | PostgreSQL logs |
| Access | HTTP requests | Nginx access logs |
| Security | Auth events | Security log stream |

---

*End of Architecture Document*
