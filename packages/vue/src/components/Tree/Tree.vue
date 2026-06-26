<script setup lang="ts">
import { cn } from '../../utils/cn';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface Props {
  data: TreeNode[];
  selectedId?: string;
  class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ select: [node: TreeNode] }>();
</script>

<template>
  <ul :class="cn('space-y-0.5', props.class)" role="tree">
    <li v-for="node in data" :key="node.id">
      <TreeItem :node="node" :level="0" :selected-id="selectedId" @select="emit('select', $event)" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue';

const TreeItem = defineComponent({
  name: 'TreeItem',
  props: { node: { type: Object, required: true }, level: { type: Number, default: 0 }, selectedId: String },
  emits: ['select'],
  setup(props, { emit }) {
    const expanded = ref(false);
    const hasChildren = () => props.node.children && props.node.children.length > 0;

    return () => {
      const children = [];
      children.push(
        h('button', {
          type: 'button',
          class: cn(
            'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-text-main transition-colors hover:bg-surface-sunken',
            props.selectedId === props.node.id && 'bg-primary-subtle text-primary-main font-medium'
          ),
          style: { paddingLeft: `${props.level * 16 + 8}px` },
          onClick: () => {
            if (hasChildren()) expanded.value = !expanded.value;
            emit('select', props.node);
          },
        }, [
          hasChildren()
            ? h('svg', { class: cn('h-3.5 w-3.5 shrink-0 text-text-muted transition-transform', expanded.value && 'rotate-90'), fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 5l7 7-7 7' })])
            : h('span', { class: 'w-3.5' }),
          h('span', { class: 'truncate' }, props.node.label),
        ])
      );

      if (hasChildren() && expanded.value) {
        children.push(
          h('ul', {}, props.node.children.map((child: any) =>
            h('li', { key: child.id }, [h(TreeItem, { node: child, level: props.level + 1, selectedId: props.selectedId, onSelect: (n: any) => emit('select', n) })])
          ))
        );
      }

      return h('div', {}, children);
    };
  },
});
</script>
