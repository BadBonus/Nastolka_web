<script setup lang="ts">
import MonthYear from "./MonthYear.vue";

// 	 type TCalendarRow = {
//
// 	}

const choosedDate = ref<Date>(new Date());

defineOptions({
  name: "CalendarRow",
});
</script>

<template>
  <div class="CalendarRow max-w-[360px]">
    <MonthYear v-model="choosedDate" />
    <mark>{{ choosedDate }}</mark>
  </div>
</template>

<!-- <style lang="scss"></style> -->
