import { useQuery } from '@tanstack/react-query';
import { questsApi } from '@/services/api';

export function useQuests() {
  return useQuery({
    queryKey: ['quests'],
    queryFn: questsApi.getQuests,
  });
}
