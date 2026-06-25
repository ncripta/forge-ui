import * as React from 'react';
import { cn } from '../../utils/cn';

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const status = index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending';

          return (
            <li key={index} className={cn('flex items-center', index < steps.length - 1 && 'flex-1')}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                    status === 'completed' && 'bg-success-main text-text-inverse',
                    status === 'active' && 'bg-primary-main text-text-inverse',
                    status === 'pending' && 'bg-surface-sunken text-text-muted border border-surface-border'
                  )}
                >
                  {status === 'completed' ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={cn(
                  'text-xs text-center whitespace-nowrap',
                  status === 'active' ? 'text-text-main font-medium' : 'text-text-muted'
                )}>
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-text-muted text-center hidden sm:block">{step.description}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-px mx-3 mt-[-1rem]',
                    index < currentStep ? 'bg-success-main' : 'bg-surface-border'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
Stepper.displayName = 'Stepper';

export { Stepper };
