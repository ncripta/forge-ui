import * as React from 'react';
import { icons, type LucideProps } from 'lucide-react';
import { cn } from '../../utils/cn';

export type IconName = keyof typeof icons;

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size = 20, strokeWidth = 1.75, ...props }, ref) => {
    const LucideIcon = icons[name];

    if (!LucideIcon) {
      return null;
    }

    return (
      <LucideIcon
        ref={ref}
        className={cn('shrink-0', className)}
        size={size}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  }
);
Icon.displayName = 'Icon';

export { Icon, icons };
