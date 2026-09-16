<script setup lang="ts">
import { useUrlFilters } from '#imports';

defineOptions({
  name: 'Org',
});

type TFilters = {
  page: number;
  search: string;
  sortOrder: 'asc' | 'desc';
};

const filters = useUrlFilters<TFilters>({
  page: 1,
  search: '',
  sortOrder: 'desc',
});
</script>

<template>
  <section class="GmPage">
    {{ filters }}
  </section>
</template>

<!-- <style ></style> -->
