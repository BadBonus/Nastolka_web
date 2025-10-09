import {ESkillGameMaster} from "@/shared/skills";
import type {ELang} from "~/shared/lang";
import {game_systems} from "~/shared/gameAttrs";

type TGMFilters = {
  sortBy?: ESkillGameMaster;
  lang?: ELang[],
  timezone?: string,
  cost?: {
    from: number,
    to: number
  },
  gameType?: string[], //потом добавить enum отдельный,
  theme?: string[], //тоже отдельно добавить
  gameSystems?: typeof game_systems
}