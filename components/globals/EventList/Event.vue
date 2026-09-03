<script setup lang="ts">
import type { TEvent } from '~/shared/types/gamesCalendar';
defineProps<TEvent>();

defineOptions({
  name: 'Event',
});

const formatDate = (date: Date | string): string | undefined => {
  const newDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(newDate.getTime())) {
    console.error('formatDate: Передана некорректная дата', date);
    return undefined;
  }

  const dateFormatter = new Intl.DateTimeFormat('default', {
    month: '2-digit',
    day: '2-digit',
  });

  const timeFormatter = new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  const formattedDatePart = dateFormatter.format(newDate);
  const formattedTimePart = timeFormatter.format(newDate);

  return `${formattedDatePart} - ${formattedTimePart}`;
};
</script>
<template>
  <UCard
    class="shadow-element text-text bg-inverted-primary relative h-[inherit] border-2 border-[text] p-1"
    variant="outline"
    :ui="{
      header: 'p-2',
      body: 'p-2 sm:p-2',
      footer: 'p-2',
    }"
  >
    <template #header>
      <div class="text-center">
        <span class="block text-xl font-bold">
          {{ name }}
        </span>
        <span v-if="addInfo" class="text-info block text-sm font-bold italic">
          {{ addInfo }}
        </span>
      </div>

      <div class="absolute -top-4.5 right-0 flex gap-1.5">
        <UButton class="sketchy-border-5" color="error" icon="ci:heart-outline" />
        <UButton color="info" icon="game-icons:spock-hand" />
      </div>
    </template>

    <div class="relative z-10 flex justify-between">
      <div class="flex items-center gap-1">
        <Icon name="lucide:users-round" />
        <span>{{ currentUsers }}{{ maxUsers ? '/' : '' }}{{ maxUsers }}</span>
      </div>

      <div class="flex items-center">
        <Icon class="text-xl" name="material-symbols:attach-money" />
        <span>{{ cost }}</span>
      </div>

      <div class="flex items-center">
        <Icon class="text-xl" name="material-symbols:nest-clock-farsight-analog-outline" />
        <span>{{ formatDate(time) }}</span>
      </div>
    </div>

    <template #footer>
      <div class="relative z-10">
        <NuxtLink :to="'/gm/' + org.link" class="flex items-center justify-between">
          <div class="text-text flex items-center gap-1 truncate pr-1">
            <UAvatar src="/images/universal_ava.webp" class="rounded border-2" />
            <span class="ml-1 inline-block truncate">{{ org.name }}</span>
          </div>
          <div class="text-text text-warning flex items-center gap-1">
            <Icon class="text-2xl" name="material-symbols-light:star-shine-outline-rounded" />
            <span class="font-bold">{{ org.rating.value }}</span>
            <span class="inline-block">({{ org.rating.count }})</span>
          </div>
        </NuxtLink>
      </div>
    </template>
  </UCard>
</template>
