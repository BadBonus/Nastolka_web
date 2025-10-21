<script setup lang="ts">
import { TagsInputRoot } from "reka-ui";

defineOptions({
  name: "GlobalsTagsInput",
});

defineProps<{
  placeholder: string;
  disabled: boolean;
}>();

const modelValue = defineModel<string[]>();
</script>

<template>
  <TagsInputRoot
    v-model="modelValue"
    :class="{
      'bg-brown-hover border shadow-sm': !disabled,
    }"
    class="flex w-full max-w-[340px] flex-wrap items-center gap-2 rounded-lg p-1.5"
  >
    <TagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
      class="bg-dark-brown flex items-center justify-center gap-2 rounded-lg p-0.5 font-medium text-white"
    >
      <TagsInputItemText :class="{ 'pl-2': !disabled }" class="p-1 text-xs" />
      <TagsInputItemDelete
        v-if="!disabled"
        class="rounded bg-transparent p-0.5"
      >
        <Icon name="lucide:x" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      v-if="!disabled"
      :placeholder="placeholder"
      class="flex-1 rounded bg-transparent px-1 text-xs text-white placeholder:text-amber-100 focus:outline-none"
    />
  </TagsInputRoot>
</template>
