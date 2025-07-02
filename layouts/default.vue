<script lang="ts" setup></script>
<template>
  <div class="common-layout">
    <MainHeader />
    <main class="py-6">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<style>
.common-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & > main {
    flex: 1;

    box-shadow:
      inset 0 0.5em 1.5em #0000001a,
      inset 0 0.125em 0.5em #00000026;
  }
}
</style>
