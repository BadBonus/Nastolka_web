import type { TypePaginationMeta, TypeBaseQueryDto } from '#openApi';
import { watchDebounced } from '@vueuse/core';

export type TResWithMeta<TData> = {
  data: TData;
  meta: TypePaginationMeta;
};

export type TCatalogQuery<TFilters extends object = Record<string, never>> = TypeBaseQueryDto & TFilters;

export type TCatalogFiltersOf<TQuery> = Omit<NonNullable<TQuery>, keyof TypeBaseQueryDto>;

export type TUseCatalogItemsOptions<TItem, TFilters extends object = Record<string, never>> = {
  fetch: (query: TCatalogQuery<TFilters>) => Promise<TResWithMeta<TItem[]>>;
  initialQuery?: Partial<TypeBaseQueryDto>;
  initialFilters?: Partial<TFilters>;
  debounceMs?: number;
  mode?: 'replace' | 'append';
};

export type TCatalogApplyQuery<TFilters extends object = Record<string, never>> = {
  q?: string;
  sortOrder?: TypeBaseQueryDto['sortOrder'];
  /** Полная замена filters (не merge). */
  filters?: Partial<TFilters>;
  page?: number;
};

export type TCatalogItemsReturn<TItem, TFilters extends object = Record<string, never>> = {
  items: Ref<TItem[]>;
  meta: Ref<TypePaginationMeta>;
  loading: Ref<boolean>;
  error: Ref<unknown>;
  q: Ref<string>;
  page: Ref<number>;
  limit: Ref<number>;
  sortOrder: Ref<TypeBaseQueryDto['sortOrder']>;
  filters: Ref<Partial<TFilters>>;
  canNext: ComputedRef<boolean>;
  canPrev: ComputedRef<boolean>;
  getItems: (params?: Partial<TypeBaseQueryDto>) => Promise<TResWithMeta<TItem[]>>;
  getNextPage: () => Promise<TResWithMeta<TItem[]>>;
  getPrevPage: () => Promise<TResWithMeta<TItem[]>>;
  setFilters: (next: Partial<TFilters>) => Promise<TResWithMeta<TItem[]>>;
  applyQuery: (next: TCatalogApplyQuery<TFilters>) => Promise<TResWithMeta<TItem[]>>;
  resetMeta: () => void;
  refresh: () => Promise<TResWithMeta<TItem[]>>;
};

const createDefaultMeta = (): TypePaginationMeta => ({
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
  hasNext: false,
  hasPrev: false,
});

/**
 * Универсальный state-компосабл каталога: пагинация, поиск, фильтры.
 * HTTP не вызывает — принимает `fetch` (его передаёт use-case через actions).
 */
export default function useCatalogItems<TItem, TFilters extends object = Record<string, never>>(
  options: TUseCatalogItemsOptions<TItem, TFilters>
): TCatalogItemsReturn<TItem, TFilters> {
  const mode = options.mode ?? 'replace';
  const debounceMs = options.debounceMs ?? 500;

  const items = ref<TItem[]>([]) as Ref<TItem[]>;
  const meta = ref<TypePaginationMeta>(createDefaultMeta());
  const loading = ref(false);
  const error = ref<unknown>(null);

  const q = ref(options.initialQuery?.q ?? '');
  const page = ref(options.initialQuery?.page ?? 1);
  const limit = ref(options.initialQuery?.limit ?? 20);
  const sortOrder = ref<TypeBaseQueryDto['sortOrder']>(options.initialQuery?.sortOrder ?? 'desc');
  const filters = ref<Partial<TFilters>>({ ...(options.initialFilters ?? {}) }) as Ref<Partial<TFilters>>;

  const canNext = computed(() => meta.value.hasNext);
  const canPrev = computed(() => meta.value.hasPrev);

  let requestId = 0;
  let suppressQWatch = false;

  const buildQuery = (params?: Partial<TypeBaseQueryDto>): TCatalogQuery<TFilters> => {
    const nextQ = params?.q ?? q.value;

    return {
      page: params?.page ?? page.value,
      limit: params?.limit ?? limit.value,
      sortOrder: params?.sortOrder ?? sortOrder.value,
      ...(nextQ ? { q: nextQ } : {}),
      ...filters.value,
    } as TCatalogQuery<TFilters>;
  };

  const applyBaseParams = (params?: Partial<TypeBaseQueryDto>) => {
    if (!params) return;
    if (params.page !== undefined) page.value = params.page;
    if (params.limit !== undefined) limit.value = params.limit;
    if (params.sortOrder !== undefined) sortOrder.value = params.sortOrder;
    if (params.q !== undefined) q.value = params.q;
  };

  const getItems = async (params?: Partial<TypeBaseQueryDto>): Promise<TResWithMeta<TItem[]>> => {
    applyBaseParams(params);

    const currentId = ++requestId;
    loading.value = true;
    error.value = null;

    try {
      const result = await options.fetch(buildQuery());

      if (currentId !== requestId) {
        return result;
      }

      if (mode === 'append' && page.value > 1) {
        items.value = [...items.value, ...result.data];
      } else {
        items.value = result.data;
      }

      meta.value = { ...result.meta };
      page.value = result.meta.page;
      limit.value = result.meta.limit;

      return result;
    } catch (err) {
      if (currentId !== requestId) {
        throw err;
      }

      error.value = err;
      items.value = [];
      meta.value = createDefaultMeta();
      throw err;
    } finally {
      if (currentId === requestId) {
        loading.value = false;
      }
    }
  };

  const getNextPage = async (): Promise<TResWithMeta<TItem[]>> => {
    if (!meta.value.hasNext) {
      return { data: items.value, meta: meta.value };
    }
    return getItems({ page: page.value + 1 });
  };

  const getPrevPage = async (): Promise<TResWithMeta<TItem[]>> => {
    if (!meta.value.hasPrev) {
      return { data: items.value, meta: meta.value };
    }
    return getItems({ page: page.value - 1 });
  };

  const setFilters = async (next: Partial<TFilters>): Promise<TResWithMeta<TItem[]>> => {
    filters.value = { ...filters.value, ...next };
    page.value = 1;
    return getItems();
  };

  const applyQuery = async (next: TCatalogApplyQuery<TFilters>): Promise<TResWithMeta<TItem[]>> => {
    suppressQWatch = true;

    if (next.filters !== undefined) {
      filters.value = { ...next.filters };
    }
    if (next.q !== undefined) {
      q.value = next.q;
    }
    if (next.sortOrder !== undefined) {
      sortOrder.value = next.sortOrder;
    }
    page.value = next.page ?? 1;

    try {
      return await getItems();
    } finally {
      // Держим флаг дольше debounce, иначе watchDebounced всё равно вызовет второй fetch.
      setTimeout(() => {
        suppressQWatch = false;
      }, debounceMs + 50);
    }
  };

  const resetMeta = () => {
    meta.value = createDefaultMeta();
    page.value = 1;
  };

  const refresh = () => getItems();

  watchDebounced(
    q,
    () => {
      if (suppressQWatch) return;
      page.value = 1;
      void getItems();
    },
    { debounce: debounceMs }
  );

  return {
    items,
    meta,
    loading,
    error,
    q,
    page,
    limit,
    sortOrder,
    filters,
    canNext,
    canPrev,
    getItems,
    getNextPage,
    getPrevPage,
    setFilters,
    applyQuery,
    resetMeta,
    refresh,
  };
}
