import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      intent: {
        default: 'bg-surface-sunken text-text-secondary border border-surface-border',
        primary: 'bg-primary-subtle text-primary-main',
        success: 'bg-success-subtle text-success-main',
        danger: 'bg-danger-subtle text-danger-main',
        warning: 'bg-warning-subtle text-warning-main',
      },
      variant: {
        subtle: '',
        solid: '',
        outline: 'bg-transparent border',
      },
    },
    compoundVariants: [
      { intent: 'primary', variant: 'solid', className: 'bg-primary-main text-text-inverse' },
      { intent: 'success', variant: 'solid', className: 'bg-success-main text-text-inverse' },
      { intent: 'danger', variant: 'solid', className: 'bg-danger-main text-text-inverse' },
      { intent: 'warning', variant: 'solid', className: 'bg-warning-main text-text-inverse' },
      { intent: 'primary', variant: 'outline', className: 'border-primary-main text-primary-main' },
      { intent: 'success', variant: 'outline', className: 'border-success-main text-success-main' },
      { intent: 'danger', variant: 'outline', className: 'border-danger-main text-danger-main' },
      { intent: 'warning', variant: 'outline', className: 'border-warning-main text-warning-main' },
    ],
    defaultVariants: {
      intent: 'default',
      variant: 'subtle',
    },
  }
);
