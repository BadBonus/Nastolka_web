import { DICTIONARIES } from '#openApi';

type TDictionariesRes = DICTIONARIES['INDEX']['GET']['res'];

const urlDictionaries = DICTIONARIES.INDEX;

export default function useActions() {
  const error = ref<string | null>(null);

  const getDictionariesAction = async () => {
    error.value = null;

    try {
      const data = await useApi<TDictionariesRes>(urlDictionaries, {
        method: 'GET',
        silent: true,
        noControle: true,
      });
      return data;
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка получения справочников';
      throw err;
    }
  };

  return {
    getDictionariesAction,
    error,
  };
}
