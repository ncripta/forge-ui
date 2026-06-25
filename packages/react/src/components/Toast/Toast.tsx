import * as React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';

export interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
}

const Toaster: React.FC<ToasterProps> = ({
  position = 'bottom-right',
  richColors = true,
  expand = false,
  duration = 4000,
}) => (
  <SonnerToaster
    position={position}
    richColors={richColors}
    expand={expand}
    duration={duration}
    toastOptions={{
      classNames: {
        toast: 'bg-surface-raised border-surface-border text-text-main shadow-lg rounded-lg',
        title: 'text-sm font-semibold',
        description: 'text-sm text-text-muted',
        actionButton: 'bg-primary-main text-text-inverse text-xs px-2 py-1 rounded-md',
        cancelButton: 'bg-surface-sunken text-text-secondary text-xs px-2 py-1 rounded-md',
      },
    }}
  />
);
Toaster.displayName = 'Toaster';

export { Toaster, toast };
