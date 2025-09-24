import { apiClient } from './client';
import type { PortfolioData } from '../types/portfolio';
import type { ContactMessage } from '../types/portfolio';

const ADMIN_BASE = '/admin';

export type AdminCredentials = {
  email: string;
  password: string;
};

export const adminApi = {
  login: (credentials: AdminCredentials) =>
    apiClient.post<{ message: string }>(`${ADMIN_BASE}/login`, credentials),
  getPortfolio: () => apiClient.get<PortfolioData>(`${ADMIN_BASE}/portfolio`),
  updatePortfolio: (payload: PortfolioData) =>
    apiClient.put<PortfolioData>(`${ADMIN_BASE}/portfolio`, payload),
  getContacts: () => apiClient.get<ContactMessage[]>(`${ADMIN_BASE}/contacts`),
};
