import useActions from '@/composables/actions/useProfile';

export default function useAuthFlow() {
  const { getMeAction } = useActions();
  const isLoading = ref(false);

  const getMe = async () => {
    isLoading.value = true;
    try {
      const data = await getMeAction();

      return data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { getMe, isLoading };
}
