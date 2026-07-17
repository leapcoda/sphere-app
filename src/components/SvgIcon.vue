<template>
  <component :is="svgIcon" :style="svgStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { px2vw } from '@/utils/conversion';

const props = defineProps({
  name: { type: String, default: '' },
  size: { type: Number, default: 24 },
  color: { type: String, default: '' },
});

const modules = import.meta.glob('@/assets/icons/*.svg', { import: 'default', eager: true });
const svgIcon = computed(() => {
  const key = `/src/assets/icons/${props.name}.svg`;
  return modules[key] ? modules[key] : null;
});

const svgSize = computed(() => px2vw(props.size));
const svgStyle = computed(() => {
  return {
    width: svgSize.value,
    height: svgSize.value,
    ...(props.color && { color: props.color }),
  };
});
</script>