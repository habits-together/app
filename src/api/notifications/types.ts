import { type FieldValue, type Timestamp } from 'firebase/firestore';
import { z } from 'zod';

import { HabitIdSchema } from '../habits/types';
import { UserIdSchema } from '../users/types';

export type NotificationIdT = string & { readonly __brand: unique symbol };

export const NotificationIdSchema = z.coerce
  .string()
  .transform((val) => val as NotificationIdT);

// Base types for notifications as stored in Firebase
type BaseDbNotificationT = {
  senderId: string;
  receiverId: string;
  sentAt: Timestamp | FieldValue;
};

export type DbFriendNotificationT = BaseDbNotificationT & {
  type: 'friendRequest';
};

export type DbHabitNotificationT = BaseDbNotificationT & {
  type: 'habitInvite' | 'nudge';
  habitId: string;
};

// Frontend types with processed dates and proper IDs
type BaseNotificationT = {
  id: string;
  senderId: string;
  receiverId: string;
  sentAt: Date;
};

export type FriendNotificationT = BaseNotificationT & {
  type: 'friendRequest';
};

export type HabitNotificationT = BaseNotificationT & {
  type: 'habitInvite' | 'nudge';
  habitId: string;
};

// Zod schemas for validation
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

export const dbNotificationSchema = z.union([
  z.object({
    type: friendNoticationTypeSchema,
    senderId: UserIdSchema,
    receiverId: UserIdSchema,
    sentAt: z.custom<Timestamp | FieldValue>(),
  }),
  z.object({
    type: habitNoticationTypeSchema,
    habitId: HabitIdSchema,
    senderId: UserIdSchema,
    receiverId: UserIdSchema,
    sentAt: z.custom<Timestamp | FieldValue>(),
  }),
]);

export type NotificationT = z.infer<typeof dbNotificationSchema>;
