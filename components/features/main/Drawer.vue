<script setup lang="ts">
const { open } = useMainDraw();

defineOptions({
  name: "MainDrawer",
});
</script>
<template>
  <q-drawer v-model="open" side="right" overlay bordered> </q-drawer>
</template>

<!--<style lang="scss"></style>-->
