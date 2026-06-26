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
      { title: 'Usuarios', icon: 'Users', path: '/users' },
      { title: 'Proyectos', icon: 'FolderKanban', path: '/projects' },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { title: 'Configuración', icon: 'Settings', path: '/settings' },
      { title: 'Seguridad', icon: 'ShieldCheck', path: '/security' },
    ],
  },
];
