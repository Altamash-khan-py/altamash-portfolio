import { useQuery } from '@tanstack/react-query';
import { quotesApi } from '@/services/api';

export function useQuotes() {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: quotesApi.getQuotes,
  });
}

export function useFeaturedQuotes() {
  return useQuery({
    queryKey: ['quotes', 'featured'],
    queryFn: quotesApi.getFeaturedQuotes,
  });
}
