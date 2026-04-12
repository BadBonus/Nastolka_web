import useAuthFlow from '@/composables/use-cases/useAuthFlow';

type TExtParamsRequest = {
  noControle?: boolean;
  successMessage?: {
    title?: string,
    descr?: string
  };
  silent?: boolean;
};

export const useApi = async <T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1] & TExtParamsRequest
): Promise<T> => {
  const nuxtApp = useNuxtApp();
  const toast = useToast();
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const callApi = async (isRetry = false): Promise<T> => {
    const accessToken = authStore.accessToken;
    const headers = new Headers(opts?.headers);

    if (accessToken && !opts?.noControle) headers.set('Authorization', `Bearer ${accessToken}`);

    try {
      const fb = await $fetch<T>(request, {
        baseURL: config.public.apiBase,
        method: opts?.method || 'GET',
        ...opts,
        headers,
        retry: 0,
        credentials: opts?.noControle ? 'omit' : 'include'
      });

      if (opts?.successMessage && !opts?.silent && import.meta.client) {
        toast.add({
          title: opts?.successMessage.title,
          description: opts?.successMessage.descr,
          color: "success"
        });
      }

      return fb;
    } catch (err) {
      if (!isBackendError(err)) {
        if (import.meta.client && !opts?.silent) {
          toast.add({
            title: "Системная ошибка",
            description: "Не удалось связаться с сервером",
            color: "error"
          });
          console.error("Non-backend error:", err);
        }
        throw err
      }

      if (err?.statusCode === 401 && !opts?.noControle && !isRetry && !opts?.silent) {
        try {
          const {refreshToken} = await nuxtApp.runWithContext(() => useAuthFlow());
          await refreshToken();
          return await callApi(true);
        } catch (refreshError) {
          // FIXME: позже тут добавить перенос юзера на главную страницу
          console.error("Refresh token error:", refreshError);
          throw refreshError;
        }
      }

      if (import.meta.client && !opts?.silent) {
        if (err?.statusCode !== 401 || isRetry) {
          toast.add({
            title: `Ошибка ${err?.statusCode || ''}`,
            description: err?.message || 'Произошла ошибка запроса',
            color: "error",
            duration: 2000
          });
        }
        else {
          toast.add({
            title: `Ошибка авторизации`,
            color: "error",
            duration: 1000
          });
        }
      }

      throw err;
    }
  };

  return callApi();
};