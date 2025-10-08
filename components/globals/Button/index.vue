<script setup lang="ts">
import type { TButton } from "./button.types";
import { variantColorClasses, sizeClasses, sizeClassesOnlyIcon } from "./utils";
import type { ButtonHTMLAttributes, ReservedProps } from "vue";

defineOptions({
  name: "Button",
});

const props = withDefaults(
  defineProps<TButton & /* @vue-ignore */ ButtonHTMLAttributes>(),
  {
    variant: "filled",
    color: "primary",
    size: "md",
    block: false,
    rounded: false,
    disabled: false,
    loading: false,
    iconPos: "left",
    type: "button",
    onlyIcon: false,
  },
);

defineSlots<{ default: () => any }>();

const slots = useSlots();

const buttonClasses = computed(() => {
  const baseClasses = [
    "flex items-center justify-center font-semibold",
    "focus:outline-none",
    "transition-all duration-200 ease-in-out",
    props.block ? "w-full" : "",
    props.disabled || props.loading ? "opacity-60 cursor-not-allowed" : "",
  ];

  const roundedClass = props.rounded ? "rounded-full" : "rounded";
  const resultSizeClasses = props.onlyIcon
    ? sizeClassesOnlyIcon[props.size]
    : sizeClasses[props.size];

  return [
    ...baseClasses,
    resultSizeClasses,
    variantColorClasses[props.variant][props.color],
    roundedClass,
  ];
});

const iconSpacingClasses = computed(() => {
  if (!props.icon) return "";
  if (props.iconPos === "left") return slots.default ? "mr-0.5" : "";
  if (props.iconPos === "right") return slots.default ? "ml-0.5" : "";
  return "";
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <div
      v-if="loading"
      class="inset-0 flex items-center justify-center"
      aria-label="Загрузка"
      role="status"
    >
      <NuxtImg src="./loader.svg" />
    </div>

    <span :class="{ invisible: loading }" class="inline-flex items-center">
      <Icon
        :class="[iconSpacingClasses]"
        class="min-h-[18px] min-w-[18px] flex-shrink-0"
        v-if="icon && props.iconPos === 'left' && !loading"
        :name="icon"
      />

      <slot />
      <Icon
        :class="[iconSpacingClasses]"
        class="flex-shrink-0"
        v-if="icon && props.iconPos === 'right'"
        :name="icon"
      />
    </span>
  </button>
</template>
