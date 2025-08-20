<script setup lang="ts">
import { initSocLinks, socLinkKeys } from "~/utils/soclinks";

defineOptions({
  name: "SocLinksInput",
});

withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "Ссылки на ваши профили в соц. сетях",
  },
);

const model = defineModel<Record<ESocLinks, string | undefined>>({
  default: initSocLinks,
});
</script>

<template>
  <div>
    <h2 class="mb-3 block text-center text-xl">
      {{ title }}
    </h2>
    <UFormField
      v-for="field in socLinkKeys"
      :key="field"
      :label="`Ссылка на ваш ${field}`"
      :name="field"
      class="mb-3"
    >
      <UInput class="w-full" v-model="model[field] as string" type="text" />
    </UFormField>
  </div>
</template>
