<script setup lang="ts">
defineOptions({
  name: "GmIndex",
});

const demodata = [
  {
    id: 100500,
    link: "123",
    name: "Example Game",
    rating: {
      value: 4.5,
      count: 100,
    },
    gamesCount: 10,
    averagePrice: "$29.99",
  },
  {
    id: 1020500,
    link: "123",
    name: "Example Game",
    rating: {
      value: 4.5,
      count: 100,
    },
    gamesCount: 10,
    averagePrice: "$29.99",
  },
];
</script>

<template>
  <section class="GmPage">
    <g-m-filter-sort-panel />
    <ul class="mt-4 flex flex-col gap-2.5">
      <li v-for="item in demodata" :key="item.id">
        <gm-card v-bind="item" :link="`/gm/${item.link}`" />
      </li>
    </ul>
  </section>
</template>

<!-- <style ></style> -->
