<script setup lang="ts">
import type { TButton } from "./button.types";
import { variantColorClasses, sizeClasses } from "./utils";

defineOptions({
  name: "Button",
});
defineEmits<{
  (e: "click"): void;
}>();

const attrs = useAttrs();

const props = withDefaults(defineProps<TButton>(), {
  variant: "filled",
  color: "primary",
  size: "md",
  block: false,
  rounded: false,
  disabled: false,
  loading: false,
  iconPos: "left",
  type: "button",
});

const buttonClasses = computed(() => {
  const baseClasses = [
    "inline-flex items-center justify-center font-semibold relative",
    "focus:outline-none focus:ring-2",
    "transition-all duration-200 ease-in-out",
    props.block ? "w-full" : "",
    props.disabled || props.loading ? "opacity-60 cursor-not-allowed" : "",
  ];

  const roundedClass = props.rounded ? "rounded-full" : "rounded";

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantColorClasses[props.variant][props.color],
    roundedClass,
  ];
});

const iconSpacingClasses = computed(() => {
  if (!props.icon) return "";
  if (props.iconPos === "left") return "mr-0.5";
  if (props.iconPos === "right") return "ml-0.5";
  return "";
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    v-bind="attrs"
    @click="$emit('click')"
  >
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg
        class="h-5 w-5 animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>

    <span :class="{ invisible: loading }" class="inline-flex items-center">
      <Icon
        :class="[iconSpacingClasses]"
        class="flex-shrink-0 text-xl"
        v-if="icon && props.iconPos === 'left'"
        :name="icon"
      />

      <slot />
      <Icon
        :class="[iconSpacingClasses]"
        class="flex-shrink-0 text-xl"
        v-if="icon && props.iconPos === 'right'"
        :name="icon"
      />
    </span>
  </button>
</template>

<style>
.shadow-button {
  box-shadow: 2px 2px 0 var(--color-shadow);
}
</style>
