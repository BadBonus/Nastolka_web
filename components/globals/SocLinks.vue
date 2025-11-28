<script setup lang="ts">
import { ESocLinks } from "@/shared/socLinks";

type TSocLinks = {
  data: { name: ESocLinks; link: string }[];
};

const iconsOfSoc = {
  [ESocLinks.DISCORD]: "ic:baseline-discord",
  [ESocLinks.INSTAGRAM]: "mdi:instagram",
  [ESocLinks.REDDIT]: "ic:baseline-reddit",
  [ESocLinks.TELEGRAM]: "ic:baseline-telegram",
  [ESocLinks.VK]: "mdi:vk",
  [ESocLinks.X]: "mingcute:social-x-fill",
};

defineOptions({
  name: "GlobalsSocLinks",
});

const props = defineProps<TSocLinks>();
</script>

<template>
  <ul class="border-brown flex w-fit items-center gap-5 rounded border-2 p-1.5">
    <li v-for="link in data" :key="link.name" class="h-8 text-3xl">
      <nuxt-link><Icon :name="iconsOfSoc[link.name]" /></nuxt-link>
    </li>
  </ul>
</template>

<!-- <style lang="scss"></style> -->
