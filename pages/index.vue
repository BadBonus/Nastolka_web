<script setup lang="ts">
import { UInput } from "#components";

defineOptions({
  name: "PagesIndex",
});
</script>

<template>
  <div class="flex gap-1.5">
    <!-- <auth-form />
    <u-button variant="link">link</u-button> -->
    <Button icon="material-symbols:attach-money" icon-pos="left"> test</Button>
    <Button icon="material-symbols:money" icon-pos="right" variant="secondary">
      test</Button
    >
    <Button variant="outline"> test</Button>
    <Button variant="ghost"> test</Button>
    <Button variant="link"> test</Button>
    <Button variant="info"> test</Button>
    <Button variant="danger"> test</Button>
    <Button variant="warning"> test</Button>
  </div>
</template>
