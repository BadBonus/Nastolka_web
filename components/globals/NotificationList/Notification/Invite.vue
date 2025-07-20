<script setup lang="ts">
import type { TNotificationListNotificationInvite } from "./notification.types";

defineOptions({
  name: "NotificationInvite",
});

const props = defineProps<TNotificationListNotificationInvite>();
const { time, date } = useFormattedDate(props.date);
</script>

<template>
  <div>
    <h1 class="my-0 text-base font-semibold">{{ title }}</h1>
    <p class="font-secondary text-sm">
      Вас пригласил <strong>{{ host.name }}</strong> на игру
      <strong>{{ date }}</strong> в
      <strong>{{ time }}</strong>
    </p>
    <p v-if="link" class="mt-1 text-sm font-bold">
      <NuxtLink class="underline" :to="link ?? '#'">ссылка на игру</NuxtLink>
    </p>
  </div>
</template>
