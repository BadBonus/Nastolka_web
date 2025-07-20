export enum ENotifyTypes {
  INVITATION = "invitation",
  INFO = "info",
  REMINDER = "reminder",
  ALERT = "alert",
}

export type TNotificationListNotificationInvite = {
  id: string;
  type: ENotifyTypes.INVITATION;
  title: string;
  date: string;
  host: {
    name: string;
    slug: string;
  };
  link: string;
};

export type TNotification = TNotificationListNotificationInvite;