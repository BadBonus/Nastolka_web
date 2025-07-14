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
  <section class="UserCommentsComment bg-bg-secondary rounded-lg p-2">
    <div class="rounded flex items-center gap-1.5">
      <nuxt-img class="h-12 w-12 rounded-full object-cover" :src="avatar" />
      <div>
        <span class="font-bold">{{ name }}</span>
        <div class="flex items-center gap-1">
          <Icon class="text-amber-300" name="material-symbols:star" />
          <span class="text-sm">{{ rating.toFixed(1) }}</span>
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
