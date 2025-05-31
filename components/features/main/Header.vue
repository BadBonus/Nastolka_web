<script setup lang="ts">
const { toggleDrawState } = useMainDraw();

defineOptions({
  name: "MainHeader",
});
</script>
<template>
  <div class="MainHeader">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <Icon name="game-icons:cubes" />
          </q-avatar>
          NASTOLKA
        </q-toolbar-title>

        <q-tabs class="max-md:hidden!" align="right">
          <q-route-tab to="/page1" label="Page One" />
          <q-route-tab to="/page2" label="Page Two" />
          <q-route-tab to="/page3" label="Page Three" />
        </q-tabs>
        <q-btn dense flat round icon="menu" @click="toggleDrawState()" />
      </q-toolbar>
    </q-header>
  </div>
</template>

<!--<style lang="scss"></style>-->
