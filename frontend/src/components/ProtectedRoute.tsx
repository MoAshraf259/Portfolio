import { Navigate, useLocation } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
