<script setup lang="ts">
import { demoComments } from "@/shared/demo/comments";
import { ADVICE } from "@/shared/messagesToUsers";

defineOptions({
  name: "GameGM",
});
</script>
<template>
  <div class="GameGM">
    <ProfileHeader :link="`/gm/123`">
      <template #topPart>
        <Button
          class="absolute top-3 right-3 z-10 rounded-full p-2!"
          color="danger"
          icon="material-symbols:favorite"
          size="sm"
        />

        <ChatModal
          :advice="ADVICE"
          :title="'Диалог с мастером Васей'"
          :user="{
            name: 'Вася',
            avatar: 'https://github.com/benjamincanac.png',
          }"
        >
          <Button
            class="absolute right-3 bottom-3 z-10 rounded-full p-2!"
            color="info"
            icon="streamline-freehand:messages-bubble-menu "
            size="lg"
          />
        </ChatModal>
      </template>
    </ProfileHeader>
    <USeparator class="py-2" color="primary" type="solid" />
    <div class="flex items-center justify-center gap-1 text-lg">
      <Icon class="text-lg" name="game-icons:dice-target" />
      <span>Водит 3 года</span>
    </div>
    <div class="flex items-center justify-center gap-1 text-lg">
      <Icon class="text-lg" name="game-icons:flying-flag" />
      <span> 11 сессий проведено </span>
    </div>
    <USeparator class="py-2" color="primary" type="solid" />
    <ul class="flex justify-center gap-2.5 text-white">
      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-700 p-1.5 text-2xl"
        >
          <Icon class="text-white" name="ic:baseline-discord" />
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-400 p-1.5 text-2xl"
        >
          <Icon class="text-white" name="ic:baseline-facebook" />
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-500 p-1.5 text-2xl"
        >
          <Icon class="text-white" name="ic:baseline-telegram" />
        </NuxtLink>
      </li>
    </ul>
    <USeparator class="py-2" color="primary" type="solid" />
    <section>
      <h2 class="text-xl font-semibold">Оценка и отзывы</h2>
      <div
        class="my-2 flex items-center justify-center gap-1.5 text-xl font-semibold"
      >
        <Star />
        <!-- <Icon class="text-amber-300" name="material-symbols:star" /> -->
        <span> 5.0 (29) </span>
      </div>
      <UserComments :comments="demoComments" />
    </section>
  </div>
</template>

<!--<style lang="scss"></style>-->
