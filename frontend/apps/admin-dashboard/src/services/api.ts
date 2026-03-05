import axios from 'axios';
import type { 
  ApiResponse, 
  AnalyticsOverviewDto, 
  AdminLogDto,
  ProfileDto,
  SkillDto,
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

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Analytics API
export const analyticsApi = {
  getOverview: () => api.get<ApiResponse<AnalyticsOverviewDto>>('/analytics/overview').then((res) => res.data.data),
  getActivity: (limit?: number) => 
    api.get<ApiResponse<AdminLogDto[]>>(`/analytics/activity?limit=${limit || 10}`).then((res) => res.data.data),
};

// Profile API
export const profileApi = {
  getProfile: () => api.get<ApiResponse<ProfileDto>>('/profile').then((res) => res.data.data),
  updateProfile: (data: Partial<ProfileDto>) => api.put<ApiResponse<ProfileDto>>('/profile', data).then((res) => res.data.data),
};

// Skills API
export const skillsApi = {
  getSkills: () => api.get<ApiResponse<SkillDto[]>>('/skills').then((res) => res.data.data),
  createSkill: (data: Partial<SkillDto>) => api.post<ApiResponse<SkillDto>>('/skills', data).then((res) => res.data.data),
  updateSkill: (id: string, data: Partial<SkillDto>) => api.patch<ApiResponse<SkillDto>>(`/skills/${id}`, data).then((res) => res.data.data),
  deleteSkill: (id: string) => api.delete(`/skills/${id}`),
};

// Experience API
export const experienceApi = {
  getExperience: () => api.get<ApiResponse<ExperienceDto[]>>('/experience').then((res) => res.data.data),
  createExperience: (data: Partial<ExperienceDto>) => api.post<ApiResponse<ExperienceDto>>('/experience', data).then((res) => res.data.data),
  updateExperience: (id: string, data: Partial<ExperienceDto>) => api.patch<ApiResponse<ExperienceDto>>(`/experience/${id}`, data).then((res) => res.data.data),
  deleteExperience: (id: string) => api.delete(`/experience/${id}`),
};

// Projects API
export const projectsApi = {
  getProjects: () => api.get<ApiResponse<ProjectDto[]>>('/projects').then((res) => res.data.data),
  createProject: (data: Partial<ProjectDto>) => api.post<ApiResponse<ProjectDto>>('/projects', data).then((res) => res.data.data),
  updateProject: (id: string, data: Partial<ProjectDto>) => api.patch<ApiResponse<ProjectDto>>(`/projects/${id}`, data).then((res) => res.data.data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
};

// Books API
export const booksApi = {
  getBooks: () => api.get<ApiResponse<BookDto[]>>('/books').then((res) => res.data.data),
  createBook: (data: Partial<BookDto>) => api.post<ApiResponse<BookDto>>('/books', data).then((res) => res.data.data),
  updateBook: (id: string, data: Partial<BookDto>) => api.patch<ApiResponse<BookDto>>(`/books/${id}`, data).then((res) => res.data.data),
  deleteBook: (id: string) => api.delete(`/books/${id}`),
};

// Quotes API
export const quotesApi = {
  getQuotes: () => api.get<ApiResponse<QuoteDto[]>>('/quotes').then((res) => res.data.data),
  createQuote: (data: Partial<QuoteDto>) => api.post<ApiResponse<QuoteDto>>('/quotes', data).then((res) => res.data.data),
  updateQuote: (id: string, data: Partial<QuoteDto>) => api.patch<ApiResponse<QuoteDto>>(`/quotes/${id}`, data).then((res) => res.data.data),
  deleteQuote: (id: string) => api.delete(`/quotes/${id}`),
};

// Quests API
export const questsApi = {
  getQuests: () => api.get<ApiResponse<QuestDto[]>>('/quests').then((res) => res.data.data),
  createQuest: (data: Partial<QuestDto>) => api.post<ApiResponse<QuestDto>>('/quests', data).then((res) => res.data.data),
  updateQuest: (id: string, data: Partial<QuestDto>) => api.patch<ApiResponse<QuestDto>>(`/quests/${id}`, data).then((res) => res.data.data),
  deleteQuest: (id: string) => api.delete(`/quests/${id}`),
};

// Timeline API
export const timelineApi = {
  getTimeline: () => api.get<ApiResponse<TimelineEventDto[]>>('/timeline').then((res) => res.data.data),
  createEvent: (data: Partial<TimelineEventDto>) => api.post<ApiResponse<TimelineEventDto>>('/timeline', data).then((res) => res.data.data),
  updateEvent: (id: string, data: Partial<TimelineEventDto>) => api.patch<ApiResponse<TimelineEventDto>>(`/timeline/${id}`, data).then((res) => res.data.data),
  deleteEvent: (id: string) => api.delete(`/timeline/${id}`),
};

export default api;
