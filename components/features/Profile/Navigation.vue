<script setup lang="ts">
import { EProfileNavigation } from './types';
import { sections, urlTabsCoordination } from './utils';

defineOptions({
  name: 'ProfileNavigation',
});

const route = useRoute();

console.log(route.path);
const currentTab = urlTabsCoordination(route.path) ?? EProfileNavigation.profile;

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
      list: 'bg-inherit',
      indicator: 'bg-inverted',
      trigger: 'text-black hover:text-white data-[state=inactive]:text-white',
    }"
    :content="false"
    v-model="selectedTab"
    :items="sections"
    class="ProfileNavigation w-full"
  />
</template>
