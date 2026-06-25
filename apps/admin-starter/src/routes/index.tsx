import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout/AdminLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ProtectedRoute, PublicOnlyRoute } from './guards';
import { DashboardPage } from '@/pages/Dashboard';
import { LoginPage } from '@/pages/Login';

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes (login, register) */}
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>

      {/* Protected routes (admin panel) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
