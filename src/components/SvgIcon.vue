<template>
  <component :is="svgIcon" :style="svgStyle" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { px2vw } from '@/utils/convert';

interface Props {
  name: string;
  size?: number;
  color?: string;
}

const {
  name,
  size = 24,
  color = '',
} = defineProps<Props>();

const modules = import.meta.glob('@/assets/icons/*.svg', { import: 'default', eager: true });
const svgIcon = computed(() => {
  const key = `/src/assets/icons/${name}.svg`;
  return modules[key] ?? null;
});

const svgSize = computed(() => px2vw(size));
const svgStyle = computed(() => ({
  width: svgSize.value,
  height: svgSize.value,
  ...(color && { color }),
}));
</script>