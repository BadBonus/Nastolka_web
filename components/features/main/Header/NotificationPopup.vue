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
        only-icon
        icon="material-symbols-notifications"
        variant="ghost"
        color="neutral"
      />
    </UChip>

    <template #content>
      <notification-list
        class="mx-auto max-h-[300px] max-w-[300px] overflow-auto p-2.5"
      />
    </template>
  </UPopover>
</template>

<!--<style lang="scss"></style>-->
