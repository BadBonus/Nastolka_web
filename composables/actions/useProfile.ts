import { API_ENDPOINTS, type TApiPayloads } from '#consts/api-endpoints';

export type TProfileMeRes = TApiPayloads['PROFILE']['ME']['GET']['res'];

const urlProfileMe = API_ENDPOINTS.PROFILE.ME;

export default function useActions() {
  const error = ref<string | null>(null);

  const getMeAction = async () => {
    error.value = null;

    try {
      const data = await useApi<TProfileMeRes>(urlProfileMe, { method: 'GET', credentials: 'include' });
      return data;
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка получения информации о пользователе';
      throw err;
    }
  };

  return {
    getMeAction,
    error,
  };
}
