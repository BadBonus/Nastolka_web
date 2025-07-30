<script setup lang="ts">
import { NuxtImg } from "#components";

export type TGmCard = {
  link: string;
  name: string;
  avatar?: string;
  rating?: {
    value: number;
    count: number;
  };
  gamesCount: number;
  averagePrice: string;
};

defineOptions({
  name: "GmCard",
});

defineProps<TGmCard>();

defineEmits<{
  (e: "favorClick"): void;
  (e: "chat"): void;
}>();
</script>

<template>
  <article
    class="GmCard bg-dark-brown border-border shadow-element flex items-center gap-2 rounded-lg border-2 p-2 text-white"
  >
    <NuxtLink>
      <NuxtImg class="avatar h-25 w-25" :src="avatar || '/images/wod_1.png'" />
    </NuxtLink>
    <div>
      <span class="block text-xl">{{ name }}</span>
      <div class="flex flex-col items-start gap-1">
        <div
          class="flex items-center justify-center gap-1.5 text-sm font-semibold"
        >
          <Star />
          <span> {{ rating?.value }} ({{ rating?.count }}) </span>
        </div>

        <div class="gap flex items-center">
          <Icon name="mdi-currency-usd" /> <span> {{ averagePrice }} </span>
        </div>

        <span class="text-sm"
          ><b>{{ gamesCount }}</b> игр провёл</span
        >
      </div>
    </div>
    <div class="ml-auto flex flex-col justify-between self-stretch">
      <Button
        class="rounded-full p-2!"
        color="danger"
        icon="material-symbols:favorite"
        size="sm"
      />

      <Button
        class="rounded-full p-2!"
        color="info"
        icon="ic:baseline-message"
        size="lg"
      />
    </div>
  </article>
</template>
