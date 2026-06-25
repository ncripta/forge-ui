import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const alertVariants = cva(
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

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, intent, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ intent }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm [&_p]:leading-relaxed opacity-90', className)}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };
