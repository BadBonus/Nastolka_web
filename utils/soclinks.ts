import {ESocLinks} from "~/types/global";
import type {TSoclinksObject} from "~/types/global";



export const initSocLinks = Object.values(ESocLinks).reduce(
  (acc, key) => {
    acc[key] = "";
    return acc;
  },
  {} as TSoclinksObject,
);
export const socLinkKeys = Object.values(ESocLinks);