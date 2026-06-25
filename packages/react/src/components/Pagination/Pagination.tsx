import * as React from 'react';
import { cn } from '../../utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function generatePages(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  const leftSibling = Math.max(current - siblings, 2);
  const rightSibling = Math.min(current + siblings, total - 1);

  pages.push(1);

  if (leftSibling > 2) {
    pages.push('ellipsis');
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  if (rightSibling < total - 1) {
    pages.push('ellipsis');
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}) => {
  const pages = generatePages(currentPage, totalPages, siblingCount);

  const baseBtn = 'inline-flex items-center justify-center h-9 min-w-9 px-2 text-sm font-medium rounded-md transition-colors duration-fast disabled:opacity-50 disabled:pointer-events-none';

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        className={cn(baseBtn, 'border border-surface-border bg-surface-background text-text-main hover:bg-surface-sunken')}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Página anterior"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="inline-flex items-center justify-center h-9 min-w-9 text-sm text-text-muted">
            …
          </span>
        ) : (
          <button
            key={page}
            className={cn(
              baseBtn,
              page === currentPage
                ? 'bg-primary-main text-text-inverse'
                : 'border border-surface-border bg-surface-background text-text-main hover:bg-surface-sunken'
            )}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        className={cn(baseBtn, 'border border-surface-border bg-surface-background text-text-main hover:bg-surface-sunken')}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Página siguiente"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};
Pagination.displayName = 'Pagination';

export { Pagination };
