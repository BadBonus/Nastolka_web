<template>
  <div class="common-layout">
    <MainHeader />
    <main class="layout_main px-1.5 py-6">
      <!-- delete-tag - напоминание, что этот тег служит сугубо для поддержки мобильного вида и после разработки должен будет быть удален -->
      <div delete-tag class="mx-auto max-w-[360px] pt-2">
        <slot />
      </div>
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
