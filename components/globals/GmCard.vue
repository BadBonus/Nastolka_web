<script setup lang="ts">
import { computed, h, type SetupContext } from 'vue';
import { NuxtLink } from '#components';
import { ADVICE } from '@/shared/messagesToUsers';

export type TGmCard = {
  nickname: string;
  avatar?: string;
  rating?: {
    value: number;
    count: number;
  };
  gamesCount: number;
  costValue?: number;
  costCurrency?: string;
  isNewbie: boolean;
  description?: string;
  slug?: string;
};

defineOptions({
  name: 'GmCard',
});

const props = defineProps<TGmCard>();

defineEmits<{
  (e: 'favorClick'): void;
  (e: 'chat'): void;
}>();

const countOfGames = computed(() => {
  return props.isNewbie ? '????' : props.gamesCount;
});

const ConditionalLink = (wrapperProps: { slug?: string }, { slots }: SetupContext) => {
  if (!wrapperProps.slug) {
    return slots.default ? slots.default() : null;
  }

  return h(
    NuxtLink,
    {
      to: `/org/${wrapperProps.slug}`,
      target: '_blank',
      class: 'block',
    },
    slots.default
  );
};
</script>

<template>
  <ConditionalLink :slug="slug" class="bg-card-decorate h-full rounded-lg p-1.5">
    <article
      class="GmCard shadow-element relative flex h-full flex-col items-center gap-1 rounded-lg border-2 border-dashed p-2 text-black"
    >
      <div class="mb-4 flex w-full justify-between gap-2">
        <UAvatar :alt="nickname" class="size-24.5 rounded-sm border-2 outline-none" :src="avatar" />

        <div class="flex w-[55%] flex-col items-start gap-1">
          <div class="relative w-full border-b border-dashed border-neutral-400 pb-1">
            <div class="truncate">
              <span class="font-secondary mx-auto mb-px truncate text-center text-2xl">{{ nickname }}</span>
            </div>
            <span class="absolute -bottom-5 left-0 text-xs text-neutral-500"> Имя </span>
          </div>
          <div
            :class="{
              disabled: isNewbie,
            }"
            class="relative mt-3.5 w-full border-b border-dashed border-neutral-400 text-center"
          >
            <span class="font-secondary text-2xl font-bold">
              {{ countOfGames }}
            </span>
            <span class="absolute -bottom-5 left-0 text-xs text-neutral-500"> Количество сессий </span>
          </div>
        </div>
      </div>

      <template v-if="description">
        <div class="-mt-2 flex gap-1.5">
          <div>
            <h5 class="font-extrabold">Обо мне</h5>

            <p class="max-h-35.5 overflow-hidden text-xs">
              {{ description }}
            </p>
          </div>
        </div>
      </template>
      <USeparator class="mt-auto" decorative :ui="{ border: 'border-neutral-400' }" />
      <div class="my-1 flex w-full items-center justify-between">
        <CardsCost :cost="costValue" :costCurrency="costCurrency" />
        <ChatModal
          :advice="ADVICE"
          :title="'Диалог с мастером Васей'"
          :user="{ name: 'Вася', avatar: 'https://github.com/benjamincanac.png' }"
        >
          <UButton
            variant="ghost"
            icon="ic:baseline-message"
            class="sketchy-border-5! w-1/2 border-2 border-black text-black"
          >
            Написать
          </UButton>
        </ChatModal>
      </div>

      <UButton class="GmCard_like sketchy-border-5 absolute -top-5 -right-3.5" color="error" icon="ci:heart-outline" />
    </article>
  </ConditionalLink>
</template>
