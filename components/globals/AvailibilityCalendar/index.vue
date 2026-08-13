<script setup lang="ts">
import { daysConfig, timePeriodsConfig, type ScheduleInterval } from './utils';

defineOptions({
  name: 'AvailibilityCalendar',
});

const model = defineModel<ScheduleInterval[]>({
  default: () => [],
});

defineProps<{
  blocked?: boolean;
}>();

const toggleTiming = (dayOfWeek: number, startTime: number, endTime: number) => {
  const currentList = model.value ?? [];
  const index = currentList.findIndex(
    (item) => item.dayOfWeek === dayOfWeek && item.startTime === startTime && item.endTime === endTime
  );

  if (index !== -1) {
    model.value = currentList.filter((_, i) => i !== index);
  } else {
    model.value = [...currentList, { dayOfWeek, startTime, endTime }];
  }
};

const isSlotActive = (dayOfWeek: number, startTime: number, endTime: number): boolean => {
  return (model.value ?? []).some(
    (item) => item.dayOfWeek === dayOfWeek && item.startTime === startTime && item.endTime === endTime
  );
};
</script>

<template>
  <div class="AvailibilityCalendar">
    <ul class="flex gap-1 pl-6">
      <li
        v-for="tp in timePeriodsConfig"
        :key="tp.id"
        class="AvailibilityCalendar__namePeriods flex flex-col justify-end gap-1"
      >
        <Component :is="tp.icon" class="fill-primary mx-auto w-6" />
        {{ tp.id }}
      </li>
    </ul>
    <div class="flex gap-1.5">
      <ul class="flex flex-col gap-1">
        <li v-for="day in daysConfig" :key="day.dayOfWeek" class="AvailibilityCalendar__nameDays">
          {{ day.shortName }}
        </li>
      </ul>
      <ul class="flex gap-1">
        <li v-for="tp in timePeriodsConfig" :key="tp.id" class="flex flex-col gap-1">
          <button
            v-for="day in daysConfig"
            :key="day.dayOfWeek"
            type="button"
            @click="() => !blocked && toggleTiming(day.dayOfWeek, tp.startTime, tp.endTime)"
            class="AvailibilityCalendar__button"
            :class="{
              active: isSlotActive(day.dayOfWeek, tp.startTime, tp.endTime),
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
