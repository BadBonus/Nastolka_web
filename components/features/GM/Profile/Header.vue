<script setup lang="ts">
defineOptions({
  name: "ProfileHeader",
});
</script>
<template>
  <header class="ProfileHeader">
    <div class="relative">
      <NuxtImg
        class="h-35 w-full rounded-lg object-cover"
        src="images/wod_1.png"
      />
      <NuxtImg
        class="absolute -bottom-4 left-2 h-25 w-25 rounded-full border-2"
        src="https://github.com/benjamincanac.png"
      />

      <div
        class="absolute top-0 right-0 ml-auto flex h-full flex-col justify-between self-stretch py-2 pr-2"
      >
        <Button
          class="rounded-full p-2!"
          color="danger"
          icon="material-symbols:favorite"
          size="sm"
        />

        <Button
          class="rounded-full p-2!"
          color="info"
          icon="streamline-freehand:messages-bubble-menu"
          size="lg"
        />
      </div>
    </div>

    <section class="mt-3.5 flex items-center justify-between">
      <h1 class="-truncate my-0 text-3xl font-semibold">
        Jack Black Black Black
      </h1>
      <Button class="h-fit" icon="i-game-icons:cubes" icon-pos="right"
        >Запрос</Button
      >
    </section>
  </header>
</template>

<!--<style lang="scss"></style>-->
