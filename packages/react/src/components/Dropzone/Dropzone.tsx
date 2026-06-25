import * as React from 'react';
import { cn } from '../../utils/cn';

export interface DropzoneProps {
  onFiles?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Dropzone: React.FC<DropzoneProps> = ({
  onFiles,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  className,
  children,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    let files = Array.from(fileList);
    if (maxSize) {
      files = files.filter((f) => f.size <= maxSize);
    }
    onFiles?.(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        'relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors duration-fast',
        isDragging
          ? 'border-primary-main bg-primary-subtle'
          : 'border-surface-border bg-surface-sunken hover:border-surface-border-hover',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      {children || (
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          <svg className="h-10 w-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-sm text-text-muted">
            <span className="font-medium text-primary-main">Haz clic</span> o arrastra archivos aquí
          </p>
        </div>
      )}
    </div>
  );
};
Dropzone.displayName = 'Dropzone';

export { Dropzone };
