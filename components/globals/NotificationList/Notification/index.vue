<script setup lang="ts">
import type { TNotification } from "./notification.types";
import { notificationComponents } from "./utils";

defineOptions({
  name: "NotificationListNotification",
});
const props = defineProps<TNotification>();
const emit = defineEmits<{
  (e: "close", id: string): void;
}>();

const deleteNotify = () => {
  emit("close", props.id);
};
</script>
<template>
  <div class="NotificationListNotification font-main">
    <div class="flex items-center justify-between">
      <UBadge color="info">{{
        notificationComponents[props.type].message
      }}</UBadge>
      <Button
        only-icon
        rounded
        variant="ghost"
        color="secondary"
        icon="i-lucide-x"
        size="sm"
        @click="deleteNotify"
      />
    </div>
    <component
      :is="notificationComponents[props.type].component"
      v-bind="props"
    />
    <USeparator class="mt-2" color="secondary" />
  </div>
</template>
