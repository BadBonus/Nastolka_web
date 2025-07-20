<script setup lang="ts">
const { toggleDrawState } = useMainDraw();

const open = ref<boolean>(false);
const route = useRoute();
const authStore = useAuthStore();

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
      <span class="font-decorate font-bold max-md:hidden"> NASTOLKA </span>
      <Icon name="game-icons:cubes" />
    </NuxtLink>

    <div>
      <UDrawer
        v-model:open="open"
        :ui="{
          header: 'flex items-center justify-between',
          content: 'min-w-[320px]',
        }"
        direction="right"
      >
        <UButton color="primary">
          <Icon name="ci:hamburger-lg" />
        </UButton>

        <template #header>
          <h2
            v-if="!authStore.isAuthenticated"
            class="text-highlighted font-main text-4xl font-bold"
          >
            Hi!
          </h2>
          <UsersDrawerBaseInfo v-else />

          <Button
            icon="i-lucide-x"
            color="primary"
            variant="filled"
            @click="open = false"
            only-icon
          />
        </template>

        <template #body>
          <AuthForm v-if="!authStore.isAuthenticated" />
          <UsersDrawerNav v-else />
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
