import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        primary: 'bg-primary-600 text-primary-50 hover:bg-primary-700 active:bg-primary-700',
        secondary: 'bg-surface-100 text-surface-900 border border-surface-200 hover:bg-surface-200',
        ghost: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100',
        danger: 'bg-danger-main text-text-inverse hover:bg-danger-hover',
        link: 'text-primary-600 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base rounded-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);
