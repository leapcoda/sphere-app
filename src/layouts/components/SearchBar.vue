<template>
  <div class="search-bar relative flex-1 h-9 px-3 bg-surface rounded-xs" @click="goToSearch">
    <!-- 输入框 -->
    <t-input v-model="inputValue" class="relative z-20" :placeholder borderless>
      <template #extra>
        <div class="flex items-center">
          <svg-icon name="scan-search" :size="20" color="var(--search-bar-color)" />
          <span v-if="isEntryMode" class="text-search flex items-center text-sm font-medium"
            @click.stop="search">搜索</span>
        </div>
      </template>
    </t-input>
    <!-- 滚动器 -->
    <div v-if="isEntryMode" class="text-roller absolute z-10 inset-y-0 my-auto max-w-45 overflow-hidden text-sm"
      :style="{ height: convertedHeight }">
      <div ref="trackRef" class="text-roller__track" :style="trackStyle">
        <div v-for="(item, index) in displayList" :key="index" class="whitespace-nowrap"
          :style="{ lineHeight: convertedHeight }">{{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import { px2vw } from '@/utils/convert';

interface Props {
  textList: string[];
  interval?: number;
  duration?: number;
  /**
   * entry：入口态（搜索框滚动词条，显示内部搜索按钮）
   * input：输入态（词条设置到 placeholder，搜索按钮交给导航栏）
   */
  mode?: 'entry' | 'input';
}

const {
  textList = [],
  interval = 2000,
  duration = 400,
  mode = 'entry',
} = defineProps<Props>();

const router = useRouter();
const inputValue = ref('');
const trackRef = ref<HTMLElement>();
const current = ref(0);
const animating = ref(true);

const TEXT_ROLLER_HEIGHT = 24;
let timer: ReturnType<typeof setInterval> | null = null;
let resetTimer: ReturnType<typeof setTimeout> | null = null;

const convertedHeight = computed(() => px2vw(TEXT_ROLLER_HEIGHT));

const displayList = computed(() => {
  if (textList.length <= 1) return textList;
  return [...textList, textList[0]];
});

const trackStyle = computed(() => ({
  transform: `translateY(-${px2vw(current.value * TEXT_ROLLER_HEIGHT)})`,
  transition: animating.value ? `transform ${duration}ms ease-in-out` : 'none',
}));

const isEntryMode = computed(() => mode === 'entry');
// 进入搜索页时，把当前滚动文本设置到占位符
const activeText = computed(() => displayList.value[current.value] ?? '');
const placeholder = computed(() => (isEntryMode.value ? '' : activeText.value));

watch(() => textList, async (list, prev) => {
  if (!isEntryMode.value) return;
  // 页面重新挂载时，同内容的新引用不该打断滚动
  const changed = list.length !== prev.length || list.some((word, index) => word !== prev[index]);
  if (changed) await reset();
  start();
});

watch(isEntryMode, (value) => {
  if (value) start();
  else stop();
});

const goToSearch = () => {
  router.push({ name: 'search' });
};

const search = () => {
  // TODO: 使用 activeText 或 inputValue 搜索
};

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

async function start() {
  stop();
  if (displayList.value.length <= 1) return;
  // 如果用户在滚动到复制项 duration 期间，点击搜索框触发 stop() 会导致 reset() 没执行
  if (current.value >= displayList.value.length - 1) await reset();
  timer = setInterval(next, interval);
}

function stop() {
  if (timer) { clearInterval(timer); timer = null; }
  if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
}

defineExpose({ search });
onMounted(start);
onUnmounted(stop);
</script>

<style lang="scss" scoped>
.search-bar {
  --search-bar-color: rgba(0, 0, 0, 0.48);
  --td-input-bg-color: transparent;

  .t-input {
    padding: 6px 0;

    :deep(.t-input__content) {
      font-size: var(--text-sm);
    }

    :deep(.t-input__control) {
      caret-color: var(--color-brand);

      &::placeholder {
        color: var(--search-bar-color);
      }
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

  .text-roller {
    color: var(--search-bar-color);
  }
}
</style>