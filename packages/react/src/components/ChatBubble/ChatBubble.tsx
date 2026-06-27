import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { chatBubbleVariants } from '@ncripta/forge-variants';
import { cn } from '../../utils/cn';

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
