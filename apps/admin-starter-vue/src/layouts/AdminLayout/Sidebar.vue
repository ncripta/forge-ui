<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { navigationMenu } from '@/config/navigation';
import { useUIStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { appConfig } from '@/config/app.config';
import { Icon, Badge, cn } from '@ncripta/forge-vue';

const route = useRoute();
const ui = useUIStore();
const auth = useAuthStore();

const filteredMenu = computed(() =>
  navigationMenu
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.roles || (auth.user?.role && item.roles.includes(auth.user.role))
      ),
    }))
    .filter((group) => group.items.length > 0)
);
</script>

<template>
  <!-- Mobile backdrop -->
  <div v-if="ui.sidebarOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="ui.setSidebarOpen(false)" />

  <aside
    :class="cn(
      'bg-surface-50 w-64 border-r border-surface-200 flex flex-col fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
      ui.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    )"
  >
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 border-b border-surface-100">
      <div class="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight">
        <Icon name="Hexagon" :size="24" class="fill-primary-50 text-primary-600" />
        {{ appConfig.name }}
      </div>
      <button class="ml-auto lg:hidden text-surface-400 hover:text-surface-800" @click="ui.setSidebarOpen(false)">
        <Icon name="X" :size="20" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-6 px-4">
      <div class="space-y-1">
        <div v-for="group in filteredMenu" :key="group.group">
          <p class="px-3 text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3 mt-6 first:mt-0">
            {{ group.group }}
          </p>
          <div class="space-y-1">
            <router-link
              v-for="item in group.items"
              :key="item.path"
              :to="item.path"
              :class="cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg text-[15px] font-medium transition-colors',
                route.path === item.path
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
              )"
            >
              <Icon :name="item.icon" :size="22" :class="route.path === item.path ? 'text-primary-600' : 'text-surface-400'" />
              <span>{{ item.title }}</span>
              <Badge v-if="item.badge" intent="primary" class="ml-auto text-[10px]">{{ item.badge }}</Badge>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- User Profile -->
    <div class="p-4 border-t border-surface-100">
      <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-100 cursor-pointer">
        <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
          {{ auth.user?.name?.charAt(0) || 'U' }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-surface-900 truncate">{{ auth.user?.name || 'Usuario' }}</p>
          <p class="text-xs text-surface-500 truncate">{{ auth.user?.role || 'User' }}</p>
        </div>
        <Icon name="ChevronsUpDown" :size="16" class="text-surface-400" />
      </div>
    </div>
  </aside>
</template>
