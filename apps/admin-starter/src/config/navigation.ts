export interface NavItem {
  title: string;
  icon: string;
  path: string;
  badge?: string;
  roles?: string[];
  children?: NavItem[];
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const navigationMenu: NavGroup[] = [
  {
    group: 'General',
    items: [
      { title: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
      { title: 'Analíticas', icon: 'BarChart3', path: '/analytics', badge: 'Nuevo' },
    ],
  },
  {
    group: 'Gestión',
    items: [
      { title: 'Usuarios', icon: 'Users', path: '/users' },
      { title: 'Roles', icon: 'Shield', path: '/roles', roles: ['SUPER_ADMIN'] },
      { title: 'Archivos', icon: 'FolderOpen', path: '/files' },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { title: 'Configuración', icon: 'Settings', path: '/settings' },
      { title: 'Auditoría', icon: 'ScrollText', path: '/audit', roles: ['SUPER_ADMIN', 'ADMIN'] },
    ],
  },
];
