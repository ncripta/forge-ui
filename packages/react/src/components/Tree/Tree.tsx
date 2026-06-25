import * as React from 'react';
import { cn } from '../../utils/cn';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
}

export interface TreeProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  selectedId?: string;
  className?: string;
}

const TreeItem: React.FC<{
  node: TreeNode;
  level: number;
  onSelect?: (node: TreeNode) => void;
  selectedId?: string;
}> = ({ node, level, onSelect, selectedId }) => {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          onSelect?.(node);
        }}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-text-main transition-colors duration-fast hover:bg-surface-sunken',
          selectedId === node.id && 'bg-primary-subtle text-primary-main font-medium'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren && (
          <svg
            className={cn('h-3.5 w-3.5 shrink-0 text-text-muted transition-transform duration-fast', expanded && 'rotate-90')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
        {!hasChildren && <span className="w-3.5" />}
        {node.icon}
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && expanded && (
        <ul>
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Tree: React.FC<TreeProps> = ({ data, onSelect, selectedId, className }) => (
  <ul className={cn('space-y-0.5', className)} role="tree">
    {data.map((node) => (
      <TreeItem key={node.id} node={node} level={0} onSelect={onSelect} selectedId={selectedId} />
    ))}
  </ul>
);
Tree.displayName = 'Tree';

export { Tree };
