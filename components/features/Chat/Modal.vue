<script setup lang="ts">
import { input } from "#build/ui";

type TModal = {
  user: {
    name: string;
    avatar?: string;
  };
  title?: string;
  advice?: string;
};

defineOptions({
  name: "ChatModal",
});

defineProps<TModal>();
</script>

<template>
  <UModal
    :title="title"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
  >
    <slot />

    <template #body>
      <span class="text-xs" v-if="advice">
        {{ advice }}
      </span>
      <div class="mt-4 flex items-center gap-2">
        <NuxtImg class="size-10 rounded-full border" :src="user.avatar" />
        <span class="font-semibold">{{ user.name }}</span>
      </div>

      <UTextarea placeholder="Ваше сообщение" class="text-text mt-2 w-full" />
      <Button color="secondary" class="mt-3 w-full">Отправить</Button>
    </template>
  </UModal>
</template>

<!-- <style lang="scss"></style> -->
