<script setup lang="ts">
import { events } from '@/shared/demo/events';
import { SessionType } from '#openApi/enums';
import { formatUnderscoreToSpace } from '@/utils/transformers/formatUnderscoreToSpace';

const ALL_EVENTS_ID = 'all';

defineOptions({
  name: 'ProfileGames',
});

const tabs = [
  { value: ALL_EVENTS_ID, name: 'Все' },
  ...SessionType.map((value) => ({ value, name: formatUnderscoreToSpace(value) })),
];

const currentTab = ref(ALL_EVENTS_ID);
const preparedEvents = computed(() => {
  const x: Record<string, typeof events> = {
    [ALL_EVENTS_ID]: events,
    ONE_SHOT: events.slice(0, 3),
    CAMPAIGN: events.slice(3, 10),
  };
  return x[currentTab.value] ?? events;
});
</script>
<template>
  <section class="ProfileGames">
    <h1 class="mb-0.5 text-center text-2xl font-semibold">Ближайшие игры</h1>
    <Tabs class="text-center" :tabs="tabs" v-model="currentTab" />
    <EventList class="mt-2" :items="preparedEvents" />
  </section>
</template>
