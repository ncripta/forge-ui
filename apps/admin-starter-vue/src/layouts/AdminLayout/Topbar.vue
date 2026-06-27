<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useUIStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { useTheme } from '@/providers/useTheme';
import { NotificationService, type NotificationRecord } from '@/services/notification.service';
import { Icon, Button, ScrollArea, Popover, PopoverTrigger, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, cn } from '@ncripta/forge-vue';
import { PopoverRoot, PopoverPortal, PopoverContent } from 'radix-vue';

const ui = useUIStore();
const auth = useAuthStore();
const router = useRouter();
const queryClient = useQueryClient();
const { theme, setTheme } = useTheme();

// Notifications
const { data: notifications } = useQuery({
  queryKey: ['notifications'],
  queryFn: NotificationService.getAll,
  refetchInterval: 30000,
});

const unreadCount = computed(() => notifications.value?.unreadCount || 0);

const markAsReadMutation = useMutation({
  mutationFn: NotificationService.markAsRead,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
});

const markAllMutation = useMutation({
  mutationFn: NotificationService.markAllAsRead,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
});

const notificationIcons: Record<NotificationRecord['type'], { icon: string; color: string }> = {
  info: { icon: 'Info', color: 'text-blue-500' },
  success: { icon: 'CircleCheck', color: 'text-emerald-500' },
  warning: { icon: 'TriangleAlert', color: 'text-amber-500' },
  error: { icon: 'CircleX', color: 'text-red-500' },
};

// Theme
const colorThemes = [
  { value: '', label: 'Indigo', dot: '#6366f1' },
  { value: 'emerald', label: 'Emerald', dot: '#10b981' },
  { value: 'rose', label: 'Rose', dot: '#f43f5e' },
  { value: 'ocean', label: 'Ocean', dot: '#0ea5e9' },
];

const handleColorTheme = (value: string) => {
  if (value) {
    document.documentElement.setAttribute('data-theme', value);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
};

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<template>
  <header class="h-16 bg-surface-50 border-b border-surface-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
    <!-- Left -->
    <div class="flex items-center gap-4 flex-1">
      <button class="lg:hidden text-surface-500 hover:text-surface-900" @click="ui.setSidebarOpen(true)">
        <Icon name="Menu" :size="24" />
      </button>
      <div class="hidden sm:block relative max-w-md w-full">
        <Icon name="Search" :size="16" class="text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input type="text" placeholder="Buscar... (Cmd+K)" class="w-full bg-surface-100 border border-surface-200 text-surface-900 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 placeholder:text-surface-400" />
      </div>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-3 sm:gap-4">
      <!-- Color Theme -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button class="hidden sm:flex items-center gap-1.5 bg-surface-100 border border-surface-200 rounded-lg px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-surface-200 transition-colors">
            <Icon name="Palette" :size="14" class="text-surface-400" />
            Tema
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-36">
          <DropdownMenuItem v-for="t in colorThemes" :key="t.value" @click="handleColorTheme(t.value)">
            <span class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: t.dot }" />
            {{ t.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div class="h-6 w-px bg-surface-200 hidden sm:block" />

      <!-- Dark mode -->
      <button class="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-full" @click="setTheme(theme === 'dark' ? 'light' : 'dark')">
        <Icon :name="theme === 'dark' ? 'Sun' : 'Moon'" :size="20" />
      </button>

      <!-- Notifications -->
      <PopoverRoot>
        <PopoverTrigger as-child>
          <button class="relative p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-full">
            <Icon name="Bell" :size="20" />
            <span v-if="unreadCount > 0" class="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-surface-50 flex items-center justify-center">
              {{ unreadCount }}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent align="end" :side-offset="4" class="z-50 w-80 p-0 rounded-lg border border-surface-border bg-surface-raised shadow-md">
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-surface-200">
              <h4 class="text-sm font-semibold text-surface-900">Notificaciones</h4>
              <Button v-if="unreadCount > 0" intent="ghost" size="sm" class="text-xs h-auto py-1" @click="markAllMutation.mutate()">
                Marcar todas como leídas
              </Button>
            </div>
            <!-- List -->
            <ScrollArea class="max-h-[360px]">
              <div class="divide-y divide-surface-200">
                <div
                  v-for="n in notifications?.data"
                  :key="n.id"
                  :class="cn('px-4 py-3 flex gap-3 cursor-pointer hover:bg-surface-100 transition-colors', !n.read && 'bg-primary-50/50')"
                  @click="!n.read && markAsReadMutation.mutate(n.id)"
                >
                  <div :class="cn('shrink-0 mt-0.5', notificationIcons[n.type].color)">
                    <Icon :name="notificationIcons[n.type].icon" :size="18" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-medium text-surface-900 truncate">{{ n.title }}</p>
                      <span v-if="!n.read" class="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                    </div>
                    <p class="text-xs text-surface-500 line-clamp-2 mt-0.5">{{ n.message }}</p>
                    <p class="text-xs text-surface-400 mt-1">{{ n.createdAt }}</p>
                  </div>
                </div>
                <div v-if="!notifications?.data?.length" class="px-4 py-8 text-center text-sm text-surface-400">
                  No hay notificaciones
                </div>
              </div>
            </ScrollArea>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>

      <!-- User menu -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-100">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 text-primary-50 flex items-center justify-center font-semibold text-xs shadow-sm">
              {{ auth.user?.name?.charAt(0) || 'U' }}
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48">
          <div class="px-2 py-1.5">
            <p class="text-sm font-medium text-surface-900">{{ auth.user?.name || 'Usuario' }}</p>
            <p class="text-xs text-surface-500">{{ auth.user?.email || '' }}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="router.push('/settings')">Configuración</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-danger-main" @click="handleLogout">Cerrar sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
