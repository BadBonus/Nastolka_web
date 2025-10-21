<script setup lang="ts">
import { game_adv_types } from "@/shared/gameAttrs";
import { events } from "@/shared/demo/events";

const ALL_EVENTS_ID = "all";

defineOptions({
  name: "ProfileGames",
});

const tabs = [
  { value: ALL_EVENTS_ID, name: "Все" },
  ...game_adv_types.map((el) => ({ value: el.id, name: el.name })),
];

const currentTab = ref(tabs[0].value);
const preparedEvents = computed(() => {
  const x = {
    [ALL_EVENTS_ID]: events,
    [game_adv_types[0].id]: events.slice(0, 3),
    [game_adv_types[1].id]: events.slice(3, 10),
  };
  return x[currentTab.value];
});
</script>
<template>
  <section class="ProfileGames">
    <h1 class="mb-0.5 text-center text-2xl font-semibold">Ближайшие игры</h1>
    <Tabs class="text-center" :tabs="tabs" v-model="currentTab" />
    <EventList class="mt-2" :items="preparedEvents" />
  </section>
</template>

<!--<style lang="scss"></style>-->
