import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { appConfig } from '@/config/app.config';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme | 'system') => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: 'light' | 'dark' | 'system'): Theme {
  return mode === 'system' ? getSystemTheme() : mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('forge-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return resolveTheme(appConfig.theme.defaultMode);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const stored = localStorage.getItem('forge-theme');
      if (!stored || stored === 'system') {
        setThemeState(getSystemTheme());
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const setTheme = (mode: Theme | 'system') => {
    const resolved = resolveTheme(mode);
    localStorage.setItem('forge-theme', mode);
    setThemeState(resolved);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
