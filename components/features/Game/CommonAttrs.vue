<script setup lang="ts">
// 	 type TGameCommonAttrs = {

// 	}

defineOptions({
  name: "GameCommonAttrs",
});
</script>
<template>
  <div
    class="border-border GameCommonAttrs bg-elements-surface shadow-element mt-4 rounded border-2"
  >
    <div class="flex items-end justify-evenly p-2 font-semibold">
      <span class="flex translate-y-[2px] items-center">
        <Icon class="text-2xl" name="ic:baseline-attach-money" />
        13р/сессия
      </span>
      <span> Кол-во сессий: 3 </span>
    </div>

    <USeparator color="primary" type="solid" class="py-1" />

    <ul class="grod-row-2 row-gap-4 grid grid-cols-3 gap-x-2 gap-y-4 p-2">
      <li>
        <Icon class="block text-2xl" name="ic:baseline-calendar-month" />
        <span class="block">22.12</span>
      </li>
      <li>
        <Icon class="block text-2xl" name="ic:outline-access-time" />
        <span class="block">12:30</span>
      </li>
      <li>
        <Icon class="block text-2xl" name="ic:round-hourglass-empty" />
        <span class="block">1-1.5ч</span>
      </li>
      <li>
        <span class="block text-lg font-bold">ВОЗРАСТ</span>
        <span class="block">33+</span>
      </li>
      <li>
        <Icon class="block text-2xl" name="ic:baseline-people" />
        <span class="block">1/4</span>
      </li>
      <li>
        <span class="block text-lg font-bold">lvl</span>
        <span class="block">5</span>
      </li>
    </ul>

    <USeparator color="primary" type="solid" class="py-1" />

    <ul class="gap p-2 text-left text-lg">
      <li class="my-1">Тип: <b>ваншот</b></li>
      <li class="my-1">Опыт игроков: <b>для новичков</b></li>
      <li class="my-1">Сеттинг: <b>supernatural, cyberpunk, fantasy</b></li>
      <li class="my-1">
        Предупреждения: <b>пауки, суицид, body хоррор, расизм</b>
      </li>
    </ul>
  </div>
</template>

<!--<style lang="scss"></style>-->
