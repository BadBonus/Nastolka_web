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
    <div class="flex items-center justify-between mb-2">
      <UBadge class="text-inverted bg-inverted font-bold">{{
        notificationComponents[props.type].message
      }}</UBadge>
      <Button
        only-icon
        rounded
        variant="ghost"
        icon="i-lucide-x"
        size="sm"
        @click="deleteNotify"
      />
    </div>
    <component
      :is="notificationComponents[props.type].component"
      v-bind="props"
    />
  </div>
</template>
