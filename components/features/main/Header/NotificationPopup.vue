<script setup lang="ts">
// 	 type THeaderNotificationPopup = {

// 	}

defineOptions({
  name: "HeaderNotificationPopup",
});
</script>
<template>
  <UPopover mode="click" :open-delay="500" :close-delay="300">
    <UChip color="warning" inset>
      <Button
        color="secondary"
        only-icon
        icon="material-symbols-notifications"
        variant="ghost"
      />
    </UChip>

    <template #content>
      <notification-list
        class="mx-auto max-h-75 max-w-75 overflow-auto p-2.5"
      />
    </template>
  </UPopover>
</template>

<!--<style lang="scss"></style>-->
