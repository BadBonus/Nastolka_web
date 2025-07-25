<script setup lang="ts">
import { EProfileNavigation } from "./types";
import { sections } from "./utils";

defineOptions({
  name: "ProfileNavigation",
});

const selectedTab = ref<string | number>(EProfileNavigation.Overview);
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
    v-model="selectedTab"
    :items="sections"
    class="ProfileNavigation w-full"
  />
</template>
