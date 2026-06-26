import { defineComponent, h, computed } from 'vue';
import { Bar, Line, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend, Filler);

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const BarChart = defineComponent({
  name: 'BarChart',
  props: {
    data: { type: Array as () => Record<string, any>[], required: true },
    dataKey: { type: String, required: true },
    categoryKey: { type: String, default: 'name' },
    color: { type: String, default: '#6366f1' },
    height: { type: Number, default: 300 },
  },
  setup(props) {
    const chartData = computed(() => ({
      labels: props.data.map((d) => d[props.categoryKey]),
      datasets: [{ data: props.data.map((d) => d[props.dataKey]), backgroundColor: props.color, borderRadius: 4 }],
    }));
    const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };
    return () => h('div', { style: { height: `${props.height}px` } }, [h(Bar as any, { data: chartData.value, options })]);
  },
});

export const LineChart = defineComponent({
  name: 'LineChart',
  props: {
    data: { type: Array as () => Record<string, any>[], required: true },
    lines: { type: Array as () => { dataKey: string; color?: string }[], required: true },
    categoryKey: { type: String, default: 'name' },
    height: { type: Number, default: 300 },
  },
  setup(props) {
    const chartData = computed(() => ({
      labels: props.data.map((d) => d[props.categoryKey]),
      datasets: props.lines.map((line, i) => ({
        label: line.dataKey,
        data: props.data.map((d) => d[line.dataKey]),
        borderColor: line.color || COLORS[i % COLORS.length],
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      })),
    }));
    const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true } } };
    return () => h('div', { style: { height: `${props.height}px` } }, [h(Line as any, { data: chartData.value, options })]);
  },
});

export const DonutChart = defineComponent({
  name: 'DonutChart',
  props: {
    data: { type: Array as () => Record<string, any>[], required: true },
    dataKey: { type: String, required: true },
    nameKey: { type: String, default: 'name' },
    colors: { type: Array as () => string[], default: () => COLORS },
    height: { type: Number, default: 300 },
  },
  setup(props) {
    const chartData = computed(() => ({
      labels: props.data.map((d) => d[props.nameKey]),
      datasets: [{ data: props.data.map((d) => d[props.dataKey]), backgroundColor: props.colors, borderWidth: 0 }],
    }));
    const options = { responsive: true, maintainAspectRatio: false, cutout: '60%' };
    return () => h('div', { style: { height: `${props.height}px` } }, [h(Doughnut as any, { data: chartData.value, options })]);
  },
});
