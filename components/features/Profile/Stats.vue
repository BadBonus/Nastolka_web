<script setup lang="ts">
import type { TSkillItem } from "@/shared/skills";
import { titleRussian } from "@/shared/skills";

defineOptions({
  name: "ProfileStatsComments",
});

const props = withDefaults(
  defineProps<{
    skills: TSkillItem[];
  }>(),
  {
    skills: () => [],
  },
);
const modifiedSkills = computed(() => {
  return props.skills.map((skill) => ({
    ...skill,
    title: titleRussian[skill.id],
  }));
});
</script>
<template>
  <article class="ProfileStatsComments">
    <section class="mb-4">
      <ul
        class="bg-elements-surface border-border shadow-element flex justify-evenly rounded-sm border-2 p-1"
      >
        <li
          v-for="skill in modifiedSkills"
          :key="skill.id"
          class="flex flex-col items-center justify-center gap-1 rounded text-2xl"
          :title="skill.title"
        >
          <Icon :name="skill.icon" class="block" />
          <span class="block">{{ skill.rating }}</span>
        </li>
      </ul>
    </section>
  </article>
</template>
