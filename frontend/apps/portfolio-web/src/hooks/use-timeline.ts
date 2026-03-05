import { useQuery } from '@tanstack/react-query';
import { timelineApi } from '@/services/api';

export function useTimeline() {
  return useQuery({
    queryKey: ['timeline'],
    queryFn: timelineApi.getTimeline,
  });
}
