import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const chatBubbleVariants = cva(
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

export interface ChatBubbleProps extends VariantProps<typeof chatBubbleVariants> {
  children: React.ReactNode;
  timestamp?: string;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, children, timestamp, className }) => (
  <div className={cn('flex flex-col gap-1', role === 'user' ? 'items-end' : role === 'system' ? 'items-center' : 'items-start')}>
    <div className={cn(chatBubbleVariants({ role }), className)}>
      {children}
    </div>
    {timestamp && <span className="text-xs text-text-muted px-1">{timestamp}</span>}
  </div>
);
ChatBubble.displayName = 'ChatBubble';

// Typing indicator
const ChatTyping: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('flex items-center gap-1 max-w-[80%] bg-surface-sunken rounded-lg px-4 py-3 mr-auto rounded-bl-sm', className)}>
    <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:-0.3s]" />
    <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:-0.15s]" />
    <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce" />
  </div>
);
ChatTyping.displayName = 'ChatTyping';

export { ChatBubble, ChatTyping, chatBubbleVariants };
