import { z } from "zod";

import { habitColorsSchema } from "./colors-schemas";

// Branded types for ids
export type UserIDT = string & { readonly __brand: unique symbol };
export type FriendshipIDT = string & { readonly __brand: unique symbol };
export type HabitIDT = string & { readonly __brand: unique symbol };
export type NotificationIDT = string & { readonly __brand: unique symbol };

export const UserIDSchema = z.coerce.string().transform((val) => val as UserIDT);
export const FriendshipIDSchema = z.coerce.string().transform((val) => val as FriendshipIDT);
export const HabitIDSchema = z.coerce.string().transform((val) => val as HabitIDT);
export const NotificationIDSchema = z.coerce.string().transform((val) => val as NotificationIDT);

// Enums
export const habitCompletionPeriodSchema = z.enum(["daily", "weekly"]);

// Schemas
export const userSchema = z.object({
  createdAt: z.date(),
  displayName: z.string(),
  username: z.string(),
});

export const friendshipSchema = z.object({
  user1Id: UserIDSchema,
  user2Id: UserIDSchema,
  friendsSince: z.date(),
});


export const habitSchema = z.object({
  color: habitColorsSchema,
  createdAt: z.date(),
  description: z.string(),
  title: z.string(),
  goal: z.object({
    period: habitCompletionPeriodSchema,
    completionsPerPeriod: z.number(),
  }),
  icon: z.string(),
  participants: z.record(
    z.string(),
    z.object({
      displayName: z.string(),
      username: z.string(),
      mostRecentCompletionDate: z.date(),
      isOwner: z.boolean().optional(),
    })
  ),
  participantCompletions: z.record(
    z.string(),
    z.object({
      completions: z.record(z.string(), z.number()),
    })
  ),
});

export const friendNotificationSchema = z.object({
  type: z.literal("friendRequest"),
  senderId: UserIDSchema,
  receiverId: UserIDSchema,
  sentAt: z.date(),
});

export const habitNotificationSchema = z.object({
  type: z.union([z.literal("habitInvite"), z.literal("nudge")]),
  habitId: HabitIDSchema,
  senderId: UserIDSchema,
  receiverId: UserIDSchema,
  sentAt: z.date(),
});

export const notificationSchema = z.union([friendNotificationSchema, habitNotificationSchema]);

export type UserT = z.infer<typeof userSchema>;
export type FriendshipT = z.infer<typeof friendshipSchema>;
export type HabitCompletionPeriodT = z.infer<typeof habitCompletionPeriodSchema>;
export type HabitT = z.infer<typeof habitSchema>;
export type FriendNotificationT = z.infer<typeof friendNotificationSchema>;
export type HabitNotificationT = z.infer<typeof habitNotificationSchema>;
export type NotificationT = z.infer<typeof notificationSchema>;
