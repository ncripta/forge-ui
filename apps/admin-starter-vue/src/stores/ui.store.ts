import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const sidebarOpen = ref(false);

  function setSidebarOpen(open: boolean) {
    sidebarOpen.value = open;
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  return { sidebarOpen, setSidebarOpen, toggleSidebar };
}, {
  persist: true,
});
