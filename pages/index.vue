<script setup lang="ts">
defineOptions({
  name: "PagesIndex",
});

const demo = [
  {
    id: "1",
    name: "Gedet",
  },
  {
    id: "2",
    name: "DDDD",
  },
  {
    id: "$",
    name: "dasdasdasd",
  },
] as { id: string; name: string }[];
</script>

<template>
  <div>
    <Splide
      :slides="demo"
      :options="{
        type: 'loop',
        autoplay: true,
        perPage: 1,
        gap: '1rem',
      }"
    >
      <template #slide="{ slide }">
        <div class="text-center">
          <mark>{{ slide.id }}</mark>
          <mark>{{ slide.name }}</mark>
        </div>
      </template>
    </Splide>
  </div>
</template>
