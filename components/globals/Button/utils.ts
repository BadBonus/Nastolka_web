import type {TButtonColor, TButtonVariant} from "./button.types";

const baseFilledClasses = 'focus:ring-2 shadow-button';
const baseOutlineClasses = 'focus:ring-2 bg-transparent outline-2';
const baseGhostClasses = 'bg-transparent'
const baseLinkClasses = 'bg-transparent hover:underline';

export const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-3.5 py-1.5 text-base",
  lg: "px-4.5 py-2 text-lg",
};

export const sizeClassesOnlyIcon = {
  sm: "h-7 w-7 text-lg",
  md: "h-9 w-9 text-3xl",
  lg: "h-12 w-12 text-4xl",
};

export const variantColorClasses: Record<
  TButtonVariant,
  Record<TButtonColor, string>
> = {
  filled: {
    primary: `bg-primary hover:bg-primary-hover text-text-inverted focus:ring-warning ${baseFilledClasses}`,
    secondary: `bg-secondary hover:bg-secondary-hover text-text-inverted focus:ring-gray-400 ${baseFilledClasses}`,
    warning: `bg-warning hover:bg-warning-hover text-white focus:ring-white ${baseFilledClasses}`,
    danger: `bg-danger hover:bg-danger-hover text-white focus:ring-white ${baseFilledClasses}`,
    info: `bg-info hover:bg-info-hover text-white focus:ring-white ${baseFilledClasses}`,
    neutral: `bg-neutral hover:bg-neutral-hover text-text focus:ring-white ${baseFilledClasses}`,
  },
  outline: {
    primary: `border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary ${baseOutlineClasses}`,
    secondary: `border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary ${baseOutlineClasses}`,
    warning: `border-warning text-warning hover:bg-warning hover:text-white focus:ring-warning ${baseOutlineClasses}`,
    danger: `border-danger text-danger hover:bg-danger-50 focus:ring-danger hover:bg-danger hover:text-white ${baseOutlineClasses}`,
    info: `border-info text-info hover:bg-info hover:text-white focus:ring-info ${baseOutlineClasses}`,
    neutral: `border-neutral text-neutral hover:bg-neutral hover:text-white focus:ring-neutral ${baseOutlineClasses}`,
  },
  ghost: {
    primary: `focus:text-primary-hover text-primary ${baseGhostClasses}`,
    secondary: `focus:text-secondary-hover text-secondary ${baseGhostClasses}`,
    warning: `focus:text-warning-hover text-warning ${baseGhostClasses}`,
    danger: `focus:text-danger-hover text-danger ${baseGhostClasses}`,
    info: `focus:text-info-hover text-info ${baseGhostClasses}`,
    neutral: `focus:text-inverted-hover text-inverted ${baseGhostClasses}`,
  },
  link: {
    primary: `text-primary ${baseLinkClasses}`,
    secondary: `text-secondary ${baseLinkClasses}`,
    warning: `text-warning ${baseLinkClasses}`,
    danger: `text-danger ${baseLinkClasses}`,
    info: `text-info ${baseLinkClasses}`,
    neutral: `text-inverted ${baseLinkClasses}`,
  },
};