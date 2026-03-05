import axios from 'axios';
import type { 
  ApiResponse, 
  ProfileDto, 
  SkillCategoryDto, 
  ExperienceDto, 
  ProjectDto, 
  BookDto, 
  QuoteDto, 
  QuestDto, 
  TimelineEventDto 
} from '@portfolio/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Profile API
export const profileApi = {
  getProfile: () => api.get<ApiResponse<ProfileDto>>('/profile').then((res) => res.data.data),
};

// Skills API
export const skillsApi = {
  getSkills: () => api.get<ApiResponse<SkillCategoryDto[]>>('/skills').then((res) => res.data.data),
};

// Experience API
export const experienceApi = {
  getExperience: () => api.get<ApiResponse<ExperienceDto[]>>('/experience').then((res) => res.data.data),
};

// Projects API
export const projectsApi = {
  getProjects: () => api.get<ApiResponse<ProjectDto[]>>('/projects').then((res) => res.data.data),
};

// Books API
export const booksApi = {
  getBooks: () => api.get<ApiResponse<BookDto[]>>('/books').then((res) => res.data.data),
};

// Quotes API
export const quotesApi = {
  getQuotes: () => api.get<ApiResponse<QuoteDto[]>>('/quotes').then((res) => res.data.data),
  getFeaturedQuotes: () => api.get<ApiResponse<QuoteDto[]>>('/quotes/featured').then((res) => res.data.data),
};

// Quests API
export const questsApi = {
  getQuests: () => api.get<ApiResponse<QuestDto[]>>('/quests').then((res) => res.data.data),
};

// Timeline API
export const timelineApi = {
  getTimeline: () => api.get<ApiResponse<TimelineEventDto[]>>('/timeline').then((res) => res.data.data),
};

export default api;
