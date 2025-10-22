<script setup lang="ts">
type TTabs = {
  tabs: { value: string; name: string; to?: string }[];
  modeLinks?: boolean;
};

defineOptions({
  name: "GlobalsTabs",
});

defineProps<TTabs>();
const model = defineModel<string | number>();

// Ниже логика для мода ссылок
const route = useRoute();
const tabRefs = ref<HTMLElement[]>([]);
const tabsContainer = ref<HTMLElement | null>(null);
const indicatorStyle = ref<Record<string, string>>({
  transform: "translateX(0px)",
  width: "0px",
});

function updateIndicator() {
  nextTick(() => {
    const activeTab = tabRefs.value.find(
      (el) => el.getAttribute("href") === route.path,
    );

    if (activeTab) {
      const { left = 0, width = 0 } = activeTab?.getBoundingClientRect() ?? {};
      const containerLeft =
        tabsContainer.value?.getBoundingClientRect().left || 0;

      indicatorStyle.value = {
        transform: `translateX(${left - containerLeft}px)`,
        width: `${width}px`,
      };
    }
  });
}

onMounted(() => {
  tabRefs.value = Array.from(document.querySelectorAll(".tab-link"));
  updateIndicator();
});

watch(() => route.path, updateIndicator);
</script>

<template>
  <TabsRoot
    v-bind="$attrs"
    v-if="!modeLinks"
    v-model="model"
    class="mx-auto w-full max-w-md"
  >
    <TabsList class="relative border-b border-gray-300">
      <TabsIndicator
        class="TabsIndicator absolute bottom-0 h-[2px] w-[--reka-tabs-indicator-size] translate-x-[--reka-tabs-indicator-position] transition-all duration-300"
      >
        <div class="bg-brown-hover h-full w-full rounded-full" />
      </TabsIndicator>

      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="hover:text-brown-hover data-[state=active]:text-brown-hover inline-block w-fit px-3 py-2 text-lg font-medium text-gray-700 focus:outline-none"
      >
        {{ tab.name }}
      </TabsTrigger>
    </TabsList>
  </TabsRoot>

  <div
    ref="tabsContainer"
    v-bind="$attrs"
    v-else
    class="relative flex border-b border-gray-300"
  >
    <div
      class="bg-brown-hover absolute bottom-0 left-0 h-[2px] transition-all duration-300"
      :style="indicatorStyle"
    />

    <NuxtLink
      v-for="(tab, index) in tabs"
      :key="index"
      :to="tab.to"
      class="tab-link hover:text-brown-hover px-4 py-2 text-lg font-medium text-gray-700"
      :class="{ 'text-brown-hover': route.path === tab.to }"
    >
      {{ tab.name }}
    </NuxtLink>
  </div>
</template>

<style>
.TabsIndicator {
  width: var(--reka-tabs-indicator-size);
  transform: translateX(var(--reka-tabs-indicator-position));
}
</style>
