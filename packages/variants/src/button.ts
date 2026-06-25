import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors duration-fast ease-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        primary: 'bg-primary-main text-text-inverse hover:bg-primary-hover active:bg-primary-active',
        secondary: 'bg-surface-raised text-text-main border border-surface-border hover:bg-surface-sunken',
        ghost: 'text-primary-main hover:bg-primary-subtle active:bg-primary-subtle-hover',
        danger: 'bg-danger-main text-text-inverse hover:bg-danger-hover',
        link: 'text-text-link underline-offset-4 hover:underline',
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
