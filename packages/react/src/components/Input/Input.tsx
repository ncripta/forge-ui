import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { inputVariants } from '@forge-ui/variants';
import { cn } from '../../utils/cn';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, error, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
