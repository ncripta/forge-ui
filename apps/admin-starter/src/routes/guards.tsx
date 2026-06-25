import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { appConfig } from '@/config/app.config';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={appConfig.routes.unauthenticatedFallback} replace />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={appConfig.routes.loginFallback} replace />;
  }

  return <Outlet />;
}
