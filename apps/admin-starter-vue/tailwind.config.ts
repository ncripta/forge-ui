import type { Config } from 'tailwindcss';
import forgePreset from '@ncripta/forge-tailwind';

export default {
  presets: [forgePreset as Partial<Config>],
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
    '../../packages/vue/src/**/*.{vue,ts}',
    '../../packages/variants/src/**/*.ts',
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
