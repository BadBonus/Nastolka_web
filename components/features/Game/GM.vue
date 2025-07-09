<script setup lang="ts">
import Comment from "~/components/globals/UserComments/Comment.vue";

// 	 type TGameGM = {

// 	}

const demoComments = [
  {
    avatar: "/images/wod_1.png",
    name: "Маркус",
    rating: 5,
    countOfGames: 74,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, perferendis molestiae a rem exercitationem vitae corrupti minima ad fugiat labore repudiandae et, minus nostrum molestias recusandae eum hic aliquid asperiores.",
  },
  {
    avatar: "/images/wod_1.png",
    name: "Маркус",
    rating: 5,
    countOfGames: 74,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, perferendis molestiae a rem exercitationem vitae corrupti minima ad fugiat labore repudiandae et, minus nostrum molestias recusandae eum hic aliquid asperiores.",
  },
  {
    avatar: "/images/wod_1.png",
    name: "Маркус",
    rating: 5,
    countOfGames: 74,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, perferendis molestiae a rem exercitationem vitae corrupti minima ad fugiat labore repudiandae et, minus nostrum molestias recusandae eum hic aliquid asperiores.",
  },
];

defineOptions({
  name: "GameGM",
});
</script>
<template>
  <div class="GameGM">
    <ProfileHeader />
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
    <ul class="flex justify-center gap-2.5">
      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-700 p-1.5 text-2xl"
        >
          <Icon name="ic:baseline-discord" />
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-400 p-1.5 text-2xl"
        >
          <Icon name="ic:baseline-facebook" />
        </NuxtLink>
      </li>

      <li>
        <NuxtLink
          class="flex items-center justify-center rounded-full bg-blue-500 p-1.5 text-2xl"
        >
          <Icon name="ic:baseline-telegram" />
        </NuxtLink>
      </li>
    </ul>
    <USeparator class="py-2" color="primary" type="solid" />
    <UserComments :comments="demoComments">
      <template #additional>
        <UButton class="mt-4" color="info">Изучить все комментарии</UButton>
      </template>
    </UserComments>
  </div>
</template>

<!--<style lang="scss"></style>-->
