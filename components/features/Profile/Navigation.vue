<script setup lang="ts">
import { EProfileNavigation } from "./types";
import { sections, getLastNavigationSegment } from "./utils";

defineOptions({
  name: "ProfileNavigation",
});

const route = useRoute();
const currentTab =
  getLastNavigationSegment(route.path) ?? EProfileNavigation.profile;

const selectedTab = ref<string | number>(currentTab);
const router = useRouter();

watch(selectedTab, (newTab) => {
  router.push(`${newTab}`);
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
