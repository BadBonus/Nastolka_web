<script setup lang="ts">
import { skillItems, type ESkillGameMaster } from "@/shared/skills/index";
import type { TRadioGroupItem } from "@/components/globals/Radiogroup/index.vue";
type TFilterSortPanelSortViaAttrsPanel = {};

const props = defineProps<{ modelValue: string | undefined }>();

defineOptions({
  name: "FilterSortPanelSortViaAttrsPanel",
});

const radioBtns = [
  ...skillItems["gamemaster"].map((item) => ({
    maskIndicator: item.icon,
    value: item.id,
  })),
  {
    value: "popularity",
    maskIndicator: "i-material-symbols:star",
  },
] as TRadioGroupItem[];

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

<!--<style lang="scss"></style>-->
