import * as React from 'react';
import { cn } from '../../utils/cn';
import { Avatar, type AvatarProps } from '../Avatar';

export interface AvatarGroupProps {
  avatars: Omit<AvatarProps, 'size'>[];
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'md',
  className,
}) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  return (
    <div className={cn('flex -space-x-3', className)}>
      {visible.map((avatar, i) => (
        <Avatar
          key={i}
          size={size}
          className="ring-2 ring-surface-background"
          {...avatar}
        />
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'relative flex items-center justify-center rounded-full bg-surface-sunken border-2 border-surface-background font-medium text-text-muted',
            sizeClasses[size || 'md']
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};
AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
