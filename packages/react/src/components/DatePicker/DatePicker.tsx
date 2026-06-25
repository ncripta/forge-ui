import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Calendar } from '../Calendar';
import { cn } from '../../utils/cn';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  className,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm ring-offset-surface-background focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          !value && 'text-text-muted',
          className
        )}
      >
        <svg className="mr-2 h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{value ? formatDate(value) : placeholder}</span>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="z-50 animate-in fade-in-0 zoom-in-95"
          sideOffset={4}
          align="start"
        >
          <Calendar
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
DatePicker.displayName = 'DatePicker';

export { DatePicker };
