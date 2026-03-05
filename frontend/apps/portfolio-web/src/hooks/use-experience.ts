import { useQuery } from '@tanstack/react-query';
import { experienceApi } from '@/services/api';

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: experienceApi.getExperience,
  });
}
