import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'portfolio_admin_token';

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getInitialToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(STORAGE_KEY);
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => getInitialToken());

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, newToken);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
