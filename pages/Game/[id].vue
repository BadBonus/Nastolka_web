<script setup lang="ts">
defineOptions({
  name: "GamePage",
});

const route = useRoute();
</script>

<template>
  <article c>
    <NuxtImg class="h-24 w-full object-cover" src="/images/WOD_logo.webp" />

    <section class="text-center">
      <h1 class="mb-0.5 text-3xl font-semibold">
        Приключение на 1 час в днд #1 dasdasdasdasdasd
      </h1>
      <span class="text-sm italic opacity-70"> Pathfinder 2e </span>

      <game-common-attrs class="mt-4" />
    </section>

    <section class="text-center">
      <h1 class="text-3xl font-semibold">Место проведения</h1>
      <GamePlaceAndToolls class="mt-4" />
    </section>

    <section class="text-center">
      <h1 class="text-3xl font-semibold">Детали приключения</h1>
      <GameDetails class="mt-4" />
    </section>

    <section class="text-center">
      <h1 class="text-3xl font-semibold">Гейм-мастер</h1>
      <GameGM class="mt-4" />
    </section>
  </article>
</template>

<style>
.layout_main {
  padding-top: 0;
}
</style>
