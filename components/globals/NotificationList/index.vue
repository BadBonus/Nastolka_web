<script setup lang="ts">
import type { TNotification } from "./Notification/notification.types";
import Notification from "./Notification/index.vue";
// 	 type TNotificationListIndex = {

// 	}

const demoNotify = [
  {
    id: "1",
    type: "invitation",
    title: "Приглашение в команду 'Frontend Masters'",
    date: "2025-07-21T14:30:00Z",
    host: {
      name: "Алексей Смирнов",
      slug: "alexey-smirnov",
    },
    link: "/teams/frontend-masters/join",
  },
  {
    id: "2",
    type: "invitation",
    title: "Вас пригласили на закрытый воркшоп по Vue 3",
    date: "2025-08-05T09:00:00Z",
    host: {
      name: "Елена Попова",
      slug: "elena-popova",
    },
    link: "/workshops/vue-3-advanced/accept",
  },
  {
    id: "3",
    type: "invitation",
    title: "Приглашение для участия в проекте 'Orion'",
    date: "2025-07-28T18:00:00Z",
    host: {
      name: "Иван Кузнецов",
      slug: "ivan-kuznetsov",
    },
    link: "/projects/orion/invite",
  },
] as TNotification[];

defineOptions({
  name: "NotificationListIndex",
});
</script>
<template>
  <ul class="NotificationListIndex">
    <!-- FIXME: потом добавить подключение извне -->
    <li class="mt-2" v-for="note in demoNotify" :key="note.id">
      <Notification v-bind="note" />
    </li>
  </ul>
</template>

<!--<style lang="scss"></style>-->
