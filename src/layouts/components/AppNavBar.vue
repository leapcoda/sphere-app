<template>
  <div class="app-navbar relative z-100">
    <div class="app-navbar__content fixed top-0 inset-x-0 h-(--navbar-height) px-4 bg-white flex items-center"
      :class="{ 'app-navbar--morph': morphing }"
      :style="{ backgroundImage: !visible.logo ? 'none' : `url(${background})` }">
      <div class="nav-slot mr-4 flex justify-start"
        :class="visible.logo ? 'w-12' : visible.back ? 'w-6' : 'nav-slot--collapsed'">
        <img v-if="visible.logo" class="max-w-12 shrink-0" src="@/assets/images/logo.png">
        <svg-icon v-else-if="visible.back" class="relative z-10 shrink-0" name="back" :size="24" @click="goBack" />
      </div>
      <search-bar ref="searchBarRef" :text-list="suggestions" :mode="visible.action ? 'input' : 'entry'"
        :interval="5000" />
      <div class="nav-slot ml-4 flex justify-end" :class="visible.action ? 'w-10' : 'nav-slot--collapsed'">
        <div v-if="visible.action" class="relative z-10 shrink-0 px-1.5 text-sm font-medium" @click="search">搜索</div>
      </div>
    </div>
    <div class="h-(--navbar-height)"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue';
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

// 只在进出搜索页时开启动画
const morphing = ref(false);
let morphTimer: ReturnType<typeof setTimeout> | null = null;

watch(() => visible.action, () => {
  morphing.value = true;
  if (morphTimer) clearTimeout(morphTimer);
  morphTimer = setTimeout(() => { morphing.value = false; }, 400);
});

const goBack = () => {
  router.back();
};

const search = () => {
  searchBarRef.value?.search();
};

onUnmounted(() => {
  if (morphTimer) clearTimeout(morphTimer);
});
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

.nav-slot--collapsed {
  width: 0;
  margin: 0;
  pointer-events: none;
}

.app-navbar--morph .nav-slot {
  transition: width var(--nav-duration) var(--nav-ease),
    margin var(--nav-duration) var(--nav-ease);
}
</style>