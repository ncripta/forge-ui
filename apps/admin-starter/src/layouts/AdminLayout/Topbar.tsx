import { useUIStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { useTheme } from '@/providers/ThemeProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationService, type NotificationRecord } from '@/services/notification.service';
import {
  Button, Icon, Badge, ScrollArea,
  Popover, PopoverTrigger, PopoverContent,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from '@ncripta/forge-react';
import { useNavigate } from 'react-router-dom';

const COLOR_THEMES = [
  { value: '', label: 'Indigo', dot: '#6366f1' },
  { value: 'emerald', label: 'Emerald', dot: '#10b981' },
  { value: 'rose', label: 'Rose', dot: '#f43f5e' },
  { value: 'ocean', label: 'Ocean', dot: '#0ea5e9' },
] as const;

const NOTIFICATION_ICONS: Record<NotificationRecord['type'], { icon: 'Info' | 'CircleCheck' | 'TriangleAlert' | 'CircleX'; color: string }> = {
  info: { icon: 'Info', color: 'text-blue-500' },
  success: { icon: 'CircleCheck', color: 'text-emerald-500' },
  warning: { icon: 'TriangleAlert', color: 'text-amber-500' },
  error: { icon: 'CircleX', color: 'text-red-500' },
};

export function Topbar() {
  const { setSidebarOpen } = useUIStore();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: NotificationService.getAll,
    refetchInterval: 30000,
  });

  const markAsReadMutation = useMutation({
    mutationFn: NotificationService.markAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: NotificationService.markAllAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const unreadCount = notifications?.unreadCount || 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleColorTheme = (value: string) => {
    if (value) {
      document.documentElement.setAttribute('data-theme', value);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <header className="h-16 bg-surface-50 border-b border-surface-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
      {/* Left */}
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-surface-500 hover:text-surface-900" onClick={() => setSidebarOpen(true)}>
          <Icon name="Menu" size={24} />
        </button>

        {/* Search */}
        <div className="hidden sm:block relative max-w-md w-full">
          <Icon name="Search" size={16} className="text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar usuarios, proyectos... (Cmd+K)"
            className="w-full bg-surface-100 border border-surface-200 text-surface-900 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 placeholder:text-surface-400"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Color Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden sm:flex items-center gap-1.5 bg-surface-100 border border-surface-200 rounded-lg px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-surface-200 transition-colors">
              <Icon name="Palette" size={14} className="text-surface-400" />
              Tema
              <Icon name="ChevronDown" size={12} className="text-surface-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {COLOR_THEMES.map((t) => (
              <DropdownMenuItem key={t.value} onClick={() => handleColorTheme(t.value)}>
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: t.dot }} />
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-px bg-surface-200 hidden sm:block" />

        {/* Dark mode toggle */}
        <button
          className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-full"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
        </button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-full">
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-surface-50 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200">
              <h4 className="text-sm font-semibold text-surface-900">Notificaciones</h4>
              {unreadCount > 0 && (
                <Button
                  intent="ghost"
                  size="sm"
                  className="text-xs h-auto py-1"
                  onClick={() => markAllAsReadMutation.mutate()}
                >
                  Marcar todas como leídas
                </Button>
              )}
            </div>

            {/* List */}
            <ScrollArea className="max-h-[360px]">
              <div className="divide-y divide-surface-200">
                {notifications?.data.map((n) => {
                  const iconConfig = NOTIFICATION_ICONS[n.type];
                  return (
                    <div
                      key={n.id}
                      className={`px-4 py-3 flex gap-3 cursor-pointer hover:bg-surface-100 transition-colors ${!n.read ? 'bg-primary-50/50' : ''}`}
                      onClick={() => !n.read && markAsReadMutation.mutate(n.id)}
                    >
                      <div className={`shrink-0 mt-0.5 ${iconConfig.color}`}>
                        <Icon name={iconConfig.icon} size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-surface-900 truncate">{n.title}</p>
                          {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-surface-500 line-clamp-2 mt-0.5">{n.message}</p>
                        <p className="text-xs text-surface-400 mt-1">{n.createdAt}</p>
                      </div>
                    </div>
                  );
                })}
                {(!notifications?.data || notifications.data.length === 0) && (
                  <div className="px-4 py-8 text-center text-sm text-surface-400">
                    No hay notificaciones
                  </div>
                )}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 text-primary-50 flex items-center justify-center font-semibold text-xs shadow-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-surface-900">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-surface-500">{user?.email || ''}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-danger-main">
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
