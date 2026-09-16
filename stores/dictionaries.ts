import type { DICTIONARIES } from '#openApi';

export type TDictionaries = DICTIONARIES['INDEX']['GET']['res'];

export const useDictionariesStore = defineStore('dictionaries', {
  state: () => ({
    data: null as TDictionaries | null,
    isLoaded: false,
    error: null as string | null,
  }),
  getters: {
    eventFormats: (state): TDictionaries['eventFormats'] => state.data?.eventFormats ?? [],
    sessionTypes: (state): TDictionaries['sessionTypes'] => state.data?.sessionTypes ?? [],
    currencies: (state): TDictionaries['currencies'] => state.data?.currencies ?? [],
    gameGenres: (state): TDictionaries['gameGenres'] => state.data?.gameGenres ?? [],
    gameSystems: (state): TDictionaries['gameSystems'] => state.data?.gameSystems ?? [],
    gamePlatforms: (state): TDictionaries['gamePlatforms'] => state.data?.gamePlatforms ?? [],
  },
  actions: {
    setDictionaries(data: TDictionaries) {
      this.data = data;
      this.isLoaded = true;
      this.error = null;
    },
    setError(message: string) {
      this.error = message;
      this.isLoaded = false;
    },
  },
});
