<script setup lang="ts">
import { daysConfig, timePeriodsConfig } from './utils';
import type { TDataAvaCalendar } from '~/components/globals/AvailibilityCalendar/gameShedule';
import { EDays, ETimePeriods } from '#consts/gameShedule';

defineOptions({
  name: 'AvailibilityCalendar',
});

const model = defineModel<TDataAvaCalendar>({
  default: () => new Map(),
});

defineProps<{
  blocked?: boolean;
}>();

const addTiming = (day: EDays, timePeriod: ETimePeriods) => {
  const nextMap = new Map(model.value);
  const daySchedule = new Set(nextMap.get(day));

  if (daySchedule.has(timePeriod)) {
    daySchedule.delete(timePeriod);
  } else {
    daySchedule.add(timePeriod);
  }

  if (daySchedule.size === 0) {
    nextMap.delete(day);
  } else {
    nextMap.set(day, daySchedule);
  }

  model.value = nextMap;
};

const isSlotActive = (day: EDays, timePeriod: ETimePeriods): boolean => {
  return model.value?.get(day)?.has(timePeriod) ?? false;
};
</script>

<template>
  <div class="AvailibilityCalendar">
    <ul class="flex gap-1 pl-6">
      <li
        class="AvailibilityCalendar__namePeriods flex flex-col justify-end gap-1"
        v-for="(tp_name, index) in timePeriodsConfig.length"
        :key="tp_name"
      >
        <!-- <NuxtImg class="mx-auto" :src="`images/svg/availibilityCalendar/${ || ''}`" /> -->
        <Component :is="timePeriodsConfig[index]?.icon" class="fill-primary mx-auto w-6" />
        {{ timePeriodsConfig[index]?.id || '' }}
      </li>
    </ul>
    <div class="flex gap-1.5">
      <ul class="flex flex-col gap-1">
        <li v-for="day in daysConfig" :key="day.shortName" class="AvailibilityCalendar__nameDays">
          {{ day.shortName }}
        </li>
      </ul>
      <ul class="flex gap-1">
        <li v-for="tp in timePeriodsConfig" :key="tp.id" class="flex flex-col gap-1">
          <button
            type="button"
            @click="() => !blocked && addTiming(day.id, tp.id)"
            class="AvailibilityCalendar__button"
            v-for="day in daysConfig"
            :key="day.id"
            :class="{
              active: isSlotActive(day.id, tp.id),
              'pointer-events-none': blocked,
            }"
          ></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.AvailibilityCalendar {
  --btn_width: 76px;
  --btn_height: 32px;

  .AvailibilityCalendar__namePeriods {
    text-align: center;
    width: var(--btn_width);
    text-align: center;
  }

  .AvailibilityCalendar__nameDays {
    height: var(--btn_height);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .AvailibilityCalendar__button {
    width: var(--btn_width);
    height: var(--btn_height);
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-md);
    transition-property: background, color;
    transition: 0.25s;
    text-align: center;

    &:hover {
      background: var(--color-primary-100);
    }

    &.active {
      background: var(--color-primary);
    }
  }
}
</style>
