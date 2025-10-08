<script setup lang="ts">
import type { RadioGroupRootProps } from "reka-ui";
defineOptions({
  name: "Radiogroup",
});

export type TRadioGroupItem = {
  value: number | string;
  label?: string;
  icon?: string;
  maskIndicator?: string;
};

const props = defineProps<
  {
    modelValue: (TRadioGroupItem & Record<string, unknown>) | undefined;
    items: (TRadioGroupItem & Record<string, unknown>)[];
    vertical?: boolean;
    bottomLabels?: boolean;
  } & RadioGroupRootProps
>();

const emit = defineEmits(["update:modelValue"]);

// const model = defineModel<number | string | undefined>();
const update = (id: TRadioGroupItem["value"]) => {
  const foundedItem = props.items.find((item) => item.value === id);
  emit("update:modelValue", foundedItem);
};

const colorItemsStyles =
  "border shadow-sm outline-none focus:shadow-[0_0_0_2px] h-4.5 w-4.5";

const colorItemsStylesIfIconIndicator =
  "data-[state=checked]:bg-dark-brown data-[state=checked]:text-[white]";
</script>

<template>
  <!-- NOTE: Reka Ui не поддерживает стандартный аттрибут tabindex, чтобы warning-a от ts не было я определил эти аттрибут через v-bind -->
  <RadioGroupRoot
    :modelValue="modelValue?.value"
    @update:modelValue="update"
    class="flex gap-2.5"
    :class="{
      'flex-col': vertical,
      'flex-row': !vertical,
    }"
  >
    <div
      :class="{ 'flex-col': bottomLabels }"
      class="flex items-center gap-1"
      v-for="item in items"
    >
      <RadioGroupItem
        :id="'' + item.value"
        class="Radiogroup__item flex cursor-pointer items-center rounded-full p-1"
        :class="{
          [colorItemsStyles]: !item.maskIndicator,
          [colorItemsStylesIfIconIndicator]: item.maskIndicator,
        }"
        :value="item.value"
        v-bind="{ tabindex: 0 }"
      >
        <RadioGroupIndicator
          class="after:bg-dark-brown relative flex h-full w-full items-center justify-center after:block after:h-2 after:w-2 after:rounded-[50%]"
          v-if="!item.maskIndicator"
        />

        <Icon
          class="Radiogroup__iconIndicator text-2xl"
          v-if="item.maskIndicator"
          :name="item.maskIndicator"
        />
      </RadioGroupItem>

      <label class="flex cursor-pointer items-center" :for="'' + item.value">
        {{ item.label }}

        <Icon
          class="Radiogroup__icon text-xl"
          v-if="item.icon"
          :name="item.icon"
        />
      </label>
    </div>
  </RadioGroupRoot>
</template>

<style>
.Radiogroup__item[aria-checked="true"] {
  /* background: var(--color-dark-brown); */
  /* .Radiogroup__iconIndicator {
    color: var(--color-white);
  } */
}
</style>
