<template>
  <div class="page px-6 pt-4">
    <!-- 历史记录 -->
    <section v-if="historyList.length">
      <div class="h-6 flex items-center justify-between">
        <h2 class="text-xs font-medium text-foreground">历史记录</h2>
        <svg-icon name="delete" :size="20" color="var(--icon-color)" @click="clearHistory" />
      </div>
      <div ref="historyRef" class="mt-4 flex flex-wrap gap-2">
        <div v-for="item in visibleHistory" :key="item"
          class="h-8 px-3 max-w-37.5 truncate border-[0.5px] border-stroke-2 rounded-xs text-xs leading-8 text-foreground-2"
          @click="search(item)">
          {{ item }}</div>
        <div v-if="collapsible"
          class="w-8 h-8 border-[0.5px] border-stroke-2 rounded-xs flex justify-center items-center"
          @click="historyExpanded = !historyExpanded">
          <svg-icon class="transition-transform duration-300" :class="{ 'rotate-180': historyExpanded }"
            name="chevron-down" :size="16" color="var(--icon-color)" />
        </div>
      </div>
    </section>
    <!-- 猜你想搜 -->
    <section v-if="guessList.length" class="mt-4">
      <div class="h-6 flex items-center justify-between">
        <h2 class="text-xs font-medium text-foreground">猜你想搜</h2>
        <svg-icon name="refresh" :size="20" color="var(--icon-color)" @click="refreshGuess" />
      </div>
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div v-for="item in guessList" :key="item" class="truncate text-xs text-foreground-2" @click="search(item)">
          {{ item }}</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';

const historyList = ref([
  '李宁赤兔9 pro',
  '阿玛尼口红',
  'nike sportswear',
  'ipad 保护壳',
  'apple macbook neo',
  '平板散热支架',
  '石头岛冲锋衣',
  'kawasaki 夹克',
]);

const guessList = ref([
  '石头岛连帽夹克',
  '景德镇茶具盖碗',
  'mac mini m4',
  '项链纯银999',
  'voguo relay 西裤',
  '入秋外套',
  '小米平板8',
  'iphone 18 pro max',
]);

const historyRef = ref<HTMLElement>();
const historyExpanded = ref(false);
const visibleCount = ref(0); // 收起时展示词条数
const HISTORY_ROWS = 2; // 收起时最大展示行数

const visibleHistory = computed(() => (
  historyExpanded.value ? historyList.value : historyList.value.slice(0, visibleCount.value)
));

const collapsible = computed(() => visibleCount.value < historyList.value.length);

watch(historyList, measure);

// 计算行数: 同一行的词条 offsetTop 相同，去重就是总行数（包含展开按钮在内）
function countRows() {
  const el = historyRef.value;
  return el ? new Set([...el.children].map((child) => (child as HTMLElement).offsetTop)).size : 0;
}

// 搜索历史发生变化时测量
async function measure() {
  visibleCount.value = historyList.value.length;
  await nextTick();
  // 渲染完计算实际占了几行，超行就逐条往回减到含展开按钮在内刚好 HISTORY_ROWS 行
  while (visibleCount.value > 0 && countRows() > HISTORY_ROWS) {
    visibleCount.value--;
    await nextTick();
  }
}

const clearHistory = () => { };

const refreshGuess = () => { };

const search = (_keyword: string) => { };

onMounted(measure);
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>