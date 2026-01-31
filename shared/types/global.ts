import {ESocLinks} from "@/shared/socLinks";

export type TSoclinksObject = Partial<Record<ESocLinks, string | undefined>>;

export type TGameHistory = Array<{id: string, startTime: string}>;