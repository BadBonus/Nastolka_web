import useAuthFlow from '@/composables/use-cases/useAuthFlow';

type TExtParamsRequest = {
  silent?: boolean;
  noControle?: boolean;
};

export const useApi = async <T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1] & TExtParamsRequest
): Promise<T> => {
  const toast = useToast();
  const authStore = useAuthStore();
  const {refreshToken} = useAuthFlow();
  const config = useRuntimeConfig();

  const callApi = async (isRetry = false): Promise<T> => {
    const accessToken = authStore.accessToken;

    const headers = new Headers(opts?.headers);
    if (accessToken && !opts?.noControle) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    try {
      return await $fetch<T>(request, {
        baseURL: config.public.apiBase,
        method: opts?.method || 'GET',
        ...opts,
        headers,
        retry: 0,
      });
    } catch (err) {
      const error = err as TBackendError;
      const response = error;


      if (response?.statusCode === 401 && !opts?.noControle && !isRetry) {
        try {
          await refreshToken();
          return await callApi(true);
        } catch (refreshError) {
          authStore.logout();
          navigateTo('/');
          return Promise.reject(refreshError);
        }
      }

      if (!opts?.silent && import.meta.client) {
        if (response?.statusCode !== 401 || isRetry) {
          toast.add({
            title: `Ошибка ${response?.statusCode || ''}`,
            description: response?.message || 'Произошла ошибка запроса',
            color: "error",
            duration: 3000
          });
        }
      }

      throw error;
    }
  };

  return callApi();
};