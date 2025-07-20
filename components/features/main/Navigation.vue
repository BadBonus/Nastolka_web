<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
// 	 type TMainNavigation = {

// 	}

defineOptions({
  name: "MainNavigation",
});

const items = ref<NavigationMenuItem[]>([
  {
    label: "Календарь событий",
    icon: "i-lucide-calendar",
    to: "/gamesCalendar",
  },
  {
    label: "Найти гм-мастера",
    icon: "fluent-people-search-20-filled",
    to: "/gmsearch",
  },
  {
    label: "Новости",
    icon: "i-lucide-newspaper",
    to: "/news",
  },
  {
    label: "Стать гм-ом",
    icon: "i-lucide-drama",
    to: "/becomegm",
  },
]);
</script>
<template>
  <div>
    <h2 class="text-highlighted font-main mb-3 text-4xl font-bold">
      Навигация
    </h2>

    <nav class="MainNavigation">
      <UNavigationMenu
        orientation="vertical"
        :items="items"
        class="data-[orientation=vertical]:w-48"
        :ui="{
          indicator: 'indicator',
        }"
      />
    </nav>
  </div>
</template>

<!--<style lang="scss"></style>-->
