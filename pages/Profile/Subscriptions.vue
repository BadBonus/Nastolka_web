<script setup lang="ts">
import { gms } from "@/shared/demo/favorites";
// 	 type TProfileSubscriptions = {

// 	}

defineOptions({
  name: "ProfileSubscriptions",
});
</script>
<template>
  <section class="ProfileSubscriptions">
    <ul class="mt-1 flex flex-col gap-1.5">
      <li v-for="(gm, index) in gms" :key="index">
        <GmCard v-bind="gm" />
      </li>
    </ul>
  </section>
</template>

<!--<style lang="scss"></style>-->
