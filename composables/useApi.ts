import useAuthFlow from '@/composables/use-cases/useAuthFlow';

/**
 * Проверяет, что тело ошибки соответствует контракту бэкенда.
 *
 * @param data — поле `err.data` из исключения `$fetch`.
 * @returns `true`, если объект содержит `statusCode` и `message`.
 */
const isBackendError = (data: any): data is TBackendError => {
  return data !== null && typeof data === 'object' && 'statusCode' in data && 'message' in data;
};

/**
 * Дополнительные опции транспортного клиента поверх параметров `$fetch`.
 */
type TExtParamsRequest = {
  /**
   * Не подставлять `Authorization` и не пытаться обновить сессию по 401.
   * Нужен для публичных эндпоинтов (логин, регистрация).
   */
  noControle?: boolean;
  /**
   * Тост об успехе. Показывается только на клиенте и только если `silent` не задан.
   */
  successMessage?: {
    title?: string;
    descr?: string;
  };
  /**
   * Отключить тосты и retry по 401. Ошибка всё равно пробрасывается наверх.
   */
  silent?: boolean;
};

/**
 * Транспортный HTTP-клиент поверх `$fetch`.
 *
 * Вызывается только из слоя `composables/actions`.
 * Подставляет `baseURL` из runtime-config, Bearer-токен из `useAuthStore`,
 * показывает тосты и при 401 один раз пробует `refreshToken`, затем повторяет запрос.
 *
 * @typeParam T — ожидаемый тип тела ответа.
 * @param request — URL или путь относительно `config.public.apiBase`.
 * @param opts — опции `$fetch` плюс {@link TExtParamsRequest}.
 * @returns Распарсенное тело ответа.
 * @throws Оригинальную ошибку `$fetch` (в т.ч. после неудачного refresh).
 *
 * @example
 * ```ts
 * const data = await useApi<TLoginRes>(urlAuthUserLogin, {
 *   method: 'POST',
 *   body,
 *   noControle: true,
 *   credentials: 'include',
 * });
 * ```
 */
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

    if (accessToken && !opts?.noControle) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    try {
      const response = await $fetch<T>(request, {
        baseURL: config.public.apiBase,
        method: opts?.method || 'GET',
        ...opts,
        headers,
        retry: 0,
      });

      if (opts?.successMessage && !opts?.silent && import.meta.client) {
        toast.add({
          title: opts?.successMessage.title,
          description: opts?.successMessage.descr,
          color: 'success',
        });
      }

      return response;
    } catch (err: any) {
      const errorData = err.data;

      if (!isBackendError(errorData)) {
        if (import.meta.client && !opts?.silent) {
          toast.add({
            title: 'Системная ошибка',
            description: 'Не удалось связаться с сервером',
            color: 'error',
          });
          console.error('Non-backend error:', err);
        }
        throw err;
      }

      if (err.statusCode === 401 && !opts?.noControle && !isRetry && !opts?.silent) {
        try {
          const { refreshToken } = await nuxtApp.runWithContext(() => useAuthFlow());
          await refreshToken();
          return await callApi(true);
        } catch (refreshError) {
          // FIXME
          console.error('Refresh token error:', refreshError);
          throw refreshError;
        }
      }

      if (import.meta.client && !opts?.silent) {
        if (err.statusCode !== 401 || isRetry) {
          const errorMessage = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;

          toast.add({
            title: `Ошибка ${err.statusCode || errorData.statusCode}`,
            description: errorMessage || 'Произошла ошибка запроса',
            color: 'error',
            duration: 2000,
          });
        } else {
          toast.add({
            title: 'Ошибка авторизации',
            color: 'error',
            duration: 1000,
            description: errorData.message as string,
          });
        }
      }

      throw err;
    }
  };

  return callApi();
};
