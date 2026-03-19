import {EDays, ETimePeriods} from "../constants/gameShedule";

export type TDataAvaCalendar = Partial<Record<EDays, ETimePeriods[]>> | null;