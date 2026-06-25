import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'Sin resultados.',
  className,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm ring-offset-surface-background focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          !selectedLabel && 'text-text-muted',
          className
        )}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <svg className="h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-md border border-surface-border bg-surface-raised shadow-md outline-none animate-in fade-in-0 zoom-in-95"
          sideOffset={4}
          align="start"
        >
          <CommandPrimitive className="flex flex-col">
            <div className="flex items-center border-b border-surface-border px-3">
              <svg className="mr-2 h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <CommandPrimitive.Input
                placeholder={searchPlaceholder}
                className="flex h-9 w-full bg-transparent py-3 text-sm text-text-main outline-none placeholder:text-text-muted"
              />
            </div>
            <CommandPrimitive.List className="max-h-[200px] overflow-y-auto p-1">
              <CommandPrimitive.Empty className="py-4 text-center text-sm text-text-muted">
                {emptyMessage}
              </CommandPrimitive.Empty>
              {options.map((option) => (
                <CommandPrimitive.Item
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => {
                    onValueChange?.(option.value === value ? '' : option.value);
                    setOpen(false);
                  }}
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-main outline-none aria-selected:bg-primary-subtle aria-selected:text-primary-main data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <svg
                    className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {option.label}
                </CommandPrimitive.Item>
              ))}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
Combobox.displayName = 'Combobox';

export { Combobox };
