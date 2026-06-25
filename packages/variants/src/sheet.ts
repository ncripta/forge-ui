import { cva } from 'class-variance-authority';

export const sheetContentVariants = cva(
  'fixed z-50 flex flex-col gap-4 bg-surface-raised shadow-xl transition-transform duration-300 ease-in-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b border-surface-border max-h-[80vh]',
        bottom: 'inset-x-0 bottom-0 border-t border-surface-border max-h-[80vh]',
        left: 'top-0 bottom-0 left-0 h-full w-[320px] border-r border-surface-border',
        right: 'top-0 bottom-0 right-0 h-full w-[320px] border-l border-surface-border',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);
