<script setup lang="ts">
import { EProfileNavigation } from "./types";
import { sections, urlTabsCoordination } from "./utils";

defineOptions({
  name: "ProfileNavigation",
});

const route = useRoute();

console.log(route.path);
const currentTab =
  urlTabsCoordination(route.path) ?? EProfileNavigation.profile;

const selectedTab = ref<string | number>(currentTab);
const router = useRouter();

watch(selectedTab, (newTab) => {
  router.push(String(newTab));
});
</script>

<template>
  <UTabs
    :ui="{
      label: 'hidden',
    }"
    :content="false"
    v-model="selectedTab"
    :items="sections"
    class="ProfileNavigation w-full"
  />
</template>
