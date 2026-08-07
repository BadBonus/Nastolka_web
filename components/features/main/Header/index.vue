<script setup lang="ts">
import Drawer from "./Drawer.vue";
import NotificationPopup from "./NotificationPopup.vue";

defineOptions({
  name: "MainHeader",
});

const authStore = useAuthStore();
</script>
<template>
  <header class="MainHeader relative z-10 h-13 px-4 pt-2">
    <div class="MainHeader__decore"></div>
    <div class="relative z-10 flex h-full w-full items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-1 text-3xl  text-inverted">
        <span class="font-decorate font-bold max-md:hidden"> NASTOLKA </span>
        <Icon name="game-icons:cubes " />
      </NuxtLink>

      <div class="flex items-center gap-3">
        <NotificationPopup />
        <Drawer :is-auth="authStore.isAuthenticated" />
      </div>
    </div>
  </header>
</template>

<style>
.MainHeader {
  background: var(--color-white);
  color: var(--color-text-primary);
  border-bottom: 10px solid transparent;
  border-image-source: url("/images/bg_decors/svg/border_line.svg");
  border-image-slice: 10;
  border-image-repeat: round;
  border-image-outset: 6px;
  box-shadow: 0px 5px 10px black;
}
.MainHeader__decore {
  width: 100%;
  height: 103%;
  /* background-repeat: repeat; */
  /* background-image: url("/images/bg_decors/paper.jpg"); */
  background-size: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  /* opacity: 0.4; */
}
</style>
