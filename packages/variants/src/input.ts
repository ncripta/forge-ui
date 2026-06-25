import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full rounded-md border bg-surface-background text-text-main transition-colors duration-fast file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      error: {
        true: 'border-danger-main focus-visible:ring-danger-main',
        false: 'border-surface-border hover:border-surface-border-hover',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);
