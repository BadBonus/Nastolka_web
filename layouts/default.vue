<script lang="ts" setup>
const rightDrawerOpen = ref(false);
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <MainHeader />
    <MainDrawer />
    <q-page-container>
      <slot />
    </q-page-container>
    <MainFooter />
  </q-layout>
</template>
