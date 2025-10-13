<script setup lang="ts">
import { radioBtns } from "./utils";

defineOptions({
  name: "FilterSortPanelSortViaAttrsPanel",
});

const props = defineProps<{ modelValue: string | undefined }>();
const radioBtnModelValue = computed(() =>
  radioBtns.find((item) => item.value === props.modelValue),
);

// const model = defineModel<TRadioGroupItem | undefined>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string | undefined): void;
}>();

const updateModelValue = (value: string | undefined) => {
  emit("update:modelValue", value);
};
</script>
<template>
  <div class="FilterSortPanelSortViaAttrsPanel shadow-element rounded border-2">
    <Radiogroup
      :modelValue="radioBtnModelValue?.value"
      class="w-full justify-between p-1.5"
      :items="radioBtns"
      bottom-labels
      @update:model-value="updateModelValue"
      only-value
    />
  </div>
</template>
