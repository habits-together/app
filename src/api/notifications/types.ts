import { z } from 'zod';

import { HabitIdSchema } from '../habits/types';
import { UserIdSchema } from '../users/types';

export type NotificationIdT = string & { readonly __brand: unique symbol };

export const NotificationIdSchema = z.coerce
  .string()
  .transform((val) => val as NotificationIdT);

export const habitNoticationTypeSchema = z.enum(['habitInvite', 'nudge']);
export type HabitNotificationTypeT = z.infer<typeof habitNoticationTypeSchema>;

export const friendNoticationTypeSchema = z.enum(['friendRequest']);
export type FriendNotificationTypeT = z.infer<
  typeof friendNoticationTypeSchema
>;

export const notificationTypeSchema = z.union([
  habitNoticationTypeSchema,
  friendNoticationTypeSchema,
]);
export type NotificationTypeT = z.infer<typeof notificationTypeSchema>;

export const friendNotificationSchema = z.object({
  type: friendNoticationTypeSchema,
  senderId: UserIdSchema,
  receiverId: UserIdSchema,
  sentAt: z.date(),
});

export const habitNotificationSchema = z.object({
  type: habitNoticationTypeSchema,
  habitId: HabitIdSchema,
  senderId: UserIdSchema,
  receiverId: UserIdSchema,
  sentAt: z.date(),
});

export const notificationSchema = z.union([
  friendNotificationSchema,
  habitNotificationSchema,
]);

export type FriendNotificationT = z.infer<typeof friendNotificationSchema>;
export type HabitNotificationT = z.infer<typeof habitNotificationSchema>;
export type NotificationT = z.infer<typeof notificationSchema>;
