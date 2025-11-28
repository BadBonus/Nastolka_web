<script setup lang="ts">
defineOptions({
  name: "UsersPage",
});
</script>

<template>
  <section class="UsersPage">
    <header class="relative">
      <NuxtImg
        class="h-35 w-full rounded-lg object-cover"
        src="images/wod_1.png"
      />
      <NuxtImg
        class="absolute -bottom-4 left-2 h-25 w-25 rounded-full border-2"
        src="https://github.com/benjamincanac.png"
      />
    </header>
    <h1 class="-truncate mt-3.5 mb-1 text-3xl font-semibold">
      Jack Black Black Black
    </h1>

    <span class="text-xl font-semibold"> Сыграл: 100500 игр </span>

    <section></section>

    <section class="text-center">
      <h1 class="mb-0 text-2xl font-semibold">Обо мне</h1>
      <span class="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero omnis
        tempora hic incidunt, assumenda vel modi dolor soluta aut dolores cumque
        itaque recusandae inventore sapiente ducimus, odio voluptate atque
        veniam! tempora hic incidunt, assumenda vel modi dolor soluta aut
        dolores cumque itaque recusandae inventore sapiente ducimus, odio
        voluptate atque veniam! tempora hic incidunt, assumenda vel modi dolor
        soluta aut dolores cumque itaque recusandae inventore sapiente ducimus,
        odio voluptate atque veniam! tempora hic incidunt, assumenda vel modi
        dolor soluta aut dolores cumque itaque recusandae inventore sapiente
        ducimus, odio voluptate atque veniam!
      </span>
    </section>

    <section class="mt-3">
      <h2 class="mb-2 text-center text-xl font-semibold">Достижения</h2>
      <ul class="flex flex-wrap gap-1.5">
        <li title="Описание" v-for="i in 9" class="size-12">
          <nuxt-img class="rounded" src="images/achieve.png" />
        </li>
      </ul>
    </section>
  </section>
</template>

<!-- <style lang="scss"></style> -->
