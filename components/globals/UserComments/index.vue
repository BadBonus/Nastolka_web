<script setup lang="ts">
import type { TUserCommentsComment } from "./Comment.vue";
type TIndex = {
  comments: TUserCommentsComment[];
  title?: string;
};

defineProps<TIndex>();

defineOptions({
  name: "UserCommentsIndex",
});
defineSlots<{ additional(): any }>();
</script>

<template>
  <div>
    <UCollapsible v-if="comments.length" class="flex flex-col gap-2">
      <template #default="{ open }">
        <Button
          class="group w-full"
          color="secondary"
          variant="ghost"
          :icon="open ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'"
          icon-pos="right"
        >
          <span class="text-2xl">{{ title ?? "Отзывы" }}</span>
        </Button>
      </template>

      <template #content>
        <ul class="Index flex flex-col gap-3.5 p-1">
          <li v-for="item in comments">
            <UserCommentsComment class="shadow-element" v-bind="item" />
          </li>
        </ul>

        <slot name="additional" />
      </template>
    </UCollapsible>
  </div>
</template>

<!-- <style lang="scss"></style> -->
