<script setup lang="ts">
import type { ESocLinks } from '#consts/socLinks';
import { socLinkKeys } from '~/utils/soclinks';

defineOptions({
  name: 'SocLinksInput',
});

withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: 'Ссылки на ваши профили в соц. сетях',
  }
);

const model = defineModel<Partial<Record<ESocLinks, string | undefined>>>({
  default: () => ({}),
});

const updateField = (field: ESocLinks, value: string) => {
  model.value = {
    ...model.value,
    [field]: value || undefined,
  };
};
</script>

<template>
  <div>
    <h2 class="mb-3 block text-center text-lg">
      {{ title }}
    </h2>
    <UFormField v-for="field in socLinkKeys" :key="field" :label="`Ссылка на ваш ${field}`" :name="field" class="mb-3">
      <UInput
        class="w-full"
        :model-value="model?.[field] ?? ''"
        @update:model-value="(val: string) => updateField(field, val)"
        type="text"
      />
    </UFormField>
  </div>
</template>
