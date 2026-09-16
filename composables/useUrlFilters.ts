import {ref, watch} from 'vue'
import {useRoute, useRouter} from '#app'

type FilterPrimitive = string | number | boolean | string[] | number[]
export type FilterSchema = Record<string, FilterPrimitive>

export function useUrlFilters<T extends FilterSchema>(defaultFilters: T) {
  const route = useRoute()
  const router = useRouter()

  const filters = ref<T>({...defaultFilters})

  const parseFromQuery = () => {
    const query = route.query
    const result = {...defaultFilters}

    for (const key in defaultFilters) {
      const raw = query[key]
      const def = defaultFilters[key]

      if (raw === undefined || raw === null) continue

      if (typeof def === 'number') {
        result[key] = (Number(raw) || def) as T[Extract<keyof T, string>]
      } else if (typeof def === 'boolean') {
        result[key] = (raw === 'true') as T[Extract<keyof T, string>]
      } else {
        result[key] = String(raw) as T[Extract<keyof T, string>]
      }
    }

    filters.value = result
  }

  parseFromQuery()

  watch(
    filters,
    (newVal) => {
      const query = {...route.query}

      for (const key in newVal) {
        const current = newVal[key]
        const def = defaultFilters[key]

        if (current === def || current === '' || current === undefined) {
          delete query[key]
        } else {
          query[key] = String(current)
        }
      }

      router.push({query})
    },
    {deep: true}
  )

  return filters
}