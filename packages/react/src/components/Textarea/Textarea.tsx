import * as React from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border bg-surface-background px-3 py-2 text-sm text-text-main placeholder:text-text-muted transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-danger-main focus-visible:ring-danger-main'
            : 'border-surface-border hover:border-surface-border-hover',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
