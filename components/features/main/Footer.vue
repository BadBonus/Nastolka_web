<script setup lang="ts">
defineOptions({
  name: "MainFooter",
});
</script>
<template>
  <footer class="bg-bg-footer border-t-brown relative w-full border-t-4 p-6">
    <div class="text-inverted relative z-10 flex items-center gap-1 text-3xl">
      <span class="font-decorate font-bold"> NASTOLKA </span>
      <Icon name="game-icons:cubes" />
    </div>
    <div class="MainFooter__decore"></div>
  </footer>
</template>

<style scoped>
.MainFooter__decore {
  width: 100%;
  height: 103%;
  background-repeat: repeat;
  background-image: url("/images/bg_decors/wood.webp");
  position: absolute;
  left: 0;
  top: -3%;
  z-index: 0;
  opacity: 0.4;
}
</style>
