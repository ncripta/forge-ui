import * as React from 'react';
import { cn } from '../../utils/cn';

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

const DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Padding antes
  const startDay = (firstDay.getDay() + 6) % 7; // lunes = 0
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }

  // Días del mes
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  // Padding después
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const Calendar: React.FC<CalendarProps> = ({ selected, onSelect, className }) => {
  const [viewDate, setViewDate] = React.useState(selected || new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = getDaysInMonth(year, month);
  const today = new Date();

  const prev = () => setViewDate(new Date(year, month - 1, 1));
  const next = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div className={cn('w-[280px] rounded-lg border border-surface-border bg-surface-raised p-3 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={prev} className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-surface-sunken text-text-muted">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-sm font-medium text-text-main">{MONTHS[month]} {year}</span>
        <button type="button" onClick={next} className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-surface-sunken text-text-muted">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-text-muted py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const isCurrentMonth = day.getMonth() === month;
          const isSelected = selected && isSameDay(day, selected);
          const isToday = isSameDay(day, today);

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect?.(day)}
              className={cn(
                'h-8 w-8 mx-auto rounded-md text-xs transition-colors duration-fast',
                !isCurrentMonth && 'text-text-disabled',
                isCurrentMonth && !isSelected && 'text-text-main hover:bg-surface-sunken',
                isToday && !isSelected && 'border border-primary-main',
                isSelected && 'bg-primary-main text-text-inverse'
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
Calendar.displayName = 'Calendar';

export { Calendar };
