<template>
  <div class="search-bar relative flex-1 h-9 px-3 bg-surface rounded-xs flex items-center">
    <!-- 词条滚动器 -->
    <div class="text-roller max-w-35 overflow-hidden text-sm" :style="{ height: convertedHeight }">
      <div ref="trackRef" class="text-roller__track" :style="trackStyle">
        <div v-for="(item, index) in displayList" :key="index" class="whitespace-nowrap"
          :style="{ lineHeight: convertedHeight }">{{ item }}
        </div>
      </div>
    </div>
    <!-- 实际输入框 -->
    <t-input :readonly borderless>
      <template #extra>
        <div class="flex items-center">
          <svg-icon name="scan-search" :size="20" color="var(--search-bar-color)" />
          <span v-if="action" class="text-search flex items-center text-sm font-medium">搜索</span>
        </div>
      </template>
    </t-input>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';

import { px2vw } from '@/utils/convert';

interface Props {
  textList: string[];
  interval?: number;
  duration?: number;
  action?: boolean;
}

const {
  textList = [],
  interval = 2000,
  duration = 400,
  action = true,
} = defineProps<Props>();

const trackRef = ref<HTMLElement>();
const readonly = ref(true);
const current = ref(0);
const animating = ref(true);

const ROLLER_HEIGHT = 24;
let timer: ReturnType<typeof setInterval> | null = null;
let resetTimer: ReturnType<typeof setTimeout> | null = null;

const convertedHeight = computed(() => px2vw(ROLLER_HEIGHT));

const displayList = computed(() => {
  if (textList.length <= 1) return textList;
  return [...textList, textList[0]];
});

const trackStyle = computed(() => ({
  transform: `translateY(-${px2vw(current.value * ROLLER_HEIGHT)})`,
  transition: animating.value ? `transform ${duration}ms ease-in-out` : 'none',
}));

watch(() => textList, async () => {
  await reset();
  start();
});

function next() {
  current.value++;
  if (current.value === displayList.value.length - 1) {
    resetTimer = setTimeout(reset, duration);
  }
}

// 复位：无过渡回到首项，确保布局生效后恢复
async function reset() {
  animating.value = false;
  current.value = 0;
  await nextTick();
  void trackRef.value?.offsetHeight;
  animating.value = true;
}

function start() {
  stop();
  if (displayList.value.length <= 1) return;
  timer = setInterval(next, interval);
}

function stop() {
  if (timer) { clearInterval(timer); timer = null; }
  if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
}

onMounted(start);
onUnmounted(stop);
</script>

<style lang="scss" scoped>
.search-bar {
  --search-bar-color: color-mix(in srgb, var(--color-foreground-3) 50%, transparent);
  --td-input-bg-color: transparent;

  .text-roller {
    color: var(--search-bar-color);
  }

  .t-input {
    position: absolute;
    inset: 0;
    padding: 0 12px;

    :deep(.t-input__content) {
      font-size: var(--text-sm);
    }

    :deep(.t-input__control) {
      caret-color: var(--color-brand);
    }
  }

  .text-search {
    &::before {
      content: '';
      width: 1px;
      height: 16px;
      background-color: var(--td-component-stroke);
      margin: 0 8px;
    }
  }
}
</style>