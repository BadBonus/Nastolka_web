<script setup lang="ts">
import { gms } from "@/shared/demo/favorites";
// 	 type TSubscriptionsGms = {

// 	}

defineOptions({
  name: "SubscriptionsGms",
});
</script>
<template>
  <div class="SubscriptionsGms">
    <h2 class="text-center text-2xl font-bold">Гм-ы</h2>
    <ul class="mt-1 flex flex-col gap-1.5">
      <li v-for="(gm, index) in gms" :key="index">
        <GmCard v-bind="gm" />
      </li>
    </ul>
  </div>
</template>

<!--<style lang="scss"></style>-->
