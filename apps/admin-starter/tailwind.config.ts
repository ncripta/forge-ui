import type { Config } from 'tailwindcss';
import forgePreset from '@forge-ui/tailwind';

export default {
  presets: [forgePreset as Partial<Config>],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/react/src/**/*.{ts,tsx}',
    '../../packages/variants/src/**/*.ts',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
