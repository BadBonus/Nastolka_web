<script setup lang="ts">
import { events } from "@/shared/demo/events";
// 	 type TProfileHistory = {

// 	}

defineOptions({
  name: "ProfileHistory",
});

const page = ref(5);
</script>
<template>
  <section class="ProfileHistory pt-2.5">
    <event-list :items="events" />
    <UPagination class="mx-auto mt-3 w-fit" v-model:page="page" :total="100" />
  </section>
</template>

<!--<style lang="scss"></style>-->
