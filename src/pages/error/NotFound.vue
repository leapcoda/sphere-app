<template>
  <div class="page flex flex-col justify-center items-center gap-8 min-h-dvh bg-surface text-foreground-3">
    <div class="text-center">
      <h1 class="text-9xl font-semibold">404</h1>
      <p class="text-[32px]/8 font-semibold">Not Found</p>
    </div>
    <div class="flex items-center text-sm">
      <span class="tracking-[1px] opacity-50">「迷途知返，往哲是与」</span>
      <router-link to="/">回到探索页</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  position: relative;
  padding: 4px 0;
  color: var(--color-brand);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: currentColor;
    transform: scaleX(0);
    animation: underline-grow 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
}

@keyframes underline-grow {
  to {
    transform: scaleX(1);
  }
}
</style>