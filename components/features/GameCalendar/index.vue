<script setup lang="ts">
import { eventsFromPlaces } from "./demo/GamesCalendar";
import Header from "./Header/index.vue";

defineOptions({
  name: "GameCalendarIndex",
});

const isAllVars = ref<boolean | undefined>(true);
const search = ref<string | undefined>("");
const choosedDate = ref<Date | null | undefined>(new Date());

const items = computed<
  {
    place: string;
    events: TGamesCalendarEvent[];
  }[]
>(() => {
  const places = Object.keys(eventsFromPlaces);

  return places.map((place) => ({
    events: eventsFromPlaces[place],
    place,
  }));
});
</script>
<template>
  <div class="GameCalendarIndex">
    <Header
      v-model:choosed-date="choosedDate"
      v-model:is-all-vars="isAllVars"
      v-model:search="search"
    />
    <div class="mt-4 flex flex-col gap-4">
      <div v-for="list in items" :key="list.place">
        <USeparator color="primary" type="solid">
          <h3 class="text-2xl font-bold uppercase">{{ list.place }}</h3>
        </USeparator>

        <!-- <EventList class="mt-4" :items="list.events" /> -->
      </div>
    </div>
  </div>
</template>

<!--<style></style>-->
