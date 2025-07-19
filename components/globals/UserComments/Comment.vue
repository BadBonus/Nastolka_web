<script setup lang="ts">
export type TUserCommentsComment = {
  avatar: string;
  name: string;
  rating: number;
  countOfGames?: number;
  comment?: string;
};

defineProps<TUserCommentsComment>();

defineOptions({
  name: "UserCommentsComment",
});
</script>
<template>
  <section
    class="UserCommentsComment bg-elements-surface border-border rounded-lg border-2 p-2"
  >
    <div class="flex items-center gap-1.5 rounded">
      <nuxt-img
        class="border-secondary h-12 w-12 rounded-full border-2 object-cover"
        :src="avatar"
      />
      <div>
        <span class="font-bold">{{ name }}</span>
        <div class="flex items-center gap-1">
          <Star />
          <span class="font-semibold">{{ rating.toFixed(1) }}</span>
        </div>
      </div>
    </div>
    <div class="mt-1.5 flex items-center gap-1">
      <Icon name="bxs:badge-check" />
      <span class="text-xs">Сыграно {{ countOfGames }} игр</span>
    </div>

    <span class="mt-2.5 block text-left text-xs">
      {{ comment }}
    </span>
  </section>
</template>

<!--<style lang="scss"></style>-->
