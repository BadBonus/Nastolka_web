import useOrgActions, {type TOrgIndexQuery} from '@/composables/actions/useOrg';
import useCatalogItems, {type TCatalogFiltersOf} from '@/composables/useCatalogItems';
import {mapOrgListItemToGmCard, type TOrgCard} from '@/components/features/Org/mappers';
import {sanitizeNulls} from '~/utils/transformers/nullToUndefined';

type TOrgFilters = TCatalogFiltersOf<TOrgIndexQuery>;

export default function useOrgFlow() {
  const {getOrgsAction} = useOrgActions();

  const orgs = useCatalogItems<TOrgCard, TOrgFilters>({
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
