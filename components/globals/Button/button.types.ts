export type TButtonColor = "primary" | "secondary" | "warning" | "danger" | "info" | "neutral";
export type TButtonVariant = "filled" | "outline" | "ghost" | "link";
export type TButton = {
  variant?: TButtonVariant;
  color?: TButtonColor;
  size?: "sm" | "md" | "lg";
  block?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPos?: "left" | "right";
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  onlyIcon?: boolean;
};