<script setup lang="ts">
import { demoComments } from "@/shared/demo/comments";
import { skillItems } from "@/shared/skills";
import ScrollArea from "../ScrollArea.vue";

type TModalsAllComments = {
  title: string;
};

defineOptions({
  name: "ModalsAllComments",
});

defineProps<TModalsAllComments>();
</script>
<template>
  <UModal
    :title="title ?? 'Смена картинки'"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
  >
    <slot />

    <template #body>
      <nuxt-img
        class="border-secondary mx-auto h-20 w-20 rounded-full border-2 object-cover"
        src="/images/ava.jpg"
      />
      <div class="rating mb-2">
        <Star />
        <span> 5.0 (29) </span>
      </div>
      <ProfileStats :skills="skillItems.gamemaster" />

      <ScrollArea class="h-60">
        <ul class="flex flex-col gap-3.5 p-1">
          <li v-for="item in demoComments">
            <UserCommentsComment class="shadow-element" v-bind="item" />
          </li>
        </ul>
      </ScrollArea>
    </template>
  </UModal>
</template>
