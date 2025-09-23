import { apiClient } from './client';
import type { PortfolioData } from '../types/portfolio';
import type { ContactMessage } from '../types/portfolio';

const ADMIN_BASE = '/admin';

const withAuth = (token: string): RequestInit => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export type AdminCredentials = {
  email: string;
  password: string;
};

export const adminApi = {
  login: (credentials: AdminCredentials) =>
    apiClient.post<{ token: string; expiresIn: string }>(`${ADMIN_BASE}/login`, credentials),
  getPortfolio: (token: string) =>
    apiClient.get<PortfolioData>(`${ADMIN_BASE}/portfolio`, withAuth(token)),
  updatePortfolio: (token: string, payload: PortfolioData) =>
    apiClient.put<PortfolioData>(`${ADMIN_BASE}/portfolio`, payload, withAuth(token)),
  getContacts: (token: string) =>
    apiClient.get<ContactMessage[]>(`${ADMIN_BASE}/contacts`, withAuth(token)),
};
