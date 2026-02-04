import type {IApiRepository} from '~/shared/repositories/interfaces/IApiRep';

export class ApiClient implements IApiRepository {
  private readonly whitelistedRoute = ['/auth/sign-in'];
  constructor(private readonly baseUrl: string) { }

  public async fetch<T>(url: string, options: any = {}): Promise<T> {
    this.mutateOptions(options);

    const token = useCookie('token');

    console.log(token);

    //   try {
    //     return await $fetch<T>(url, {
    //       baseURL: this.baseUrl,
    //       ...options,
    //       headers: {
    //         ...(options.headers ?? {}),
    //         ...this.additionalHeaders(token.value as string),
    //       },
    //     });
    //   } catch (error: any) {
    //     if (error?.response?.status === 401 && !this.whitelistedRoute.includes(url)) {
    //       const token = await this.refreshToken();
    //       if (token) {
    //         return await $fetch<T>(url, {
    //           baseURL: this.baseUrl,
    //           ...options,
    //           headers: {
    //             ...(options.headers ?? {}),
    //             ...this.additionalHeaders(token as string),
    //           },
    //         });
    //       }
    //     }
    //     this.apiErrors(error);
    //     throw error;
    //   }
    // }

    // private async refreshToken() {
    //   const refreshToken = useCookie('refresh_token');
    //   try {
    //     const refresh = await $fetch<DevelopmentToken>('/auth/refresh', {
    //       method: 'POST',
    //       baseURL: this.baseUrl,
    //       headers: {
    //         Authorization: `Bearer ${refreshToken.value}`,
    //       },
    //     });

    //     return refresh.token;
    //   } catch (error) {
    //     console.error('Ошибка обновления токена:', error);
    //     const authStore = useAuthStore();
    //     authStore.user = null;
    //     const token = useCookie('token');
    //     token.value = null;
    //     navigateTo('/sign-in');
    //     return undefined;
    //   }
    // }

    // private additionalHeaders(token: string) {
    //   const i18 = useCookie('i18n_redirected');
    //   return {
    //     Authorization: `Bearer ${token}`,
    //     Cookie: `i18n_redirected=${i18.value ?? 'ru'}`,
    //     ['x-language']: i18.value ?? 'ru',
    //   };
    // }

    // private mutateOptions(options: any) {
    //   if (
    //     options.body &&
    //     typeof options.body === 'object' &&
    //     !Array.isArray(options.body) &&
    //     !(options.body instanceof Blob) &&
    //     !(options.body instanceof FormData)
    //   ) {
    //     options.body = this.cleanObject(options.body);
    //   }

    //   if (options.params && typeof options.params === 'object') {
    //     options.params = this.cleanObject(options.params);
    //   }
    // }

    // private cleanObject<T>(obj: T): T {
    //   if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;

    //   const result = {} as T;

    //   Object.entries(obj as Record<string, any>).forEach(([key, value]) => {
    //     if (value === undefined || value === '') {
    //       return;
    //     }

    //     if (value === null) {
    //       (result as Record<string, any>)[key] = null;
    //       return;
    //     }

    //     if (typeof value === 'object' && !Array.isArray(value)) {
    //       const cleanedValue = this.cleanObject(value);
    //       if (Object.keys(cleanedValue).length > 0) {
    //         (result as Record<string, any>)[key] = cleanedValue;
    //       }
    //     } else {
    //       (result as Record<string, any>)[key] = value;
    //     }
    //   });

    //   return result;
    // }

    // private apiErrors(error: unknown): void {
    //   const data = (error as any)?.response?._data;

    //   if (!data) return;

    //   const errorMessage = data.errors?.[0] ?? data.message ?? 'Unknown error';
    //   const message = /^[a-z]+\.[a-z]+/.test(errorMessage) && errorMessage;

    //   console.error(`${data.statusCode} - ${message}`);
    // }
  }
}