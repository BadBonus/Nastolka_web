import type {UseFetchOptions} from "nuxt/app";
import {withQuery} from "ufo";
import {useApi} from "./useApi";
import debounce from "#utils/debounce";
import {type TypePaginationMeta, EtypesSort} from "#openApi";

export type TResWithMeta<TData> = {
  data: TData;
  meta: TypePaginationMeta;
};

// TODO: Добавь функционал локального sort

// types
/**
 * Уточнения:
 * @param commonRequest - url.
 * @param filters
 * @param addForUrl - Дополнение к текущему адресу для указания доп. правил по запросу
 */
export type TCatalogItemsOptions<Q, F> = {
  commonRequest: string,
  // requestForSingle?: string,
  query?: Q,
  filters?: F,
  addForUrl?: object
}

export type TGetItemsParams = {page?: number, take?: number, order?: string, search?: string, filters?: object};

export type TCatalogItems<T, Q, F> = {
  items: Ref<T[]>;
  meta: Ref<TypePaginationMeta>;
  loading: Ref<boolean>;
  search: Ref<string>;
  getNextPage: () => Promise<TResWithMeta<T[]>>;
  getItems: (params?: TGetItemsParams) => Promise<TResWithMeta<T[]>>;
  getPrevPage: () => Promise<TResWithMeta<T[]>>;
  resetMeta: () => void;
}

export type TFrontendPagination<T> = {
  items: T[],
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  maxPages: number,
}


/**
 * Создаёт объект для управления пагинацией и получения данных из каталога.
 * @template T - Тип ожидаемых сущностей с сервера.
 * @param {TCatalogItemsOptions} requests - Настройки запроса к API каталога.
 * @param {UseFetchOptions<any>} [fetchOptions] - Опциональные параметры для настройки запроса через useApi.
 * @returns {TCatalogItems<T>} Объект с данными каталога, метаинформацией и методами управления пагинацией.
 */


export default function <T>(requests: TCatalogItemsOptions, fetchOptions?: UseFetchOptions<any>): TCatalogItems<T> {
  const defaultMeta: TypePaginationMeta = {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  };


  const state = reactive({
    items: [] as T[],
    meta: defaultMeta as Meta,
    loading: false,
    search: "" as string
  });

  const getItems = async (params?: TGetItemsParams): Promise<Pagination<T[]>> => {
    state.loading = true;

    const modUrl = withQuery(requests.commonRequest, {
      page: requests.query?.page ?? params?.page ?? state.meta.page,
      take: requests.query?.take ?? params?.take ?? state.meta.take,
      search: params?.search ?? state.search,
      order: requests.query?.order ?? params?.order,
      filter: requests.filters,
      ...requests.addForUrl
    });

    const fb = await apiFetch<Pagination<T[]>>(modUrl, fetchOptions);

    if (fb.error.value) {
      state.items = [];
      state.meta = defaultMeta;
      console.error('error on requested data');
      console.log(fb.error.value);
      state.loading = false;
      return {data: [], meta: defaultMeta};
    }

    // @ts-ignore
    state.items = fb.data.value.data;
    state.meta = fb.data.value.meta;
    state.loading = false;
    return fb.data.value;
  };

  const getNextPage = async (): Promise<TResWithMeta<T[]>> => await getItems({page: state.meta.page + 1});
  const getPrevPage = async (): Promise<TResWithMeta<T[]>> => await getItems({page: state.meta.page - 1});

  const resetMeta = () => {
    state.meta = defaultMeta;
  };

  watch(() => state.search, debounce(async (newSearch: string) => {
    await getItems({search: newSearch, page: 1});
  }, 500));

  // Используем ToRefs чтоб не было геммороя с постоянной нуждой использовать .value при обращении к вынесенным объектам в template благодаря UnwrapRefSimple
  return {
    ...toRefs(state) as {
      items: Ref<T[]>;
      meta: Ref<TypePaginationMeta>;
      loading: Ref<boolean>;
      search: Ref<string>;
    },
    getNextPage,
    getItems,
    getPrevPage,
    resetMeta
  };
}