<script setup lang="ts">
import { UButton } from "#components";

// 	 type TProfileHeader = {

// 	}

defineOptions({
  name: "ProfileHeader",
});
</script>
<template>
  <header class="ProfileHeader">
    <div class="relative h-28">
      <UButton
        class="absolute top-3 right-3 z-10"
        color="neutral"
        icon="material-symbols:favorite"
        size="lg"
      />

      <UButton
        class="absolute right-3 bottom-3 z-10"
        color="neutral"
        icon="ic:baseline-message"
        size="lg"
      />
      <NuxtImg
        class="-absCenter h-full w-full object-cover"
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
    <ul class="mt-1 flex justify-center gap-1.5">
      <li><UBadge>Badge</UBadge></li>
      <li><UBadge>Badge</UBadge></li>
      <li><UBadge>Badge</UBadge></li>
      <li><UBadge>Badge</UBadge></li>
    </ul>

    <div
      class="justify-centertext-xl mt-2 flex items-center justify-center gap-1.5 font-semibold"
    >
      <Icon class="text-amber-300" name="material-symbols:star" />
      <span> 5.0 (29) </span>
    </div>
  </header>
</template>

<!--<style lang="scss"></style>-->
