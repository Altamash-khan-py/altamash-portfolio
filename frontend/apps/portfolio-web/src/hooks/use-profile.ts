import { useQuery } from '@tanstack/react-query';
import { profileApi } from '@/services/api';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile,
  });
}
