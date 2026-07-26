<template>
  <div class="page">
    <div class="status">
      <h1>404</h1>
      <p>Not Found</p>
    </div>
    <div class="action">
      <span>「迷途知返，往哲是与」</span>
      <router-link to="/">回到探索页</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  @include flex($direction: column, $jc: center, $ai: center, $gap: 32px);
  min-height: 100dvh;
  line-height: 1;
  color: $color-text-3;
}

.status {
  text-align: center;

  h1 {
    @include text($size: 128px, $weight: 600);
  }

  p {
    @include text($size: 32px, $weight: 600);
  }
}

.action {
  @include flex($ai: center);
  font-size: 14px;

  span {
    letter-spacing: 1px;
    opacity: 0.5;
  }

  a {
    position: relative;
    padding: 4px 0;
    color: $color-brand;

    &::after {
      content: '';
      @include position(absolute, $left: 0, $bottom: 0);
      @include size(100%, 1px);
      background-color: currentColor;
      transform: scaleX(0);
      animation: underline-grow 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  }
}

@keyframes underline-grow {
  to {
    transform: scaleX(1);
  }
}
</style>