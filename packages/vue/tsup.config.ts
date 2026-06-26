import { defineConfig } from 'tsup';
import vue from 'unplugin-vue/esbuild';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  external: ['vue'],
  sourcemap: true,
  esbuildPlugins: [vue()],
});
