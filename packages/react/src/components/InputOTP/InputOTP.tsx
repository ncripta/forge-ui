import * as React from 'react';
import { cn } from '../../utils/cn';

export interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const InputOTP: React.FC<InputOTPProps> = ({
  length = 6,
  value = '',
  onChange,
  disabled = false,
  className,
}) => {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;

    const newValue = value.split('');
    newValue[index] = char;
    const joined = newValue.join('').slice(0, length);
    onChange?.(joined);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange?.(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            'h-10 w-10 rounded-md border border-surface-border bg-surface-background text-center text-sm font-medium text-text-main transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
          )}
        />
      ))}
    </div>
  );
};
InputOTP.displayName = 'InputOTP';

export { InputOTP };
