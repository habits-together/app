import { z } from 'zod';

import { colorSchema, habitColorsSchema } from '../colors-schemas';
import { UserIdSchema, type UserIdT } from '../users/types';

export type HabitIdT = string & { readonly __brand: unique symbol };
export const HabitIdSchema = z.coerce
  .string()
  .transform((val) => val as HabitIdT);

// ----------------------------------------
// everything exactly how it's represented in firebase
// ----------------------------------------

// PARTICIPANTS
export const dbParticipantSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  mostRecentCompletionDate: z.date(),
  isOwner: z.boolean().optional(),
});
export type DbParticipantT = z.infer<typeof dbParticipantSchema>;

export const dbParticipantsSchema = z.record(UserIdSchema, dbParticipantSchema);
export type DbParticipantsT = Record<UserIdT, DbParticipantT>;

// COMPLETIONS
export const participantCompletionsSchema = z.object({
  // { date: numberOfCompletions }; ex. { '2021-01-01': 3 }
  completions: z.record(z.string(), z.number()),
});
export type ParticipantCompletionsT = z.infer<
  typeof participantCompletionsSchema
>;

export const allCompletionsSchema = z.record(
  UserIdSchema,
  participantCompletionsSchema,
);
export type AllCompletionsT = z.infer<typeof allCompletionsSchema>;

export const habitCompletionPeriodSchema = z.enum(['daily', 'weekly']);
export type HabitCompletionPeriodT = z.infer<
  typeof habitCompletionPeriodSchema
>;

export const habitCompletionWithDateInfoSchema = z.object({
  date: z.string(),
  numberOfCompletions: z.number(),
  dayOfTheMonth: z.number(),
  dayOfTheWeek: z.string(),
});
export type HabitCompletionWithDateInfoT = z.infer<
  typeof habitCompletionWithDateInfoSchema
>;

// HABITS
export const dbHabitInfoSchema = z.object({
  createdAt: z.date(),
  description: z.string(),
  title: z.string(),
  goal: z.object({
    period: habitCompletionPeriodSchema,
    completionsPerPeriod: z.number(),
  }),
  icon: z.string(),
  colorName: z.enum(habitColorsSchema.keyof().options),
});
export type DbHabitInfoT = z.infer<typeof dbHabitInfoSchema>;

export const dbHabitSchema = dbHabitInfoSchema.extend({
  participants: dbParticipantsSchema,
});
export type DbHabitT = z.infer<typeof dbHabitSchema>;

// ----------------------------------------
// extended/improved types for the frontend
// ----------------------------------------

// PARTICIPANTS
const participantSchema = dbParticipantSchema
  // indicator of whether the user has activity today instead of the most recent completion date
  .omit({ mostRecentCompletionDate: true })
  .extend({
    hasActivityToday: z.boolean(),
  });

export const participantWithIdSchema = participantSchema.extend({
  id: UserIdSchema,
});
export type ParticipantWithIdT = z.infer<typeof participantWithIdSchema>;

// define participant without id to make it clear which one is being used
export const participantWithoutIdSchema = participantSchema;
export type ParticipantWithoutIdT = z.infer<typeof participantWithoutIdSchema>;

export const participantsSchema = z.record(
  UserIdSchema,
  participantWithoutIdSchema,
);
export type ParticipantsT = z.infer<typeof participantsSchema>;

// HABITS
export const habitInfoSchema = dbHabitInfoSchema.extend({
  // include color object with light, base, faded, and text colors
  color: colorSchema,
  // include the habit's id
  id: HabitIdSchema,
});
export type HabitInfoT = z.infer<typeof habitInfoSchema>;

export const habitSchema = habitInfoSchema.extend({
  participants: participantsSchema,
});
export type HabitT = z.infer<typeof habitSchema>;

export const HabitWithCompletions = habitSchema.extend({
  ...participantCompletionsSchema.shape,
});
export type HabitWithCompletionsT = z.infer<typeof HabitWithCompletions>;
