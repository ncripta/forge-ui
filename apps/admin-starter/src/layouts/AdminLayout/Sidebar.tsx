import { NavLink } from 'react-router-dom';
import { navigationMenu, type NavItem } from '@/config/navigation';
import { useUIStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { appConfig } from '@/config/app.config';
import { Badge, ScrollArea, Icon, type IconName } from '@forge-ui/react';
import { cn } from '@forge-ui/react';

function NavItemLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-fast',
          isActive
            ? 'bg-primary-subtle text-primary-main'
            : 'text-text-secondary hover:bg-surface-sunken hover:text-text-main'
        )
      }
    >
      <span className="shrink-0 h-5 w-5"><Icon name={item.icon as IconName} size={18} /></span>
      {!collapsed && (
        <>
          <span className="truncate">{item.title}</span>
          {item.badge && <Badge intent="primary" className="ml-auto">{item.badge}</Badge>}
        </>
      )}
    </NavLink>
  );
}

export function Sidebar() {
  const { sidebarCollapsed } = useUIStore();
  const user = useAuthStore((s) => s.user);

  const filteredMenu = navigationMenu
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.roles || (user?.role && item.roles.includes(user.role))
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-surface-border bg-surface-raised transition-all duration-normal',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-surface-border px-4">
        <img src={appConfig.logo} alt={appConfig.name} className="h-8 w-8 shrink-0" />
        {!sidebarCollapsed && (
          <span className="text-lg font-bold text-text-main truncate">{appConfig.name}</span>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {filteredMenu.map((group) => (
            <div key={group.group}>
              {!sidebarCollapsed && (
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {group.group}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItemLink key={item.path} item={item} collapsed={sidebarCollapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
