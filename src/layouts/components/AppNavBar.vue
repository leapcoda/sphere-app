<template>
  <div class="app-navbar">
    <div class="fixed top-0 inset-x-0 h-(--navbar-height) bg-white flex items-center px-4">
      <img class="collapsible mr-4 max-w-12" :class="{ 'collapsible--collapsed': !visible.logo }"
        src="@/assets/images/logo.png">
      <svg-icon class="collapsible mr-4" :class="{ 'collapsible--collapsed': !visible.icon }" name="back" :size="24" />
      <search-bar :text-list="suggestions" :action="!visible.action" :interval="5000" />
      <div class="collapsible ml-4 max-w-7 text-sm font-medium whitespace-nowrap overflow-hidden"
        :class="{ 'collapsible--collapsed': !visible.action }">搜索</div>
    </div>
    <div class="h-(--navbar-height)"></div>
  </div>
</template>

<script lang="ts" setup>
import SearchBar from '@/components/SearchBar.vue';
import { useSuggestions } from '@/hooks/useSearchBar';

interface Props {
  visible?: {
    logo?: boolean;
    icon?: boolean;
    action?: boolean;
  };
}

const { visible = {} } = defineProps<Props>();
const { suggestions } = useSuggestions();
</script>

<style lang="scss" scoped>
.app-navbar {
  --navbar-height: 48px;
  --nav-ease: cubic-bezier(.4, 0, .2, 1);
  --nav-duration: .3s;
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