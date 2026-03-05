import type { ApiResponse, ApiError, ApiMeta } from '@portfolio/types';

/**
 * Create successful API response
 */
export function createSuccessResponse<T>(data: T, meta?: ApiMeta): ApiResponse<T> {
  return {
    success: true,
    data,
    meta,
  };
}

/**
 * Create error API response
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: Record<string, string[]>
): ApiResponse<never> {
  return {
    success: false,
    data: null as never,
    error: {
      code,
      message,
      details,
    },
  };
}

/**
 * Common error codes
 */
export const ErrorCodes = {
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  
  // Server errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Rate limiting
  RATE_LIMITED: 'RATE_LIMITED',
  
  // File upload errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
} as const;

/**
 * HTTP Status codes mapping
 */
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Calculate pagination meta
 */
export function calculatePaginationMeta(
  total: number,
  page: number,
  limit: number
): ApiMeta {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages,
  };
}

/**
 * Build search query for PostgreSQL full-text search
 */
export function buildSearchQuery(searchTerm: string): string {
  // Convert search term to tsquery format
  return searchTerm
    .split(/\s+/)
    .filter((term) => term.length > 0)
    .map((term) => `${term}:*`)
    .join(' & ');
}

/**
 * Parse pagination params from query
 */
export function parsePaginationParams(query: {
  page?: string;
  limit?: string;
}): { page: number; limit: number } {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10)));
  
  return { page, limit };
}

/**
 * Calculate skip value for Prisma
 */
export function calculateSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}
