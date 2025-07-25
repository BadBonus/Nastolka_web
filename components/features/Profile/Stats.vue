<script setup lang="ts">
import { ESkillPlayer, ESkillGameMaster } from "@/shared/skills";

type TProfileStatsComments = {
  title: ESkillPlayer | ESkillGameMaster;
  rating: number;
};

defineOptions({
  name: "ProfileStatsComments",
});

defineProps<{
  skills: (ESkillPlayer | ESkillGameMaster)[];
}>();
</script>
<template>
  <article class="ProfileStatsComments">
    <h1 class="mb-4 text-center text-2xl font-semibold">Отзывы и оценка</h1>

    <section class="mb-4">
      <h2 class="mb-3 text-xl font-semibold">Оценки навыков</h2>
      <ul
        class="bg-elements-surface border-border shadow-element flex justify-between rounded-sm border-2 p-1"
      >
        <li
          class="flex flex-col items-center justify-center gap-1 rounded text-2xl"
          title="Креативность"
        >
          <Icon name="game-icons:light-bulb" class="block" />
          <span class="block">5</span>
        </li>
        <li
          class="flex flex-col items-center justify-center gap-1 rounded text-2xl"
          title="Сторителлинг"
        >
          <Icon name="game-icons:teacher" class="block" />
          <span class="block">33</span>
        </li>
        <li
          class="flex flex-col items-center justify-center gap-1 rounded text-2xl"
          title="Актерство"
        >
          <Icon name="game-icons:duality-mask" class="block" />
          <span class="block">1</span>
        </li>
        <li
          class="flex flex-col items-center justify-center gap-1 rounded text-2xl"
          title="Проработка мира"
        >
          <Icon name="game-icons:world" class="block" />
          <span class="block">13</span>
        </li>
        <li
          class="flex flex-col items-center justify-center gap-1 rounded text-2xl"
          title="Обучение игроков"
        >
          <Icon name="game-icons:graduate-cap" class="block" />
          <span class="block">134</span>
        </li>
      </ul>
    </section>
  </article>
</template>
