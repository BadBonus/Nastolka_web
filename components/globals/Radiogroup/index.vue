<script setup lang="ts">
import type { RadioGroupRootProps } from "reka-ui";
defineOptions({
  name: "Radiogroup",
});

export type TRadioGroupItem = {
  value: number | string;
  label: string;
};

const props = defineProps<
  {
    modelValue: (TRadioGroupItem & Record<string, unknown>) | undefined;
    items: (TRadioGroupItem & Record<string, unknown>)[];
    vertical?: boolean;
  } & RadioGroupRootProps
>();

const emit = defineEmits(["update:modelValue"]);

// const model = defineModel<number | string | undefined>();
const update = (id: TRadioGroupItem["value"]) => {
  const foundedItem = props.items.find((item) => item.value === id);
  emit("update:modelValue", foundedItem);
};
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
    <div class="flex items-center gap-1" v-for="item in items">
      <RadioGroupItem
        :id="'' + item.value"
        class="flex h-[1.125rem] w-[1.125rem] cursor-pointer items-center rounded-full border shadow-sm outline-none focus:shadow-[0_0_0_2px] focus:shadow-stone-700 data-[active=true]:border-stone-700 data-[active=true]:bg-stone-700 dark:data-[active=true]:bg-white"
        :value="item.value"
        v-bind="{ tabindex: 0 }"
      >
        <RadioGroupIndicator
          class="relative flex h-full w-full items-center justify-center after:block after:h-2 after:w-2 after:rounded-[50%] after:bg-white after:content-[''] dark:after:bg-stone-700"
        />
      </RadioGroupItem>

      <label class="cursor-pointer" :for="'' + item.value">
        {{ item.label }}
      </label>
    </div>
  </RadioGroupRoot>
</template>

<style></style>
