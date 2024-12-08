import { z } from 'zod';

import { HabitIdSchema } from '../habits/types';
import { UserIdSchema } from '../users/types';

export type NotificationIdT = string & { readonly __brand: unique symbol };

export const NotificationIdSchema = z.coerce
  .string()
  .transform((val) => val as NotificationIdT);

export const noticationTypeSchema = z.enum([
  'habitInvite',
  'nudge',
  'friendRequest',
]);

export const friendNotificationSchema = z.object({
  type: noticationTypeSchema,
  senderId: UserIdSchema,
  receiverId: UserIdSchema,
  sentAt: z.date(),
});

export const habitNotificationSchema = z.object({
  type: noticationTypeSchema,
  habitId: HabitIdSchema,
  senderId: UserIdSchema,
  receiverId: UserIdSchema,
  sentAt: z.date(),
});

export const notificationSchema = z.union([
  friendNotificationSchema,
  habitNotificationSchema,
]);

export type NotificationTypeT = z.infer<typeof noticationTypeSchema>;

export type FriendNotificationT = z.infer<typeof friendNotificationSchema>;
export type HabitNotificationT = z.infer<typeof habitNotificationSchema>;
export type NotificationT = z.infer<typeof notificationSchema>;
