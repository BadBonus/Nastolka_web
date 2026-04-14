<script setup lang="ts">
defineOptions({
  name: "MainFooter",
});
</script>
<template>
  <footer class="relative w-full px-4 py-1">
    <div class="relative z-10 flex items-center gap-1 text-3xl">
      <span class="font-decorate font-bold"> NASTOLKA </span>
      <Icon name="game-icons:cubes" />
    </div>
    <div class="MainFooter__decore"></div>
  </footer>
</template>

<style scoped>
footer {
  box-shadow: 0px -14px 16px 6px black;
  color: var(--color-text-primary);
  background-color: var(--color-white);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-image: url(/images/bg_decors/svg/footer.svg);
    background-size: cover;
    bottom: 38px;
  }
}
.MainFooter__decore {
  width: 100%;
  height: 103%;
  background-repeat: repeat;
  position: absolute;
  left: 0;
  top: -3%;
  z-index: 0;
}
</style>
