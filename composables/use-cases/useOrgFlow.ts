import useOrgActions, {type TOrgIndexQuery, type TOrgIndexRes} from '@/composables/actions/useOrg';
import useCatalogItems, {type TCatalogFiltersOf} from '@/composables/useCatalogItems';
import {sanitizeNulls} from '~/utils/transformers/nullToUndefined';


type TOrgItem = TOrgIndexRes['data'][number];
type TOrgFilters = TCatalogFiltersOf<TOrgIndexQuery>;

export default function useOrgFlow() {
  const {getOrgsAction} = useOrgActions();

  const orgs = useCatalogItems<DeepNullToUndefined<TOrgItem>, TOrgFilters>({
    fetch: async (query) => {
      const data = await getOrgsAction(query);
      return sanitizeNulls(data);
    },
  });

  return {
    orgs
  };
}
