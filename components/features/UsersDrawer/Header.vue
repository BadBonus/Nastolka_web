<script setup lang="ts">
import StatsComments from "./StatsComments.vue";

// 	 type TProfileHeader = {

// 	}

defineOptions({
  name: "ProfileHeader",
});
</script>
<template>
  <header class="ProfileHeader">
    <div class="relative h-28">
      <Button
        class="absolute top-3 right-3 z-10 rounded-full p-2!"
        color="danger"
        icon="material-symbols:favorite"
        size="sm"
      />

      <Button
        class="absolute right-3 bottom-3 z-10 rounded-full p-2!"
        color="secondary"
        icon="ic:baseline-message"
        size="lg"
      />
      <NuxtImg
        class="-absCenter h-full w-full rounded-sm object-cover"
        src="/images/wod_1.png"
      />

      <UAvatar
        class="-absCenter h-20 w-20"
        src="https://github.com/benjamincanac.png"
      />
    </div>
    <NuxtLink
      class="mt-1 block w-full text-center text-2xl font-semibold underline"
    >
      Jack Black
    </NuxtLink>
    <ul class="mt-1 flex flex-wrap justify-center gap-1.5">
      <li><UBadge>Крутой учитель</UBadge></li>
      <li><UBadge>Мастер историй</UBadge></li>
      <li><UBadge>Мастер-ветеран</UBadge></li>
      <li><UBadge>Красаффчик</UBadge></li>
    </ul>

    <div
      class="justify-centertext-xl mt-2 flex items-center justify-center gap-1.5 font-semibold"
    >
      <!-- <Icon class="text-amber-300" name="material-symbols:star" /> -->
      <Star />
      <span> 5.0 (29) </span>
    </div>

    <StatsComments />
  </header>
</template>

<!--<style lang="scss"></style>-->
