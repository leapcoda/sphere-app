<template>
  <component :is="svgIcon" :style="{ width: svgSize, height: svgSize }" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { postcssConfig } from '@/config';

const { viewportWidth, unitPrecision } = postcssConfig;

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 24,
  },
});

const modules = import.meta.glob('@/assets/icons/*.svg', { import: 'default', eager: true });
const svgIcon = computed(() => {
  const key = `/src/assets/icons/${props.name}.svg`;
  return modules[key] ? modules[key] : null;
});

const svgSize = computed(() => {
  return `${(props.size * 100 / viewportWidth).toFixed(unitPrecision)}vw`;
});
</script>