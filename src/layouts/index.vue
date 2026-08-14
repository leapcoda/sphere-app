<template>
  <app-nav-bar v-if="showNavBar" :visible="{ logo: isRootPath }" />
  <router-view />
  <app-tab-bar />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppNavBar from './components/AppNavBar.vue';
import AppTabBar from './components/AppTabBar.vue';

const route = useRoute();

const showNavBar = computed(() => Boolean(route.meta.showNavBar));
const isRootPath = computed(() => route.path === '/');
</script>