<script setup lang="ts">
import type { TGamesCalendarEvent } from "@/types/GamesCalendar";
defineProps<TGamesCalendarEvent>();

defineOptions({
  name: "Event",
});

const formatDate = (date: Date | string): string | undefined => {
  const newDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(newDate.getTime())) {
    console.error("formatDate: Передана некорректная дата", date);
    return undefined;
  }

  const dateFormatter = new Intl.DateTimeFormat("default", {
    month: "2-digit",
    day: "2-digit",
  });

  const timeFormatter = new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const formattedDatePart = dateFormatter.format(newDate);
  const formattedTimePart = timeFormatter.format(newDate);

  return `${formattedDatePart} - ${formattedTimePart}`;
};
</script>
<template>
  <UCard
    class="bg-elements-surface border-dark-brown shadow-element border-2 p-1"
    variant="outline"
  >
    <template #header>
      <span class="block text-center text-xl">
        {{ name }}
      </span>
      <span
        v-if="addInfo"
        class="text-bla block text-center text-sm font-bold italic"
      >
        {{ addInfo }}
      </span>
    </template>

    <div class="relative flex justify-between">
      <div class="flex items-center gap-1">
        <Icon name="lucide:users-round" />
        <span>{{ currentUsers }}{{ maxUsers ? "/" : "" }}{{ maxUsers }}</span>
      </div>

      <div class="flex items-center">
        <Icon class="text-xl" name="material-symbols:attach-money" />
        <span>{{ cost }}</span>
      </div>

      <div class="flex items-center">
        <Icon
          class="text-xl"
          name="material-symbols:nest-clock-farsight-analog-outline"
        />
        <span>{{ formatDate(time) }}</span>
      </div>
    </div>

    <template #footer>
      <NuxtLink :to="org.link" class="flex items-center justify-between">
        <div class="-truncate flex items-center gap-1 pr-1">
          <UAvatar src="/images/wod_1.png" class="border-2" />
          <span class="-truncate ml-1 inline-block font-semibold">{{
            org.name
          }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon
            class="text-xl text-amber-300"
            name="material-symbols:star-rate"
          />
          <span class="font-bold">{{ org.rating.value }}</span>
          <span class="inline-block">({{ org.rating.count }})</span>
        </div>
      </NuxtLink>
    </template>
  </UCard>
</template>

<!--<style lang="scss"></style>-->
