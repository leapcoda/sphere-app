<template>
  <app-nav-bar v-if="showNavBar" :visible />
  <router-view />
  <app-tab-bar v-if="showTabBar" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppNavBar from './components/AppNavBar.vue';
import AppTabBar from './components/AppTabBar.vue';

const route = useRoute();

const showNavBar = computed(() => Boolean(route.meta.showNavBar));
const showTabBar = computed(() => Boolean(route.meta.showTabBar));
const isRootPath = computed(() => route.path === '/');
const isSearchPage = computed(() => route.name === 'search');
const visible = computed(() => ({
  logo: isRootPath.value,
  back: !showTabBar.value,
  action: isSearchPage.value,
}));
</script>