import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/services/api';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getProjects,
  });
}
