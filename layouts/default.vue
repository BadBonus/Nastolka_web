<script setup lang="ts">
import type { transform } from "typescript";
import generateLayout, { type TplaceBgImagesOut } from "~/utils/placeBgImages";

const images = [
  "common_funny",
  "dragon",
  "dwarf",
  "evilEye",
  "orc_funny",
  "goblin",
  "knight",
  "knightFunny",
  "orc",
  "evil_funny",
  "warriorGirl",
  "chest_funny",
  "dwarf_funny",
];
const imagesLayout = ref<TplaceBgImagesOut[]>([]);

const transformImg = (): string => {
  const rotate = Math.floor(Math.random() * 41) - 20; // от -20 до 20
  const scale = Math.random() * (1.25 - 0.7) + 0.7; // от 0.7 до 1.25

  return `rotate(${rotate}deg) scale(${scale.toFixed(2)})`;
};

onMounted(() => {
  imagesLayout.value = generateLayout(
    images.map((el) => ({ name: el })),
    {
      cols: 10,
      rows: 10,
      countOfImages: 12,
      defaultSizeCell: 2,
      numberOfEmptyCol: [5, 6],
    },
  );
});
</script>

<template>
  <div class="common-layout">
    <MainHeader />
    <main class="layout_main relative overflow-hidden px-1.5 py-6">
      <nuxt-img
        v-for="img in imagesLayout"
        class="layout_main__bg_img absolute z-0"
        :style="{
          top: img.top,
          left: img.left,
          height: `${img.size}`,
          transform: transformImg(),
        }"
        :src="`images/bg_decors/webp/${img.name}.webp`"
      />

      <!-- delete-tag - напоминание, что этот тег служит сугубо для поддержки мобильного вида и после разработки должен будет быть удален -->
      <div delete-tag class="mx-auto max-w-[360px]">
        <slot />
      </div>
    </main>

    <MainFooter />
  </div>
</template>

<style>
.common-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  & > main {
    flex: 1;

    box-shadow:
      inset 0 0.5em 1.5em #0000001a,
      inset 0 0.125em 0.5em #00000026;
  }

  .layout_main__bg_img {
    max-height: 300px;
    z-index: -1;
  }
}
</style>
