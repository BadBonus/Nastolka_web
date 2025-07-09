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
    <UserComments :comments="demoComments" />
  </div>
</template>

<!--<style lang="scss"></style>-->
