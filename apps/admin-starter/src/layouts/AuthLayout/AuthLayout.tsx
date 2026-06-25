import { Outlet } from 'react-router-dom';
import { appConfig } from '@/config/app.config';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-sunken p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2">
          <img src={appConfig.logo} alt={appConfig.name} className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-text-main">{appConfig.name}</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
