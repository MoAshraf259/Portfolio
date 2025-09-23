import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPortfolio, submitContact, contactSchema } from '../api/portfolio';
import type { ContactFormValues } from '../api/portfolio';

export const portfolioQueryKey = ['portfolio'] as const;

export function usePortfolio() {
  return useQuery({
    queryKey: portfolioQueryKey,
    queryFn: fetchPortfolio,
    staleTime: 1000 * 60 * 10,
  });
}

export function useContactMutation() {
  return useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const parsed = contactSchema.parse(values);
      return submitContact(parsed);
    },
  });
}
