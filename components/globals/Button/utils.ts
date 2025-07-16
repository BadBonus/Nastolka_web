import type {TButtonColor, TButtonVariant} from "./button.types";

export const variantColorClasses: Record<
  TButtonVariant,
  Record<TButtonColor, string>
> = {
  filled: {
    primary:
      "bg-primary hover:bg-primary-hover text-text-inverted focus:ring-warning shadow-button",
    secondary:
      "bg-secondary hover:bg-secondary-hover text-text-inverted focus:ring-gray-400 shadow-button",
    warning:
      "bg-warning hover:bg-warning-hover text-white focus:ring-white shadow-button",
    danger:
      "bg-danger hover:bg-danger-hover text-white focus:ring-white shadow-button",
    info: "bg-info hover:bg-info-hover text-white focus:ring-white shadow-button",
  },
  outline: {
    primary:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white  focus:ring-primary shadow-button",
    secondary:
      "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary shadow-button",
    warning:
      "bg-transparent border-2 border-warning text-warning hover:bg-warning hover:text-white focus:ring-warning shadow-button",
    danger:
      "bg-transparent border-2 border-danger text-danger hover:bg-danger-50 focus:ring-danger shadow-button hover:bg-danger hover:text-white",
    info: "bg-transparent border-2 border-info text-info hover:bg-info hover:text-white focus:ring-info shadow-button",
  },
  ghost: {
    primary:
      "bg-transparent text-primary hover:bg-primary-50 focus:ring-primary",
    secondary:
      "bg-transparent text-secondary hover:bg-secondary-50 focus:ring-secondary",
    warning:
      "bg-transparent text-warning hover:bg-warning-50 focus:ring-warning",
    danger: "bg-transparent text-danger hover:bg-red-50 focus:ring-danger",
    info: "bg-transparent text-info hover:bg-info-50 focus:ring-info",
  },
  link: {
    primary: "bg-transparent text-primary hover:underline focus:ring-primary",
    secondary:
      "bg-transparent text-secondary hover:underline focus:ring-secondary",
    warning: "bg-transparent text-warning hover:underline focus:ring-warning",
    danger: "bg-transparent text-danger hover:underline focus:ring-danger",
    info: "bg-transparent text-info hover:underline focus:ring-info",
  },
};


export const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-1.5 text-base",
  lg: "px-4.5 py-2 text-lg",
};