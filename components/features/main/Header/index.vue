<script setup lang="ts">
import Drawer from "./Drawer.vue";
import NotificationPopup from "./NotificationPopup.vue";

defineOptions({
  name: "MainHeader",
});

const authStore = useAuthStore();
</script>
<template>
  <header
    class="bg-bg-header border-b-brown flex h-16 w-full items-center justify-between border-b-4 px-4"
  >
    <NuxtLink to="/" class="text-inverted flex items-center gap-1 text-3xl">
      <span class="font-decorate font-bold max-md:hidden"> NASTOLKA </span>
      <Icon name="game-icons:cubes" />
    </NuxtLink>

    <div class="flex items-center gap-3">
      <NotificationPopup />
      <Drawer :isAuth="authStore.isAuthenticated" />
    </div>
  </header>
</template>
