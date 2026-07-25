<template>
  <t-tab-bar v-model="active" :split="false" @change="change">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
      {{ item.label }}
      <template #icon>
        <svg-icon :name="item.icon" :size="24" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const active = ref(route.name);
const list = ref([
  { label: '探索', value: 'explore', icon: 'explore' },
  { label: '购买', value: 'shop', icon: 'shop' },
  { label: '消息', value: 'message', icon: 'message' },
  { label: '我的', value: 'user', icon: 'user' },
]);

const change = (value: string) => {
  router.replace({ name: value });
};
</script>

<style scoped lang="scss">
.t-tab-bar {
  --td-tab-bar-color: #{$color-text-4};
  --td-tab-bar-active-color: #{$color-text};

  :deep(.t-tab-bar-item__icon) {
    height: 24px !important;
  }
}
</style>