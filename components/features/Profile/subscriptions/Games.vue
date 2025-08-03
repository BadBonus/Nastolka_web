<script setup lang="ts">
import { events } from "@/shared/demo/events";
// 	 type TSubscriptionsGames = {

// 	}

defineOptions({
  name: "SubscriptionsGames",
});
</script>
<template>
  <div class="SubscriptionsGames">
    <h2 class="mt-2 text-center text-2xl font-bold">
      Запланированные игры от ваших фаворитов
    </h2>
    <EventList class="mt-4" :items="events" />
  </div>
</template>

<!--<style lang="scss"></style>-->
