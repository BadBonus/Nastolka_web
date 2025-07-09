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
</script>

<template>
  <div>
    <UCollapsible v-if="comments.length" class="flex flex-col gap-2">
      <UButton
        class="group w-full"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-chevron-down"
        :ui="{
          trailingIcon:
            'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        block
      >
        <span class="text-2xl">{{ title ?? "Отзывы" }}</span>
      </UButton>

      <template #content>
        <ul class="Index flex flex-col gap-3.5">
          <li v-for="item in comments">
            <UserCommentsComment v-bind="item" />
          </li>
        </ul>
      </template>
    </UCollapsible>
  </div>
</template>

<!-- <style lang="scss"></style> -->
