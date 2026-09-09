<template>
  <div class="page">
    <t-tabs v-model="currentTab" :list="tabList" bottomLineMode="auto" :spaceEvenly="false" />
    <div class="wrapper fixed z-100 top-12 right-0 flex items-center">
      <div class="w-5 h-10 bg-linear-to-r from-transparent to-white pointer-events-none"></div>
      <div class="h-10 pl-2 pr-4 bg-white flex items-center">
        <svg-icon name="menu" :size="12" />
        <span class="ml-1 text-sm/[22px]">分类</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useSuggestions } from '@/hooks/useSearchBar';

const { setSuggestions } = useSuggestions();
const suggestions = ['Teenie Weenie 羽绒服', 'iphone 18 pro max', '范思哲男士香水', '劳伦拉夫棒球帽'];

const currentTab = ref(0);
const tabList = ref([
  { label: '推荐', value: 0 },
  { label: '鞋类', value: 1 },
  { label: '男装', value: 2 },
  { label: '数码', value: 3 },
  { label: '潮玩', value: 4 },
  { label: '女装', value: 5 },
  { label: '美妆', value: 6 },
  { label: '包袋', value: 7 },
]);

onMounted(() => {
  setSuggestions(suggestions);
});
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>