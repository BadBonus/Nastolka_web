import type {TButtonColor, TButtonVariant} from "./button.types";

export const variantColorClasses: Record<
  TButtonVariant,
  Record<TButtonColor, string>
> = {
  filled: {
    primary:
      "bg-primary focus:ring-2 hover:bg-primary-hover text-text-inverted focus:ring-warning shadow-button",
    secondary:
      "bg-secondary focus:ring-2 hover:bg-secondary-hover text-text-inverted focus:ring-gray-400 shadow-button",
    warning:
      "bg-warning focus:ring-2 hover:bg-warning-hover text-white focus:ring-white shadow-button",
    danger:
      "bg-danger focus:ring-2 hover:bg-danger-hover text-white focus:ring-white shadow-button",
    info: "bg-info focus:ring-2 hover:bg-info-hover text-white focus:ring-white shadow-button",
  },
  outline: {
    primary:
      "focus:ring-2 bg-transparent outline-2 border-primary text-primary hover:bg-primary hover:text-white  focus:ring-primary shadow-button",
    secondary:
      "focus:ring-2 bg-transparent outline-2 border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary shadow-button",
    warning:
      "focus:ring-2 bg-transparent outline-2 border-warning text-warning hover:bg-warning hover:text-white focus:ring-warning shadow-button",
    danger:
      "focus:ring-2 bg-transparent outline-2 border-danger text-danger hover:bg-danger-50 focus:ring-danger shadow-button hover:bg-danger hover:text-white",
    info: "focus:ring-2 bg-transparent outline-2 border-info text-info hover:bg-info hover:text-white focus:ring-info shadow-button",
  },
  ghost: {
    primary:
      "focus:text-primary-hover bg-transparent text-primary",
    secondary:
      "focus:text-secondary-hover bg-transparent text-secondary",
    warning:
      "focus:text-warning-hover bg-transparent text-warning",
    danger: "focus:text-danger-hover bg-transparent text-danger",
    info: "focus:text-info-hover bg-transparent text-info",
  },
  link: {
    primary: "bg-transparent text-primary hover:underline",
    secondary:
      "bg-transparent text-secondary hover:underline",
    warning: "bg-transparent text-warning hover:underline",
    danger: "bg-transparent text-danger hover:underline",
    info: "bg-transparent text-info hover:underline",
  },
};


export const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-3.5 py-1.5 text-base",
  lg: "px-4.5 py-2 text-lg",
};


export const sizeClassesOnlyIcon = {
  sm: "h-7 w-7 text-sm",
  md: "h-9 w-9 text-2xl",
  lg: "h-12 w-12 text-4xl",
};