import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@ncripta/forge-variants';
import { cn } from '../../utils/cn';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, intent, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ intent, variant, className }))}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
