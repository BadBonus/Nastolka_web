<script setup lang="ts">
import type { TButton } from "./button.types";
import { buttonVariants, type ButtonVariantProps } from "./utils";
import type { ButtonHTMLAttributes, ReservedProps } from "vue";
import { cn } from "@/lib/utils";
// import {
//   sizeClassesOnlyIcon,
//   sizeClasses,
//   variantColorClasses,
// } from "./utils_old";

defineOptions({
  name: "Button",
});

const props = withDefaults(
  defineProps<TButton & /* @vue-ignore */ ButtonHTMLAttributes>(),
  {
    block: false,
    disabled: false,
    loading: false,
    iconPos: "left",
    type: "button",
  },
);

defineSlots<{ default: () => any }>();

const slots = useSlots();

const buttonClasses = computed(() =>
  cn(
    buttonVariants({
      variant: props.variant,
      color: props.color,
      size: props.size,
      rounded: props.rounded,
      onlyIcon: props.onlyIcon,
      state: props.disabled || props.loading ? "disabled" : "idle",
      class: props.block ? "w-full" : "",
    }),
  ),
);

// const buttonClasses = computed(() => {
//   const baseClasses = [
//     "inline-flex items-center justify-center font-semibold",
//     "focus:outline-none",
//     "transition-all duration-200 ease-in-out",
//     props.block ? "w-full" : "",
//     props.disabled || props.loading ? "opacity-60 cursor-not-allowed" : "",
//   ];

//   const roundedClass = props.rounded ? "rounded-full" : "rounded";
//   const resultSizeClasses = props.onlyIcon
//     ? sizeClassesOnlyIcon[props.size]
//     : sizeClasses[props.size];

//   return [
//     ...baseClasses,
//     resultSizeClasses,
//     variantColorClasses[props.variant][props.color],
//     roundedClass,
//   ];
// });

const iconSpacingClasses = computed(() => {
  if (!props.icon) return "";
  if (props.iconPos === "left") return slots.default ? "mr-0.5" : "";
  if (props.iconPos === "right") return slots.default ? "ml-0.5" : "";
  return "";
});
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <div
      v-if="props.loading"
      class="inset-0 flex items-center justify-center"
      aria-label="Загрузка"
      role="status"
    >
      <NuxtImg src="./loader.svg" />
    </div>

    <span
      :class="{ invisible: props.loading }"
      class="inline-flex items-center"
    >
      <Icon
        :class="[iconSpacingClasses]"
        class="flex-shrink-0"
        v-if="props.icon && props.iconPos === 'left' && !props.loading"
        :name="props.icon"
      />

      <slot />

      <Icon
        :class="[iconSpacingClasses]"
        class="flex-shrink-0"
        v-if="props.icon && props.iconPos === 'right' && !props.loading"
        :name="props.icon"
      />
    </span>
  </button>
</template>
