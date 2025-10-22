<script setup lang="ts">
export type TChatItem = {
  title: string;
  lastTime: Date;
  lastMessage?: string;
  avatar?: string;
};

defineOptions({
  name: "ChatItem",
});

defineProps<TChatItem>();
</script>
<template>
  <article class="ChatItem flex items-center justify-between gap-3">
    <nuxt-img
      class="size-10 shrink-0 rounded-full border object-cover"
      :src="avatar"
    />
    <div class="w-full truncate">
      <b class="text-text truncate">
        {{ title }}
      </b>
      <span class="text-text-80 block truncate text-xs">{{ lastMessage }}</span>
    </div>

    <time datetime="2008-02-14 20:00" class="shrink-0 text-center text-xs">
      <span>1 день</span>
      <p>назад</p>
    </time>
  </article>
</template>

<!--<style lang="scss"></style>-->
