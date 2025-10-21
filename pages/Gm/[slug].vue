<script setup lang="ts">
import { demoComments } from "@/shared/demo/comments";

defineOptions({
  name: "Gmindex",
});

const demoTags = ref<string[]>(["test"]);
</script>

<template>
  <section class="mt-2">
    <GMProfileHeader />
    <GMProfileBasicInfo class="mt-1.5" />
    <section>
      <h2 class="text-center text-xl font-semibold">Оценка и отзывы</h2>
      <div
        class="my-2 flex items-center justify-center gap-1.5 text-xl font-semibold"
      >
        <Star />
        <!-- <Icon class="text-amber-300" name="material-symbols:star" /> -->
        <span> 5.0 (29) </span>
      </div>
      <UserComments :comments="demoComments" />
    </section>
    <GMProfileDescription class="mt-1.5" />
    <GMProfilePreferences class="mt-1.5" />
    <GMProfileGames class="mt-8" />
    <Button class="mt-3 h-fit w-full" icon="i-game-icons:cubes" icon-pos="right"
      >Заказать игру у мастера</Button
    >
  </section>
</template>

<!-- <style lang="scss"></style> -->
