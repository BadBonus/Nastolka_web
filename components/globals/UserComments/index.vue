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
    <Splide
      :slides="comments"
      :options="{
        type: 'loop',
        autoplay: true,
        perPage: 1,
        gap: '1rem',
      }"
    >
      <template #slide="{ slide }">
        <UserCommentsComment class="shadow-element" v-bind="slide" />
      </template>
    </Splide>

    <ModalsAllComments title="Оценка и отзывы">
      <Button class="my-4 w-full" color="info">Изучить все отзывы</Button>
    </ModalsAllComments>
  </div>
</template>

<!-- <style lang="scss"></style> -->
