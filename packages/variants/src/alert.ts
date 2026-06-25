import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current',
  {
    variants: {
      intent: {
        default: 'bg-surface-raised border-surface-border text-text-main',
        info: 'bg-primary-subtle border-primary-main/20 text-primary-main',
        success: 'bg-success-subtle border-success-main/20 text-success-main',
        danger: 'bg-danger-subtle border-danger-main/20 text-danger-main',
        warning: 'bg-warning-subtle border-warning-main/20 text-warning-main',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  }
);
