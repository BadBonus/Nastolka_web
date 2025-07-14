<script setup lang="ts">
type TButton = {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "warning"
    | "danger"
    | "info";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPos?: "left" | "right";
  type?: "button" | "submit" | "reset";
};

defineOptions({
  name: "Button",
});

const attrs = useAttrs();

const props = withDefaults(defineProps<TButton>(), {
  variant: "primary",
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
    "focus:outline-none focus:ring-2  ",
    "transition-all duration-200 ease-in-out",
    props.disabled || props.loading ? "opacity-60 cursor-not-allowed" : "",
  ];

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-1.5 text-base",
    lg: "px-4.5 py-2 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-hover text-text-inverted focus:ring-warning shadow-button",
    secondary:
      "bg-secondary text-text-inverted hover:bg-secondary-hover focus:ring-gray-400 shadow-button",
    outline:
      "bg-transparent border-2 border-link text-link hover:bg-blue-50 focus:ring-link shadow-button",
    ghost: "bg-transparent text-link hover:bg-blue-50 focus:ring-link ",
    link: "bg-transparent text-link hover:underline focus:ring-link",
    warning:
      "bg-warning text-white hover:bg-warning-hover focus:ring-white  shadow-button",
    danger:
      "bg-danger text-white hover:bg-danger-hover focus:ring-white shadow-button",
    info: "bg-info text-white hover:bg-info-hover focus:ring-white shadow-button",
  };

  const roundedClass = props.rounded ? "rounded-full" : "rounded";

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
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
        v-if="icon && iconPos === 'left'"
        :name="icon"
      />

      <slot />
      <Icon
        :class="[iconSpacingClasses]"
        class="flex-shrink-0 text-xl"
        v-if="icon && iconPos === 'right'"
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
