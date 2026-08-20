<script setup lang="ts">
defineOptions({
  name: 'PagesIndex',
});
</script>

<template>
  <div class="flex gap-1">
    <UButton>Test</UButton>
    <UButton color="primary">primary</UButton>
    <UButton color="warning">warning</UButton>
    <UButton color="error">error</UButton>
    <UButton color="info">info</UButton>
    <UButton color="neutral">neutral</UButton>
    <UButton color="secondary">secondary</UButton>
    <UButton color="success">success</UButton>
  </div>
</template>
