<script setup lang="ts">
import { daysConfig, timePeriodsConfig } from "./utils";
import { EDays, ETimePeriods, type TDataAvaCalendar } from "./types";

defineOptions({
  name: "AvailibilityCalendar",
});

const model = defineModel<TDataAvaCalendar>();

const addTiming = (day: EDays, timePeriod: ETimePeriods) => {
  const initValue = model.value ? { ...model.value } : {};

  if (!initValue[day]) initValue[day] = [];

  const daySchedule = [...(initValue[day] as ETimePeriods[])];
  const indexOfValue = daySchedule.indexOf(timePeriod);

  if (indexOfValue === -1) daySchedule.push(timePeriod);
  else daySchedule.splice(indexOfValue, 1);

  initValue[day] = daySchedule;
  model.value = initValue;
};

const isSlotActive = (day: EDays, timePeriod: ETimePeriods): boolean => {
  return !!model.value?.[day]?.includes(timePeriod);
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
        <NuxtImg
          class="mx-auto"
          :src="`images/svg/availibilityCalendar/${timePeriodsConfig[index].icon}`"
        />
        {{ timePeriodsConfig[index].id }}
      </li>
    </ul>
    <div class="flex gap-1.5">
      <ul class="flex flex-col gap-1">
        <li
          v-for="(day, index) in daysConfig"
          :key="day.shortName"
          class="AvailibilityCalendar__nameDays"
        >
          {{ day.shortName }}
        </li>
      </ul>
      <ul class="flex gap-1">
        <li
          v-for="tp in timePeriodsConfig"
          :key="tp.id"
          class="flex flex-col gap-1"
        >
          <button
            type="button"
            @click="() => addTiming(day.id, tp.id)"
            class="AvailibilityCalendar__button"
            v-for="day in daysConfig"
            :key="day.id"
            :class="{
              active: isSlotActive(day.id, tp.id),
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
    border: 2px solid var(--color-secondary);
    border-radius: var(--radius-md);
    transition-property: background, color;
    transition: 0.25s;
    text-align: center;

    &:hover {
      background: var(--color-primary-hover);
    }

    &.active {
      background: var(--color-primary);
    }
  }
}
</style>
