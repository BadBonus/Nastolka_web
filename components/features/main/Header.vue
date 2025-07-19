<script setup lang="ts">
const { toggleDrawState } = useMainDraw();

const open = ref<boolean>(false);
const route = useRoute();

defineOptions({
  name: "MainHeader",
});

watch(
  () => route.name,
  () => {
    open.value = false;
  },
);
</script>
<template>
  <header
    class="bg-bg-header border-b-brown flex h-16 w-full items-center justify-between border-b-4 px-4"
  >
    <NuxtLink to="/" class="text-inverted flex items-center gap-1 text-3xl">
      <span class="font-decorate font-bold"> NASTOLKA </span>
      <Icon name="game-icons:cubes" />
    </NuxtLink>

    <div>
      <UDrawer
        v-model:open="open"
        :ui="{ header: 'flex items-center justify-between' }"
        direction="right"
      >
        <UButton color="primary">
          <Icon name="ci:hamburger-lg" />
        </UButton>

        <template #header>
          <h2 class="text-highlighted font-main text-4xl font-bold">
            Навигация
          </h2>

          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            @click="open = false"
          />
        </template>

        <template #body>
          <AuthForm />
          <USeparator class="mt-4" color="primary" type="solid" />
          <MainNavigation class="mt-4" />
        </template>
      </UDrawer>
    </div>
  </header>
</template>

<style scoped>
/* header {
} */
</style>
