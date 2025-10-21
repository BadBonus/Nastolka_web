<script setup lang="ts">
type TTabs = {
  tabs: { value: string; name: string }[];
};

defineOptions({
  name: "GlobalsTabs",
});

defineProps<TTabs>();
const model = defineModel<string | number>();
</script>

<template>
  <TabsRoot v-model="model" class="mx-auto w-full max-w-md">
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
</template>

<style>
.TabsIndicator {
  width: var(--reka-tabs-indicator-size);
  transform: translateX(var(--reka-tabs-indicator-position));
}
</style>
