import type {FetchContext} from 'ofetch';
import useAuthFlow from '@/composables/use-cases/useAuthFlow';

type TExtParamsRequest = {silent?: boolean}

const API_BASE = '/api';

export const useApi = <T>(request: Parameters<typeof $fetch<T>>[0], opts?: Parameters<typeof $fetch<T>>[1] & TExtParamsRequest) => {

  const toast = useToast();
  const authStore = useAuthStore();
  const {refreshToken} = useAuthFlow();
  const config = useRuntimeConfig();

  return $fetch<T>(request, {
    baseURL: config.public.apiBase ?? API_BASE,
    ...opts,

    onRequest({options}) {
      const accessToken = authStore.accessToken;
      if (accessToken) {
        // Инициализируем headers, если их нет
        options.headers = new Headers(options.headers);
        options.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },

    async onResponseError(context: FetchContext & {response: {status: number}}) {
      const {response, options} = context;

      if (!opts?.silent) {
        toast.add({
          title: 'ошибка ' + response.status,
          description: response.statusText,
          color: "error",
          duration: 50000
        });
      }


      if (response.status === 401 && !options.retry) {
        options.retry = 0;

        try {
          await refreshToken();
          return $fetch(request, options as any);
        } catch (error) {
          authStore.logout();
          navigateTo('/');
          return Promise.reject(error);
        }
      }
    },
  });
};