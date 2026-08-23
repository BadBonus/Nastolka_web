<script setup lang="ts">
import { events } from '@/shared/demo/events';
import EventProto from '~/components/globals/EventList/EventProto.vue';
defineOptions({
  name: 'PagesIndex',
});

const flipstate = ref(false);
const test = () => {
  console.log('object');
};
</script>

<template>
  <div class="flex gap-1">
    <UButton>Test</UButton>
    <UButton color="primary">primary</UButton>
    <UButton color="warning">warning</UButton>
    <UButton color="error">error</UButton>
    <UButton color="info">info</UButton>
    <UButton color="neutral" class="sketchy-border-5">neutral</UButton>
    <UButton color="secondary">secondary</UButton>
    <UButton color="success">success</UButton>
  </div>
  <br />
  <div class=" ">
    <EventProto @click.stop="test" v-bind="events[0]" />
    <br />
    <EventList :items="events" />
    <!--
    <FlipCard @click="flipstate = !flipstate" :isFlipped="flipstate" class="h-60 w-full" trigger="click">
      <EventProto @click.stop="test" v-bind="events[0]" />
      <template #back> test back </template>
    </FlipCard> -->
    <!-- <event-list :items="events" /> -->
  </div>
</template>
