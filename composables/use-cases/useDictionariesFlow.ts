import useActions from '@/composables/actions/useDictionaries';
import {sanitizeNulls} from '~/utils/transformers/nullToUndefined';

export default function useDictionariesFlow() {
  const {getDictionariesAction} = useActions();
  const store = useDictionariesStore();
  const isLoading = ref(false);

  const loadDictionaries = async () => {
    if (store.isLoaded || isLoading.value) return;

    isLoading.value = true;
    try {
      const data = await getDictionariesAction();
      store.setDictionaries(sanitizeNulls(data));
    } catch (err) {
      console.error(err);
      store.setError('Не удалось загрузить справочники');
    } finally {
      isLoading.value = false;
    }
  };

  return {loadDictionaries, isLoading};
}
