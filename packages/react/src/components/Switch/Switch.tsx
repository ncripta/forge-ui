import * as React from 'react';
import { cn } from '../../utils/cn';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, size = 'md', disabled, ...props }, ref) => {
    const sizes = {
      sm: { track: 'h-4 w-7', thumb: 'h-3 w-3', translate: 'translate-x-3' },
      md: { track: 'h-5 w-9', thumb: 'h-4 w-4', translate: 'translate-x-4' },
      lg: { track: 'h-6 w-11', thumb: 'h-5 w-5', translate: 'translate-x-5' },
    };

    const s = sizes[size];

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        ref={ref}
        disabled={disabled}
        className={cn(
          'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-fast ease-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-primary-main' : 'bg-surface-border',
          s.track,
          className
        )}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        <span
          className={cn(
            'pointer-events-none block rounded-full bg-white shadow-sm transition-transform duration-fast ease-default',
            s.thumb,
            checked ? s.translate : 'translate-x-0'
          )}
        />
      </button>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };
