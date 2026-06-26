// Utils
export { cn } from './utils/cn';

// Shared Variants (re-exported from @forge-ui/variants)
export {
  buttonVariants,
  badgeVariants,
  avatarVariants,
  inputVariants,
  alertVariants,
  spinnerVariants,
  sheetContentVariants,
  chatBubbleVariants,
} from '@forge-ui/variants';

// Atomic Components
export { Button, type ButtonProps } from './components/Button';
export { Badge, type BadgeProps } from './components/Badge';
export { Avatar, type AvatarProps } from './components/Avatar';
export { Separator, type SeparatorProps } from './components/Separator';

// Form Components
export { Label, type LabelProps } from './components/Label';
export { Input, type InputProps } from './components/Input';
export { Textarea, type TextareaProps } from './components/Textarea';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Switch, type SwitchProps } from './components/Switch';

// Data Display
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card';

// Feedback
export { Spinner, type SpinnerProps } from './components/Spinner';
export { Skeleton, type SkeletonProps } from './components/Skeleton';

// Overlays
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './components/Dialog';
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip';
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  type SheetContentProps,
} from './components/Sheet';

// Data Table
export {
  DataTable,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type DataTableProps,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from './components/DataTable';

// Navigation
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
} from './components/CommandPalette';

// Charts
export {
  BarChart,
  LineChart,
  DonutChart,
  ChartContainer,
  CHART_COLORS,
  type BarChartProps,
  type LineChartProps,
  type DonutChartProps,
  type ChartDataPoint,
} from './components/Chart';

// DropdownMenu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './components/DropdownMenu';

// Toast
export { Toaster, toast, type ToasterProps } from './components/Toast';

// Alert
export { Alert, AlertTitle, AlertDescription, type AlertProps } from './components/Alert';

// Breadcrumbs
export { Breadcrumbs, type BreadcrumbsProps, type BreadcrumbItem } from './components/Breadcrumbs';

// Pagination
export { Pagination, type PaginationProps } from './components/Pagination';

// Popover
export { Popover, PopoverTrigger, PopoverContent } from './components/Popover';

// ContextMenu
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuGroup,
  ContextMenuSub,
} from './components/ContextMenu';

// Accordion
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion';

// ScrollArea
export { ScrollArea, ScrollBar } from './components/ScrollArea';

// RadioGroup
export { RadioGroup, RadioGroupItem } from './components/RadioGroup';

// Select
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from './components/Select';

// Combobox
export { Combobox, type ComboboxProps, type ComboboxOption } from './components/Combobox';

// Slider
export { Slider, type SliderProps } from './components/Slider';

// Stepper
export { Stepper, type StepperProps, type StepperStep } from './components/Stepper';

// InputOTP
export { InputOTP, type InputOTPProps } from './components/InputOTP';

// Dropzone
export { Dropzone, type DropzoneProps } from './components/Dropzone';

// AvatarGroup
export { AvatarGroup, type AvatarGroupProps } from './components/AvatarGroup';

// Tree
export { Tree, type TreeProps, type TreeNode } from './components/Tree';

// Calendar
export { Calendar, type CalendarProps } from './components/Calendar';

// DatePicker
export { DatePicker, type DatePickerProps } from './components/DatePicker';

// ChatBubble
export { ChatBubble, ChatTyping, type ChatBubbleProps } from './components/ChatBubble';

// CodeBlock
export { CodeBlock, type CodeBlockProps } from './components/CodeBlock';

// Icon
export { Icon, icons, type IconProps, type IconName } from './components/Icon';

// Progress
export { Progress, type ProgressProps } from './components/Progress';
