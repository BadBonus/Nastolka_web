<template>
  <div class="common-layout">
    <MainHeader />
    <main class="layout_main px-1.5 py-6">
      <div delete-tag class="mx-auto mt-2.5 max-w-[360px]">
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
