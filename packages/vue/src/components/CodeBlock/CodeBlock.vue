<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '../../utils/cn';

interface Props {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { showLineNumbers: false });
const copied = ref(false);

const handleCopy = async () => {
  await navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
};

const lines = props.code.split('\n');
</script>

<template>
  <div :class="cn('relative rounded-lg border border-surface-border bg-surface-sunken overflow-hidden', props.class)">
    <div class="flex items-center justify-between px-4 py-2 border-b border-surface-border bg-surface-raised">
      <span v-if="language" class="text-xs text-text-muted font-mono">{{ language }}</span>
      <span v-else />
      <button type="button" @click="handleCopy" class="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-main transition-colors">
        <template v-if="copied">
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          Copiado
        </template>
        <template v-else>
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          Copiar
        </template>
      </button>
    </div>
    <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="font-mono text-text-main"><template v-if="showLineNumbers"><div v-for="(line, i) in lines" :key="i" class="flex"><span class="select-none w-8 shrink-0 text-right pr-4 text-text-disabled">{{ i + 1 }}</span><span>{{ line }}</span></div></template><template v-else>{{ code }}</template></code></pre>
  </div>
</template>
