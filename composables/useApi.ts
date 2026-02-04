import type {FetchError, FetchContext} from 'ofetch';

export const useApi = <T>(request: Parameters<typeof $fetch<T>>[0], opts?: Parameters<typeof $fetch<T>>[1]) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  return $fetch<T>(request, {
    baseURL: config.public.apiBase,
    ...opts,

    // 1. ПЕРЕД ЗАПРОСОМ: Добавляем токен
    onRequest({options}) {
      const accessToken = authStore.accessToken;
      if (accessToken) {
        // Инициализируем headers, если их нет
        options.headers = new Headers(options.headers);
        options.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },

    // 2. ПРИ ОШИБКЕ: Ловим 401
    async onResponseError(context: FetchContext & {response: {status: number}}) {
      const {response, options} = context;

      // Если ошибка 401 (Unauthorized) И мы еще не пытались обновить токен для этого запроса
      if (response.status === 401 && !options._retry) {
        // Ставим флаг, чтобы не попасть в бесконечный цикл, 
        // если refresh тоже вернет 401
        options._retry = true;

        try {
          // Вызываем метод обновления токенов в сторе
          await authStore.refresh();

          // Если обновление прошло успешно — повторяем ИЗНАЧАЛЬНЫЙ запрос
          // Важно: мы должны вернуть результат нового вызова
          // Мы используем тот же $fetch, но уже с обновленным токеном (он возьмется в onRequest)
          return $fetch(request, options as any);
        } catch (error) {
          // Если refresh не удался (например, токен протух окончательно)
          // Разлогиниваем пользователя и редиректим
          authStore.logout();
          return Promise.reject(error);
        }
      }
    },
  });
};