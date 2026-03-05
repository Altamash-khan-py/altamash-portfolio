import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@/services/api';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: booksApi.getBooks,
  });
}
