import useOrgActions, {type TOrgIndexQuery} from '@/composables/actions/useOrg';
import useCatalogItems, {type TCatalogFiltersOf} from '@/composables/useCatalogItems';
import {mapOrgListItemToGmCard, type TOrgCard} from '@/components/features/Org/mappers';
import {sanitizeNulls} from '~/utils/transformers/nullToUndefined';
import type {TypeBaseQueryDto} from '#openApi';

type TOrgFilters = TCatalogFiltersOf<TOrgIndexQuery>;

type TOrgFlowOptions = {
  initialQuery?: Partial<TypeBaseQueryDto>;
  initialFilters?: Partial<TOrgFilters>;
};

export default async function useOrgFlow(options?: TOrgFlowOptions) {
  const {getOrgsAction} = useOrgActions();

  const orgs = await useCatalogItems<TOrgCard, TOrgFilters>({
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
    orgs,
  };
}
