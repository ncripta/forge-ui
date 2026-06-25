import { cva } from 'class-variance-authority';

export const chatBubbleVariants = cva(
  'max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed',
  {
    variants: {
      role: {
        user: 'bg-primary-main text-text-inverse ml-auto rounded-br-sm',
        assistant: 'bg-surface-sunken text-text-main mr-auto rounded-bl-sm',
        system: 'bg-warning-subtle text-warning-main mx-auto text-center text-xs rounded-md',
      },
    },
    defaultVariants: {
      role: 'user',
    },
  }
);
