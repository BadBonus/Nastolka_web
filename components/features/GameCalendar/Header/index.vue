<script setup lang="ts">
import FilterRow from "./FilterRow.vue";
import RowOrigin from "./RowOrigin.vue";
import ModalFilters from "../ModalFilters/index.vue";

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
    <FilterRow class="mt-3" />
  </nav>
</template>

<!--<style lang="scss"></style>-->
