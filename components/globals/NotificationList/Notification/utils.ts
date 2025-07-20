import {ENotifyTypes} from "./notification.types";
import Invite from "./Invite.vue";
import type {Component} from "vue";

export const messages = {
  [ENotifyTypes.INVITATION]: "Приглашение",
  [ENotifyTypes.INFO]: "У вас новое уведомление",
  [ENotifyTypes.REMINDER]: "Не забудьте о встрече",
  [ENotifyTypes.ALERT]: "Внимание! Проверьте свои уведомления",
};

// FIXME: потом добавить другие типы уведомлений

export const notificationComponents: {
  [key in ENotifyTypes]: {
    component: Component;
    message: typeof messages[key];
  };
} = {
  [ENotifyTypes.INVITATION]: {
    component: Invite,
    message: messages[ENotifyTypes.INVITATION],
  },
  [ENotifyTypes.INFO]: {
    component: Invite,
    message: messages[ENotifyTypes.INFO],
  },
  [ENotifyTypes.REMINDER]: {
    component: Invite,
    message: messages[ENotifyTypes.REMINDER],
  },
  [ENotifyTypes.ALERT]: {
    component: Invite,
    message: messages[ENotifyTypes.REMINDER],
  }
}  
