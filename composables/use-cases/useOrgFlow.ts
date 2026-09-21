import useOrgActions, { type TOrgIndexQuery } from '@/composables/actions/useOrg';
import useCatalogItems, { type TCatalogFiltersOf, type TSortByField } from '@/composables/useCatalogItems';
import { mapOrgListItemToGmCard, type TOrgCard } from '@/components/features/Org/mappers';
import { sanitizeNulls } from '~/utils/transformers/nullToUndefined';
import type { TypeBaseQueryDto } from '#openApi';

type TOrgFilters = TCatalogFiltersOf<TOrgIndexQuery>;

type TLoadCatalogOptions = {
  initialQuery?: Partial<TypeBaseQueryDto & { sortBy: TSortByField }>;
  initialFilters?: Partial<TOrgFilters>;
};

export default function useOrgFlow() {
  const { getOrgsAction } = useOrgActions();

  const loadCatalog = (options?: TLoadCatalogOptions) =>
    useCatalogItems<TOrgCard, TOrgFilters>({
      key: 'org-catalog',
      initialQuery: options?.initialQuery,
      initialFilters: options?.initialFilters,
      fetch: async (query) => {
        const data = await getOrgsAction(query);
        const sanitized = sanitizeNulls(data);

        return {
          ...sanitized,
          data: sanitized.data.map(mapOrgListItemToGmCard),
        };
      },
    });

  return {
    loadCatalog,
  };
}
