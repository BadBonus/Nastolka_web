<script setup lang="ts">
// 	 type THeaderFilterRow = {

// 	}

defineOptions({
  name: "HeaderFilterRow",
});

const sortFromTopTobottom = ref<boolean>(true);
</script>
<template>
  <div class="HeaderFilterRow flex justify-between">
    <UButton
      class="px-3"
      size="xl"
      variant="outline"
      color="primary"
      :icon="`lucide:arrow-${sortFromTopTobottom ? 'down' : 'up'}-narrow-wide`"
    />

    <UButton
      size="xl"
      variant="outline"
      color="primary"
      icon="lucide:settings-2"
    >
      13
    </UButton>
  </div>
</template>
