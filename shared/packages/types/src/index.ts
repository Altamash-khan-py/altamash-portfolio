// ============================================
// SHARED TYPES FOR PORTFOLIO PLATFORM
// ============================================

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  meta?: ApiMeta;
  error?: ApiError;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// ============================================
// AUTH TYPES
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserDto {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

// ============================================
// PROFILE TYPES
// ============================================

export interface ProfileDto {
  id: string;
  fullName: string;
  title: string;
  bio: string;
  location: string;
  birthDate?: string;
  quote: string;
  avatarUrl?: string;
  faviconUrl?: string;
  resumeUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  socialLinks: SocialLinkDto[];
  createdAt: string;
  updatedAt: string;
}

export interface SocialLinkDto {
  id: string;
  platform: string;
  url: string;
  order: number;
}

export interface UpdateProfileRequest {
  fullName?: string;
  title?: string;
  bio?: string;
  location?: string;
  birthDate?: string;
  quote?: string;
  avatarUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

// ============================================
// SKILL TYPES
// ============================================

export interface SkillCategoryDto {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  skills: SkillDto[];
}

export interface SkillDto {
  id: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  description?: string;
  icon?: string;
  order: number;
  categoryId: string;
}

export interface CreateSkillRequest {
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  categoryId: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface UpdateSkillRequest {
  name?: string;
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  categoryId?: string;
  description?: string;
  icon?: string;
  order?: number;
}

// ============================================
// EXPERIENCE TYPES
// ============================================

export interface ExperienceDto {
  id: string;
  company: string;
  role: string;
  description: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  order: number;
}

export interface CreateExperienceRequest {
  company: string;
  role: string;
  description: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  order?: number;
}

export interface UpdateExperienceRequest {
  company?: string;
  role?: string;
  description?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  order?: number;
}

// ============================================
// PROJECT TYPES
// ============================================

export interface ProjectDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  startDate?: string;
  endDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
  status?: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  startDate?: string;
  endDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured?: boolean;
  order?: number;
}

export interface UpdateProjectRequest {
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
  status?: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'ARCHIVED';
  startDate?: string;
  endDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured?: boolean;
  order?: number;
}

// ============================================
// BOOK TYPES
// ============================================

export interface BookDto {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
  lessons?: string;
  quotes?: string;
  rating?: number;
  readDate?: string;
  isFavorite: boolean;
  order: number;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
  lessons?: string;
  quotes?: string;
  rating?: number;
  readDate?: string;
  isFavorite?: boolean;
  order?: number;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  coverUrl?: string;
  description?: string;
  lessons?: string;
  quotes?: string;
  rating?: number;
  readDate?: string;
  isFavorite?: boolean;
  order?: number;
}

// ============================================
// QUOTE TYPES
// ============================================

export interface QuoteDto {
  id: string;
  text: string;
  author: string;
  source?: string;
  context?: string;
  isFeatured: boolean;
  order: number;
}

export interface CreateQuoteRequest {
  text: string;
  author: string;
  source?: string;
  context?: string;
  isFeatured?: boolean;
  order?: number;
}

export interface UpdateQuoteRequest {
  text?: string;
  author?: string;
  source?: string;
  context?: string;
  isFeatured?: boolean;
  order?: number;
}

// ============================================
// QUEST TYPES
// ============================================

export interface QuestDto {
  id: string;
  title: string;
  description: string;
  status: 'IDEA' | 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tags: string[];
  startDate?: string;
  targetDate?: string;
  completedAt?: string;
  order: number;
}

export interface CreateQuestRequest {
  title: string;
  description: string;
  status?: 'IDEA' | 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tags?: string[];
  startDate?: string;
  targetDate?: string;
  order?: number;
}

export interface UpdateQuestRequest {
  title?: string;
  description?: string;
  status?: 'IDEA' | 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tags?: string[];
  startDate?: string;
  targetDate?: string;
  order?: number;
}

// ============================================
// TIMELINE TYPES
// ============================================

export interface TimelineEventDto {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'PERSONAL' | 'EDUCATION' | 'CAREER' | 'PROJECT' | 'SKILL' | 'MILESTONE';
  icon?: string;
  color?: string;
  linkUrl?: string;
  linkText?: string;
  order: number;
}

export interface CreateTimelineEventRequest {
  title: string;
  description: string;
  date: string;
  type: 'PERSONAL' | 'EDUCATION' | 'CAREER' | 'PROJECT' | 'SKILL' | 'MILESTONE';
  icon?: string;
  color?: string;
  linkUrl?: string;
  linkText?: string;
  order?: number;
}

export interface UpdateTimelineEventRequest {
  title?: string;
  description?: string;
  date?: string;
  type?: 'PERSONAL' | 'EDUCATION' | 'CAREER' | 'PROJECT' | 'SKILL' | 'MILESTONE';
  icon?: string;
  color?: string;
  linkUrl?: string;
  linkText?: string;
  order?: number;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface AnalyticsOverviewDto {
  totalSkills: number;
  totalProjects: number;
  totalBooks: number;
  totalExperience: number;
  totalQuests: number;
  activeQuests: number;
  completedQuests: number;
  featuredProjects: number;
}

export interface AdminLogDto {
  id: string;
  adminId: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

// ============================================
// SEO TYPES
// ============================================

export interface SeoMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string[];
  robots?: string;
}

export interface JsonLdSchema {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

// ============================================
// PAGINATION TYPES
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================
// FILE UPLOAD TYPES
// ============================================

export interface FileUploadResponse {
  id: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
}

// ============================================
// SITE SETTINGS TYPES
// ============================================

export interface SiteSettingDto {
  id: string;
  key: string;
  value: unknown;
  category: string;
  description?: string;
}
