<script setup lang="ts">
import { NuxtLink } from "#components";
import StatsComments from "./Stats.vue";
import { skillItems } from "@/shared/skills";

// FIXME: потом пропсы стабилизировать

export type TProfileHeader = {
  link?: string;
  avatar?: string;
  background?: string;
  name?: string;
  badges?: { name: string; description: string }[];
  rating?: {
    value: number;
    count: number;
  };
};
const props = withDefaults(defineProps<TProfileHeader>(), {
  link: undefined,
});

const linkComponent = computed(() => (props.link ? NuxtLink : "span"));

defineOptions({
  name: "ProfileHeader",
});
defineSlots<{ topPart(): any }>();
</script>
<template>
  <header class="ProfileHeader">
    <div class="relative h-28">
      <slot name="topPart" />
      <NuxtImg
        class="-absCenter h-full w-full rounded-sm object-cover"
        src="/images/wod_1.png"
      />

      <UAvatar
        class="-absCenter h-20 w-20"
        src="https://github.com/benjamincanac.png"
      />
    </div>
    <component
      :is="linkComponent"
      :to="link"
      :class="{ underline: link }"
      class="mt-1 block w-full text-center text-2xl font-semibold"
    >
      Jack Black
    </component>
    <ul class="mt-1 flex flex-wrap justify-center gap-1.5">
      <li><UBadge>Крутой учитель</UBadge></li>
      <li><UBadge>Мастер историй</UBadge></li>
      <li><UBadge>Мастер-ветеран</UBadge></li>
      <li><UBadge>Красаффчик</UBadge></li>
    </ul>

    <div
      class="justify-centertext-xl mt-2 flex items-center justify-center gap-1.5 font-semibold"
    >
      <Star />
      <span> 5.0 (29) </span>
    </div>

    <StatsComments :skills="skillItems.gamemaster" />
  </header>
</template>

<!--<style lang="scss"></style>-->
