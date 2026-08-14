import useProfileActions from '@/composables/actions/useProfile';
import { mapToSettingsProps } from '@/components/features/Profile/Settings/mappers';
import { sanitizeNulls } from '@/utils/transformers/sanitizeNulls';

export default function useProfileFlow() {
  const { getMeAction, error } = useProfileActions();
  const isLoading = ref(false);

  const getMeSettings = async (): Promise<ReturnType<typeof mapToSettingsProps> | null> => {
    isLoading.value = true;
    try {
      const data = await getMeAction();
      return mapToSettingsProps(sanitizeNulls(data));
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return { getMeSettings, isLoading, error };
}
