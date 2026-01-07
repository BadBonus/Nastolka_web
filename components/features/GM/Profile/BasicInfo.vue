<script setup lang="ts">
import { skillItems } from "@/shared/skills";
// 	 type TProfileBasicInfo = {

// 	}

defineOptions({
  name: "ProfileBasicInfo",
});
</script>
<template>
  <section>
    <section class="ProfileBasicInfo flex justify-between gap-1">
      <div class="flex items-center gap-1">
        <Icon
          class="text-2xl"
          name="material-symbols-light:star-shine-outline-rounded"
        />

        <span class="text-base"> 5.0 (29) </span>
      </div>
      <div class="flex items-center gap-1 text-lg">
        <Icon class="text-lg" name="game-icons:dice-target" />
        <span class="text-base">Водит 3 года</span>
      </div>
      <div class="flex items-center gap-1 text-lg">
        <Icon class="text-lg" name="game-icons:flying-flag" />
        <span class="text-base"> 11 сессий</span>
      </div>
      <div class="flex items-center text-lg">
        <Icon class="text-lg" name="i-mdi:currency-usd" />
        <span class="text-base"> 11</span>
      </div>
    </section>

    <ProfileStats class="mt-2" :skills="skillItems.gamemaster" />
  </section>
</template>

<!--<style lang="scss"></style>-->
