<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import "./vars.css";

interface DatePickerRangeObject {
  start: Date | null;
  end: Date | null;
}

type DatePickerDate =
  | number
  | string
  | Date
  | null
  | {
      start?: number | string | Date | null;
      end?: number | string | Date | null;
    };

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<
      DatePickerDate | DatePickerRangeObject | null
    >,
    default: null,
  },
});

const emit = defineEmits(["update:model-value", "close"]);

const date = computed({
  get: () => {
    // If using range mode, ensure start and end are defined and not undefined
    if (
      props.modelValue &&
      typeof props.modelValue === "object" &&
      "start" in props.modelValue &&
      "end" in props.modelValue
    ) {
      const { start, end } = props.modelValue as DatePickerRangeObject;
      return {
        start: start === undefined ? null : start,
        end: end === undefined ? null : end,
      };
    }
    return props.modelValue;
  },
  set: (value) => {
    emit("update:model-value", value);
    emit("close");
  },
});

const attrs = {
  transparent: true,
  borderless: true,
  color: "primary",
  "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 2,
};

function onDayClick(_: any, event: MouseEvent): void {
  const target = event.target as HTMLElement;
  target.blur();
}
</script>

<template>
  <VCalendarDatePicker
    class="date-picker"
    v-if="
      date &&
      (date as DatePickerRangeObject)?.start &&
      (date as DatePickerRangeObject)?.end
    "
    v-model.range="date"
    :columns="2"
    v-bind="{ ...attrs, ...$attrs }"
    @dayclick="onDayClick"
  />
  <VCalendarDatePicker
    class="date-picker"
    v-else
    v-model="date"
    v-bind="{ ...attrs, ...$attrs }"
    @dayclick="onDayClick"
  />
</template>

<style>
.date-picker {
  .vc-title {
    color: var(--color-text);
  }

  .vc-arrow {
    color: var(--color-text);
    border-radius: 100%;

    &:hover {
      background: var(--color-neutral-light);
    }
  }

  .vc-weekday,
  .vc-day-content,
  .vc-day {
    color: var(--color-text);
  }
}
</style>
