import * as React from 'react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, separator, className, ...props }, ref) => {
    const defaultSeparator = (
      <svg className="h-4 w-4 text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    );

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn('flex items-center', className)} {...props}>
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="text-sm text-text-muted hover:text-text-main transition-colors duration-fast"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className={cn('text-sm', isLast ? 'text-text-main font-medium' : 'text-text-muted')}>
                    {item.label}
                  </span>
                )}
                {!isLast && (separator || defaultSeparator)}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
