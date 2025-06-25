<script setup lang="ts">
// 	 type TGameCalendarIndex = {

// 	}

const choosedDate = ref<Date>(new Date());

defineOptions({
  name: "GameCalendarIndex",
});

const test = (data) => {
  console.log(data);
};
</script>
<template>
  <div class="GameCalendarIndex">
    <CalendarRow @change-date="test" v-model="choosedDate" />
  </div>
</template>

<!--<style></style>-->
