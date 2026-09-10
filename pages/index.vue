<script setup lang="ts">
import { events } from '@/shared/demo/events';
import Event from '~/components/globals/EventList/Event.vue';
import EventProto from '~/components/globals/EventList/EventProto.vue';
defineOptions({
  name: 'PagesIndex',
});

const flipstate = ref(false);
const test = () => {
  console.log('object');
};

const demoGm = {
  id: 1,
  nickname: 'AgentSmith',
  gamesCount: 5,
  averagePrice: '$100',
  isNewbie: true,
  gameSystems: ['DnD 5e', 'Pathfinder 2e', 'WH 40k', 'WH fanfasy', 'SomeOtherGame', 'S T A L K E R'],
};

const val = ref<string>('');
</script>

<template>
  <div class="flex gap-1">
    <UButton>Test</UButton>
    <UButton variant="outline" color="primary">primary</UButton>
    <UButton color="warning">warning</UButton>
    <UButton color="error">error</UButton>
    <UButton color="info">info</UButton>
    <UButton color="neutral">neutral</UButton>
    <UButton color="secondary">secondary</UButton>
    <UButton color="success">success</UButton>
  </div>
  <br />

  <!-- <SearchFilterInput v-model="val" /> -->
  <SearchFilterInputDemoSearchFilter />
  <!-- <KeyValueSearchInput /> -->
  <!-- <EventList :items="events.slice(0, 1)" />
  <br />
  <div class=" ">
    <GmCard
      class="w-[320px]"
      v-bind="demoGm"
      description="texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext "
    />
    <br />
    <GmCard class="w-[320px]" :link="'/gm/1'" nickname="AgentSmith" :gamesCount="10" :averagePrice="'$100'" /> -->
  <!-- </div> -->
</template>
