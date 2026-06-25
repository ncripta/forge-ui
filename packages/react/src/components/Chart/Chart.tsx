import * as React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '../../utils/cn';

// --- Shared types ---

export interface ChartDataPoint {
  [key: string]: string | number;
}

interface BaseChartProps {
  data: ChartDataPoint[];
  height?: number;
  className?: string;
}

// --- Chart Container ---

const ChartContainer: React.FC<{ height: number; className?: string; children: React.ReactNode }> = ({
  height,
  className,
  children,
}) => (
  <div className={cn('w-full', className)} style={{ height }}>
    <ResponsiveContainer width="100%" height="100%">
      {children as React.ReactElement}
    </ResponsiveContainer>
  </div>
);

// --- Bar Chart ---

export interface BarChartProps extends BaseChartProps {
  dataKey: string;
  categoryKey?: string;
  color?: string;
}

const ForgeBarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  categoryKey = 'name',
  color = 'var(--forge-primary-main)',
  height = 300,
  className,
}) => (
  <ChartContainer height={height} className={className}>
    <RechartsBarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--forge-surface-border)" />
      <XAxis dataKey={categoryKey} tick={{ fontSize: 12, fill: 'var(--forge-text-muted)' }} stroke="var(--forge-surface-border)" />
      <YAxis tick={{ fontSize: 12, fill: 'var(--forge-text-muted)' }} stroke="var(--forge-surface-border)" />
      <Tooltip
        contentStyle={{
          backgroundColor: 'var(--forge-surface-raised)',
          border: '1px solid var(--forge-surface-border)',
          borderRadius: 'var(--forge-radius-md)',
          fontSize: 12,
        }}
      />
      <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
    </RechartsBarChart>
  </ChartContainer>
);
ForgeBarChart.displayName = 'BarChart';

// --- Line Chart ---

export interface LineChartProps extends BaseChartProps {
  lines: { dataKey: string; color?: string }[];
  categoryKey?: string;
}

const ForgeLineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  categoryKey = 'name',
  height = 300,
  className,
}) => (
  <ChartContainer height={height} className={className}>
    <RechartsLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--forge-surface-border)" />
      <XAxis dataKey={categoryKey} tick={{ fontSize: 12, fill: 'var(--forge-text-muted)' }} stroke="var(--forge-surface-border)" />
      <YAxis tick={{ fontSize: 12, fill: 'var(--forge-text-muted)' }} stroke="var(--forge-surface-border)" />
      <Tooltip
        contentStyle={{
          backgroundColor: 'var(--forge-surface-raised)',
          border: '1px solid var(--forge-surface-border)',
          borderRadius: 'var(--forge-radius-md)',
          fontSize: 12,
        }}
      />
      <Legend />
      {lines.map((line, i) => (
        <Line
          key={line.dataKey}
          type="monotone"
          dataKey={line.dataKey}
          stroke={line.color || `var(--forge-primary-main)`}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      ))}
    </RechartsLineChart>
  </ChartContainer>
);
ForgeLineChart.displayName = 'LineChart';

// --- Donut Chart ---

const CHART_COLORS = [
  'var(--forge-primary-main)',
  'var(--forge-success-main)',
  'var(--forge-warning-main)',
  'var(--forge-danger-main)',
  'var(--forge-primary-hover)',
  'var(--forge-success-hover)',
];

export interface DonutChartProps extends BaseChartProps {
  dataKey: string;
  nameKey?: string;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
}

const ForgeDonutChart: React.FC<DonutChartProps> = ({
  data,
  dataKey,
  nameKey = 'name',
  colors = CHART_COLORS,
  innerRadius = 60,
  outerRadius = 90,
  height = 300,
  className,
}) => (
  <ChartContainer height={height} className={className}>
    <RechartsPieChart>
      <Pie
        data={data}
        dataKey={dataKey}
        nameKey={nameKey}
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={2}
        strokeWidth={0}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: 'var(--forge-surface-raised)',
          border: '1px solid var(--forge-surface-border)',
          borderRadius: 'var(--forge-radius-md)',
          fontSize: 12,
        }}
      />
      <Legend />
    </RechartsPieChart>
  </ChartContainer>
);
ForgeDonutChart.displayName = 'DonutChart';

export {
  ForgeBarChart as BarChart,
  ForgeLineChart as LineChart,
  ForgeDonutChart as DonutChart,
  ChartContainer,
  CHART_COLORS,
};
