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
    class="MainHeader bg-bg-header border-b-brown relative z-10 h-16 border-b-4 px-4"
  >
    <div class="MainHeader__decore"></div>
    <div class="relative z-10 flex h-full w-full items-center justify-between">
      <NuxtLink to="/" class="text-inverted flex items-center gap-1 text-3xl">
        <span class="font-decorate font-bold max-md:hidden"> NASTOLKA </span>
        <Icon name="game-icons:cubes" />
      </NuxtLink>

      <div class="flex items-center gap-3">
        <NotificationPopup />
        <Drawer :isAuth="authStore.isAuthenticated" />
      </div>
    </div>
  </header>
</template>

<style>
.MainHeader__decore {
  width: 100%;
  height: 103%;
  background-repeat: repeat;
  background-image: url("/images/bg_decors/wood.webp");
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  opacity: 0.4;
}
</style>
