import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './ThemeProvider';
import { Toaster } from '@ncripta/forge-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          {children}
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
