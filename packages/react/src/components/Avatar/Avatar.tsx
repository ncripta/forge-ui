import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { type VariantProps } from 'class-variance-authority';
import { avatarVariants } from '@ncripta/forge-variants';
import { cn } from '../../utils/cn';

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, fallback, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, className }))}
    {...props}
  >
    <AvatarPrimitive.Image
      className="aspect-square h-full w-full object-cover"
      src={src}
      alt={alt}
    />
    <AvatarPrimitive.Fallback
      className="flex h-full w-full items-center justify-center rounded-full bg-primary-subtle text-primary-main font-medium"
    >
      {fallback}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));
Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };
