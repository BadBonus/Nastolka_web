import useProfileActions from '@/composables/actions/useProfile';
import { mapToSettingsProps } from '@/components/features/Profile/Settings/mappers';
import { sanitizeNulls } from '~/utils/transformers/nullToUndefined';
import type { TPatchProfilePayload } from '~/shared/types/profile';
import type { CalendarDate } from '@internationalized/date';

export default function useProfileFlow() {
  const { getMeAction, patchMeAction, error } = useProfileActions();
  const isLoading = ref(false);
  const toast = useToast();

  const getMeSettings = async (): Promise<ReturnType<typeof mapToSettingsProps> | null> => {
    isLoading.value = true;
    try {
      console.log('TEST');
      const data = await getMeAction();
      console.log('TEST');
      console.log(data);
      return mapToSettingsProps(sanitizeNulls(data));
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const patchMe = async (data: TPatchProfilePayload, newAvatar?: HTMLCanvasElement) => {
    isLoading.value = true;

    try {
      const formData = new FormData();

      if (newAvatar) {
        const blob = await new Promise<Blob | null>((resolve) => newAvatar?.toBlob(resolve, 'image/png'));
        if (blob) {
          formData.append('avatar', blob, 'avatar.png');
        }
      }

      // NOTE: после добавления фичи смена почты добавить и обработку email
      if (data.fio) formData.append('fullName', data.fio);
      if (data.about) formData.append('description', data.about);
      if (data.birthdate) formData.append('birthdate', (data.birthdate as CalendarDate).toDate('UTC').toISOString() || '');
      if (data.timezone) formData.append('timezone', data.timezone);

      if (data.social_links) {
        formData.append('soclinks', JSON.stringify(data.social_links));
      }

      if (data.availableDays && data.availableDays.length > 0) {
        // В multipart/form-data массивы объектов нельзя передать напрямую.
        // Если на бэкенде нет кастомного парсера для массивов, передаем как JSON-строку
        formData.append('schedules', JSON.stringify(data.availableDays));
      }

      await patchMeAction(formData as unknown as Parameters<typeof patchMeAction>[0]);

      toast.add({
        title: 'Успех',
        description: 'Форма была успешно отправлена.',
        color: 'success',
      });
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return { getMeSettings, patchMe, isLoading, error };
}
