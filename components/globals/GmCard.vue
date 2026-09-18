<script setup lang="ts">
import { NuxtLink } from '#components';
import { ADVICE } from '@/shared/messagesToUsers';
import type { TBadgeListItem } from '@/components/globals/BadgeList.vue';

export type TGmCard = {
  nickname: string;
  avatar?: string;
  rating?: {
    value: number;
    count: number;
  };
  gamesCount?: number;
  costValue?: number;
  costCurrency?: string;
  countOfGamesIsHidden?: boolean;
  description?: string;
  slug?: string;
  randomFont?: boolean;
  preferredSystems?: TBadgeListItem[];
  location?: string;
};

const FONTS_FOR_HANDY_EFFECT = [
  'Artist Nouveau',
  'Shantell Sans',
  'Caveat',
  'Comforter Brush',
  'Rubik',
  'Comic Sans MS',
  'Ink free',
  'Segoe Script',
];
const NEWBIE_PLACEHOLDER = '????';

defineOptions({
  name: 'GmCard',
});

const props = defineProps<TGmCard>();

defineEmits<{
  (e: 'favorClick'): void;
  (e: 'chat'): void;
}>();

const countOfGames = computed(() => {
  return props.countOfGamesIsHidden ? NEWBIE_PLACEHOLDER : props.gamesCount;
});

// ПО идее такая функция рэндома убирает проблему разных чисел при рэнжоме на SSR и клиенте
function pickFontFor(seed: string) {
  const hash = [...seed].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return FONTS_FOR_HANDY_EFFECT[hash % FONTS_FOR_HANDY_EFFECT.length];
}

const fontFamily = computed(() => (props.randomFont ? pickFontFor(props.nickname) : undefined));
</script>

<template>
  <component
    :is="slug ? NuxtLink : 'div'"
    :to="slug ? `/org/${slug}` : undefined"
    :target="slug ? '_blank' : undefined"
    class="bg-card-decorate block h-full w-full rounded-lg p-1.5"
  >
    <article
      class="GmCard shadow-element relative flex h-full flex-col items-center gap-1 rounded-lg border-2 border-dashed p-2 text-black"
    >
      <div class="mb-4 flex w-full justify-between gap-2">
        <UAvatar :alt="nickname" class="size-24.5 rounded-sm border-2 outline-none" :src="avatar" />

        <div class="flex w-[55%] flex-col items-start gap-1">
          <div class="relative w-full border-b border-dashed border-neutral-400 pb-1">
            <div class="truncate">
              <span :style="{ fontFamily }" class="mx-auto mb-px truncate text-center text-2xl">{{ nickname }}</span>
            </div>
            <span class="absolute -bottom-5 left-0 text-xs text-neutral-500"> Имя </span>
          </div>
          <div
            :class="{
              'opacity-50': countOfGamesIsHidden,
            }"
            class="relative mt-2 w-full border-b border-dashed border-neutral-400 text-center"
          >
            <span :style="{ fontFamily }" class="text-2xl">
              {{ countOfGames }}
            </span>
            <span class="absolute -bottom-5 left-0 text-xs text-neutral-500"> Количество сессий </span>
          </div>
        </div>
      </div>

      <template v-if="description">
        <div class="-mt-2 flex gap-1.5">
          <div>
            <div class="flex items-center justify-between font-extrabold">
              <h5 class="">Обо мне</h5>
              <span v-if="location"> <UIcon class="text-base" name="game-icons:position-marker" />{{ location }} </span>
            </div>

            <p class="h-35.5 overflow-hidden text-xs">
              {{ description }}
            </p>
          </div>
        </div>
      </template>

      <BadgeList :maxLettersToShow="12" v-if="preferredSystems" class="mt-auto" :items="preferredSystems" />

      <USeparator class="mt-auto" decorative :ui="{ border: 'border-neutral-400' }" />
      <div class="my-1 flex w-full items-center justify-between">
        <CardsCost :cost="costValue" :costCurrency="costCurrency" />
        <div @click.stop.prevent>
          <ChatModal
            :advice="ADVICE"
            :title="'Диалог с мастером Васей'"
            :user="{ name: 'Вася', avatar: 'https://github.com/benjamincanac.png' }"
          >
            <UButton
              variant="ghost"
              trailingIcon="ic:baseline-message"
              class="sketchy-border-5! w-full border-2 border-black text-black hover:bg-black hover:text-white"
            >
              Написать
            </UButton>
          </ChatModal>
        </div>
      </div>

      <UButton class="GmCard_like sketchy-border-5 absolute -top-5 -right-3.5" color="error" icon="ci:heart-outline" />
    </article>
  </component>
</template>
