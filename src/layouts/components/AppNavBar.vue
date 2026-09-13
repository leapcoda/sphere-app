<template>
  <div class="app-navbar relative z-200">
    <div class="app-navbar__content fixed top-0 inset-x-0 h-(--navbar-height) bg-white flex items-center px-4"
      :style="{ backgroundImage: !visible.logo ? 'none' : `url(${background})` }">
      <img v-if="visible.logo" class="collapsible mr-4 max-w-12" src="@/assets/images/logo.png">
      <svg-icon class="collapsible mr-4" :class="{ 'collapsible--collapsed': !visible.back }" name="back" :size="24"
        @click="goBack" />
      <search-bar ref="searchBarRef" :text-list="suggestions" :mode="visible.action ? 'input' : 'entry'"
        :interval="5000" />
      <div class="collapsible ml-4 max-w-7 text-sm font-medium whitespace-nowrap overflow-hidden"
        :class="{ 'collapsible--collapsed': !visible.action }" @click="search">搜索</div>
    </div>
    <div class="h-(--navbar-height)"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import SearchBar from './SearchBar.vue';
import { useSuggestions } from '@/hooks/useSearchBar';
import background from '@/assets/images/bg-nav.webp';

interface Props {
  visible?: {
    logo?: boolean;
    back?: boolean;
    action?: boolean;
  };
}

const { visible = {} } = defineProps<Props>();
const router = useRouter();
const { suggestions } = useSuggestions();

// AppNavBar 的搜索调用 SearchBar 暴露出来的方法
const searchBarRef = ref<InstanceType<typeof SearchBar>>();

const goBack = () => {
  router.back();
};

const search = () => {
  searchBarRef.value?.search();
};
</script>

<style lang="scss" scoped>
.app-navbar {
  --navbar-height: 48px;
  --nav-ease: cubic-bezier(.4, 0, .2, 1);
  --nav-duration: .3s;

  &__content {
    background-size: 100% 52px;
  }
}

.collapsible {
  transition: max-width var(--nav-duration) var(--nav-ease),
    opacity var(--nav-duration) var(--nav-ease),
    margin var(--nav-duration) var(--nav-ease);

  &--collapsed {
    max-width: 0;
    margin: 0;
    opacity: 0;
    pointer-events: none;
  }
}
</style>