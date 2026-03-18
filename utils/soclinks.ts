import {ESocLinks} from "@consts/socLinks";
import type {TSoclinksObject} from "~/shared/types/global";

export const initSocLinks = Object.values(ESocLinks).reduce(
  (acc, key) => {
    acc[key] = "";
    return acc;
  },
  {} as TSoclinksObject,
);
export const socLinkKeys = Object.values(ESocLinks);