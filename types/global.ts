export enum ESocLinks {
  VK = "vk",
  TELEGRAM = "telegram",
  DISCORD = "discord",
  INSTAGRAM = "instagram",
  X = "x",
  REDDIT = "reddit",
}
export type TSoclinksObject = Record<ESocLinks, string | undefined>;