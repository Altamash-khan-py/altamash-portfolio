import { format, formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string | number, pattern = 'MMM d, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : new Date(date);
  return format(d, pattern);
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date | string | number): string {
  const d = typeof date === 'string' ? parseISO(date) : new Date(date);
  return format(d, 'MMM d, yyyy h:mm a');
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(date: Date | string | number): string {
  const d = typeof date === 'string' ? parseISO(date) : new Date(date);
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Format duration between two dates
 */
export function formatDuration(startDate: Date | string, endDate?: Date | string | null): string {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = endDate 
    ? (typeof endDate === 'string' ? parseISO(endDate) : endDate)
    : new Date();
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  const totalMonths = years * 12 + months;
  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;
  
  if (displayYears > 0 && displayMonths > 0) {
    return `${displayYears} yr ${displayMonths} mos`;
  } else if (displayYears > 0) {
    return `${displayYears} yr`;
  } else {
    return `${displayMonths} mos`;
  }
}

/**
 * Format date for SEO (ISO 8601)
 */
export function formatISODate(date: Date | string | number): string {
  const d = typeof date === 'string' ? parseISO(date) : new Date(date);
  return d.toISOString();
}

/**
 * Get age from birth date
 */
export function getAge(birthDate: Date | string): number {
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return d < new Date();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date | string): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return d > new Date();
}
