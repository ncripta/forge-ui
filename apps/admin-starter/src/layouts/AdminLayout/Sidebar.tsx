import { NavLink } from 'react-router-dom';
import { navigationMenu, type NavItem } from '@/config/navigation';
import { useUIStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { appConfig } from '@/config/app.config';
import { Badge, Icon, type IconName } from '@ncripta/forge-react';
import { cn } from '@ncripta/forge-react';

function NavItemLink({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-3 rounded-lg text-[15px] font-medium transition-colors',
          isActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon name={item.icon as IconName} size={22} className={isActive ? 'text-primary-600' : 'text-surface-400'} />
          <span>{item.title}</span>
          {item.badge && <Badge intent="primary" className="ml-auto text-[10px]">{item.badge}</Badge>}
        </>
      )}
    </NavLink>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
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
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'bg-surface-50 w-64 border-r border-surface-200 flex flex-col fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-surface-100">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight">
            <Icon name="Hexagon" size={24} className="fill-primary-50 text-primary-600" />
            {appConfig.name}
          </div>
          <button className="ml-auto lg:hidden text-surface-400 hover:text-surface-800" onClick={() => setSidebarOpen(false)}>
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {filteredMenu.map((group) => (
              <div key={group.group}>
                <p className="px-3 text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3 mt-6 first:mt-0">
                  {group.group}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <NavItemLink key={item.path} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile (Bottom) */}
        <div className="p-4 border-t border-surface-100">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-100 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-900 truncate">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-surface-500 truncate">{user?.role || 'User'}</p>
            </div>
            <Icon name="ChevronsUpDown" size={16} className="text-surface-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
