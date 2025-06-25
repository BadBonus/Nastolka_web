<script setup lang="ts">
import RowOrigin from "./RowOrigin.vue";

defineOptions({
  name: "GameCalendarHeader",
});

const isAllVars = ref<boolean>(true);
const search = ref<string>("");
const choosedDate = ref<Date>(new Date());
const test = (data) => {
  console.log(data);
};
</script>
<template>
  <nav class="GameCalendarHeader">
    <CalendarRow @change-date="test" v-model="choosedDate" />
    <RowOrigin v-model="search" v-model:is-all-vars="isAllVars" />
  </nav>
</template>

<!--<style lang="scss"></style>-->
