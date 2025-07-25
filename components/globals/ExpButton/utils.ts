import {cva, type VariantProps} from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold focus:outline-none transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        filled: "text-text-inverted shadow-button focus:ring-2",
        outline: "bg-transparent outline-2 shadow-button focus:ring-2",
        ghost: "bg-transparent",
        link: "bg-transparent hover:underline",
      },
      color: {
        primary: "",
        secondary: "",
        warning: "",
        danger: "",
        info: "",
        neutral: "",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded",
      },
      onlyIcon: {
        true: "",
        false: "",
      },
      state: {
        idle: "",
        disabled: "opacity-60 cursor-not-allowed",
      },
    },
    compoundVariants: [
      // Filled 
      {variant: "filled", color: "primary", class: "bg-primary hover:bg-primary-hover focus:ring-warning"},
      {variant: "filled", color: "secondary", class: "bg-secondary hover:bg-secondary-hover focus:ring-gray-400"},
      {variant: "filled", color: "warning", class: "bg-warning hover:bg-warning-hover focus:ring-warning"},
      {variant: "filled", color: "danger", class: "bg-danger hover:bg-danger-hover focus:ring-danger"},
      {variant: "filled", color: "info", class: "bg-info hover:bg-info-hover focus:ring-info"},
      {variant: "filled", color: "neutral", class: "bg-neutral hover:bg-neutral-hover focus:ring-neutral text-text"},

      // Outline 
      {variant: "outline", color: "primary", class: "border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary"},
      {variant: "outline", color: "secondary", class: "border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary"},
      {variant: "outline", color: "warning", class: "border-warning text-warning hover:bg-warning hover:text-white focus:ring-warning"},
      {variant: "outline", color: "danger", class: "border-danger text-danger hover:bg-danger hover:text-white focus:ring-danger"},
      {variant: "outline", color: "info", class: "border-info text-info hover:bg-info hover:text-white focus:ring-info"},
      {variant: "outline", color: "neutral", class: "border-neutral text-neutral hover:bg-neutral hover:text-white focus:ring-neutral"},

      {variant: ["ghost", "link"], color: "primary", class: "text-primary focus:text-primary-hover"},
      {variant: ["ghost", "link"], color: "secondary", class: "text-secondary focus:text-secondary-hover"},
      {variant: ["ghost", "link"], color: "warning", class: "text-warning focus:text-warning-hover"},
      {variant: ["ghost", "link"], color: "danger", class: "text-danger focus:text-danger-hover"},
      {variant: ["ghost", "link"], color: "info", class: "text-info focus:text-info-hover"},
      {variant: ["ghost", "link"], color: "neutral", class: "text-inverted focus:text-neutral-hover"},

      // Размеры не изменились
      {size: 'sm', onlyIcon: false, class: 'px-3 py-1'},
      {size: 'md', onlyIcon: false, class: 'px-3.5 py-1.5'},
      {size: 'lg', onlyIcon: false, class: 'px-4.5 py-2'},
      {size: 'sm', onlyIcon: true, class: 'h-7 w-7 text-lg'},
      {size: 'md', onlyIcon: true, class: 'h-9 w-9 text-3xl'},
      {size: 'lg', onlyIcon: true, class: 'h-12 w-12 text-4xl'},
    ],
    defaultVariants: {
      variant: "filled",
      color: "primary",
      size: "md",
      rounded: false,
      onlyIcon: false,
      state: "idle",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;