import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  function login(userData: User) {
    user.value = userData;
  }

  function logout() {
    user.value = null;
  }

  return { user, isAuthenticated, login, logout };
}, {
  persist: true,
});
