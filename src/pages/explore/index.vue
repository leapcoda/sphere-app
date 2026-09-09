<template>
  <div class="page bg-surface">
    <t-tabs v-model="currentTab" :list="tabList" bottomLineMode="auto" :spaceEvenly="false" :split="false" />
    <div class="fixed z-100 top-12 right-0 flex items-center">
      <div class="w-5 h-10 bg-linear-to-r from-transparent to-white pointer-events-none"></div>
      <div class="h-10 pl-2 pr-4 bg-white flex items-center">
        <div class="w-5 h-5 rounded-full bg-surface text-foreground-4 flex justify-center items-center">
          <svg-icon name="chevron-down" :size="14" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useSuggestions } from '@/hooks/useSearchBar';

const { setSuggestions } = useSuggestions();
const suggestions = ['沉浸式数码开箱', '泡泡玛特盲盒', '七夕约会穿搭指南', 'RUNTOX 跑出无限可能'];

const currentTab = ref(0);
const tabList = ref([
  { label: '推荐', value: 0 },
  { label: '关注', value: 1 },
  { label: '穿搭', value: 2 },
  { label: '美妆', value: 3 },
  { label: '数码', value: 4 },
  { label: '游戏', value: 5 },
  { label: '运动', value: 6 },
  { label: '音乐', value: 7 },
]);

onMounted(() => {
  setSuggestions(suggestions);
});
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>