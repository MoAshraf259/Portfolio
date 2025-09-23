import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPortfolio, submitContact, contactSchema } from '../api/portfolio';
export const portfolioQueryKey = ['portfolio'];
export function usePortfolio() {
    return useQuery({
        queryKey: portfolioQueryKey,
        queryFn: fetchPortfolio,
        staleTime: 1000 * 60 * 10,
    });
}
export function useContactMutation() {
    return useMutation({
        mutationFn: async (values) => {
            const parsed = contactSchema.parse(values);
            return submitContact(parsed);
        },
    });
}
