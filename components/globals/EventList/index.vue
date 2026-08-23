<script setup lang="ts">
import Event from './Event.vue';
type TEventListIndex = {
  items: TGamesCalendarEvent[];
};

defineOptions({
  name: 'EventList',
});

defineProps<TEventListIndex>();
</script>
<template>
  <ClientOnly>
    <ul class="EventList flex flex-col gap-6">
      <li v-for="event in items" :key="event.id">
        <NuxtLink :to="'/game' + '/' + event.link">
          <article>
            <Event v-bind="event" />
          </article>
        </NuxtLink>
      </li>
    </ul>
  </ClientOnly>
</template>

<!--<style lang="scss"></style>-->
