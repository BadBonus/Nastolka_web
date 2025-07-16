<script setup lang="ts">
import { UInput } from "#components";

defineOptions({
  name: "PagesIndex",
});
</script>

<template>
  <div class="flex gap-1.5">
    <Button variant="filled">Test</Button>
    <Button variant="filled" color="danger">Test</Button>
    <Button variant="filled" color="info">Test</Button>
    <Button variant="filled" color="secondary">Test</Button>
    <Button variant="filled" color="warning">Test</Button>
  </div>
  <div class="flex gap-1.5">
    <Button class="variant" color="ghost">Test</Button>
    <Button variant="ghost" color="danger">Test</Button>
    <Button variant="ghost" color="info">Test</Button>
    <Button variant="ghost" color="secondary">Test</Button>
    <Button variant="ghost" color="warning">Test</Button>
  </div>

  <div class="flex gap-1.5">
    <Button variant="outline">Test</Button>
    <Button variant="outline" color="danger">Test</Button>
    <Button variant="outline" color="info">Test</Button>
    <Button variant="outline" color="secondary">Test</Button>
    <Button variant="outline" color="warning">Test</Button>
  </div>

  <div class="flex gap-1.5">
    <Button variant="link">Test</Button>
    <Button variant="link" color="danger">Test</Button>
    <Button variant="link" color="info">Test</Button>
    <Button variant="link" color="secondary">Test</Button>
    <Button variant="link" color="warning">Test</Button>
  </div>
</template>
