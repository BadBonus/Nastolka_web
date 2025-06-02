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
    to: "/calendar",
  },
  {
    label: "Новости",
    icon: "i-lucide-newspaper",
    to: "/news",
  },
  {
    label: "Стать гм-ом",
    icon: "i-lucide-drama",
    to: "/gm",
  },
]);
</script>
<template>
  <nav class="MainNavigation">
    <UNavigationMenu
      orientation="vertical"
      :items="items"
      class="data-[orientation=vertical]:w-48"
    />
  </nav>
</template>

<!--<style lang="scss"></style>-->
