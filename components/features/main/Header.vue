<script setup lang="ts">
const { toggleDrawState } = useMainDraw();
import { MainAuthForm } from "#components";

defineOptions({
  name: "MainHeader",
});
</script>
<template>
  <header
    class="bg-bg-header flex h-16 w-full items-center justify-between px-4"
  >
    <div class="flex items-center gap-1 text-3xl">
      <span class="font-bold"> NASTOLKA </span>
      <Icon name="game-icons:cubes" />
    </div>

    <div>
      <UDrawer direction="right">
        <UButton color="primary">
          <Icon name="ci:hamburger-lg" />
        </UButton>
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          quo ex quod vel doloribus, fugit sint quaerat ut consequatur iure
          neque earum dolores, nemo nihil officiis dolorem dicta sunt corporis!
        </template>
      </UDrawer>
    </div>
  </header>
</template>

<style scoped>
/* header {
} */
</style>
