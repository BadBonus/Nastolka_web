<script setup lang="ts">
import Event from "./Event.vue";
type TEventListIndex = {
  items: TGamesCalendarEvent[];
};

defineOptions({
  name: "EventList",
});

defineProps<TEventListIndex>();
</script>
<template>
  <ul class="EventList flex flex-col gap-3">
    <li v-for="event in items" :key="event.id">
      <NuxtLink :to="'/game' + event.link">
        <article>
          <Event v-bind="event" />
        </article>
      </NuxtLink>
    </li>
  </ul>
</template>

<!--<style lang="scss"></style>-->
