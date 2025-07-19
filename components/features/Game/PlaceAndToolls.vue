<script setup lang="ts">
// 	 type TGamePlace = {

// 	}

defineOptions({
  name: "GamePlace",
});
</script>
<template>
  <div class="GamePlace">
    <div>
      <span class="mr-1 inline-block">Адрес:</span>
      <span>г. Москва, ул. Пушкина, д. 1</span>
    </div>
    <!-- FIXME: потом засунуть вместо картинки интерактивный плагин карты -->
    <nuxt-img
      class="border-border shadow-element mt-2.5 rounded-sm border-2"
      src="/images/demo_map.png"
    />

    <p class="my-3">или</p>

    <div
      class="bg-dark-brown mx-auto mt-2.5 flex w-fit items-center justify-center gap-2.5 rounded-xl px-3 text-white"
    >
      <nuxt-img class="h-10 rounded" src="/images/discord.png" />
      <span class="cursor-default text-lg">+</span>
      <nuxt-img class="mt-2 h-10" src="/images/rol20.webp" />
    </div>

    <span class="mt-3 block text-center text-2xl font-semibold">
      Что требуется иметь при себе
    </span>
    <ul class="mt-2.5 flex flex-wrap gap-1.5 text-center">
      <li class="w-[48%]">Компьютер</li>
      <li class="w-[48%]">Лист персонажа</li>
      <li class="w-[48%]">Кубики</li>
      <li class="w-[48%]">Интернет</li>
      <li class="w-[48%]">Микрофон</li>
      <li class="w-[48%]">Наушники</li>
    </ul>
  </div>
</template>

<!--<style lang="scss"></style>-->
