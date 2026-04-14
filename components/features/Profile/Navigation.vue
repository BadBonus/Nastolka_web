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
      root: 'border-3 border-black border-dashed rounded',
      list: 'bg-inherit',
      indicator: 'bg-secondary',
      trigger:
        'text-secondary hover:text-secondary! data-[state=active]:text-white!',
    }"
    :content="false"
    v-model="selectedTab"
    :items="sections"
    class="ProfileNavigation w-full"
  />
</template>
