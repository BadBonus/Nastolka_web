<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import useAuthFlow from "~/composables/use-cases/useAuthFlow";

defineOptions({
  name: "UsersDrawerHeader",
});

const { logout } = useAuthFlow();

const items = ref<NavigationMenuItem[]>([
  {
    label: "Мои игры",
    icon: "lineicons-box-archive-1",
    to: "/gamesCalendar",
  },
  {
    label: "Мой календарь",
    icon: "i-lucide-calendar",
    to: "/gm",
  },
  {
    label: "Подписки",
    icon: "carbon-favorite",
    to: "/news",
  },
  {
    label: "Реф. ссылка",
    icon: "ic-round-share",
    to: "/becomegm",
  },
  {
    label: "Стать гм-ом",
    icon: "arcticons:dice-1",
    to: "/becomegm",
  },
  {
    label: "Выйти из аккаунта",
    icon: "material-symbols-logout",
    class: "my-1 hover:bg-brown-hover rounded cursor-pointer rounded-lg",
    onSelect: async () => await logout(),
  },
]);
</script>
<template>
  <nav class="UsersDrawerHeader">
    <UNavigationMenu
      orientation="vertical"
      :items="items"
      class="data-[orientation=vertical]:w-48"
      :ui="{
        indicator: 'indicator',
      }"
    />
  </nav>
</template>
