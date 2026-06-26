import { ref, watchEffect } from 'vue';

type Theme = 'light' | 'dark';

const theme = ref<Theme>(getInitialTheme());

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('forge-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

watchEffect(() => {
  document.documentElement.setAttribute('data-mode', theme.value);
});

export function useTheme() {
  function setTheme(mode: Theme | 'system') {
    const resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    localStorage.setItem('forge-theme', mode);
    theme.value = resolved;
  }

  return { theme, setTheme };
}
