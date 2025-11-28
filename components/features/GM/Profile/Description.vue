<script setup lang="ts">
import { ESocLinks } from "@/shared/socLinks";

const linksData = [
  {
    name: ESocLinks.DISCORD,
    link: "ESocLinks.DISCORD",
  },
  {
    name: ESocLinks.INSTAGRAM,
    link: "ESocLinks.INSTAGRAM",
  },
  {
    name: ESocLinks.REDDIT,
    link: "ESocLinks.REDDIT",
  },
  {
    name: ESocLinks.TELEGRAM,
    link: "ESocLinks.TELEGRAM",
  },
];
// 	 type TProfileDescription = {

// 	}

defineOptions({
  name: "ProfileDescription",
});
</script>
<template>
  <section class="ProfileDescription text-center">
    <section class="mt-1">
      <h3 class="text-center text-xl">Соц. сети</h3>
      <soc-links :data="linksData" class="mx-auto" />
    </section>

    <h1 class="mb-0 text-2xl font-semibold">Обо мне</h1>
    <span class="text-sm">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero omnis
      tempora hic incidunt, assumenda vel modi dolor soluta aut dolores cumque
      itaque recusandae inventore sapiente ducimus, odio voluptate atque veniam!
      tempora hic incidunt, assumenda vel modi dolor soluta aut dolores cumque
      itaque recusandae inventore sapiente ducimus, odio voluptate atque veniam!
      tempora hic incidunt, assumenda vel modi dolor soluta aut dolores cumque
      itaque recusandae inventore sapiente ducimus, odio voluptate atque veniam!
      tempora hic incidunt, assumenda vel modi dolor soluta aut dolores cumque
      itaque recusandae inventore sapiente ducimus, odio voluptate atque veniam!
    </span>

    <div class="mt-1">
      <h2 class="text-xl font-semibold">Как я провожу игры?</h2>
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
    </div>
  </section>
</template>
