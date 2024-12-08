import { z } from 'zod';

import { colorSchema } from '../colors-schemas';
import { UserIdSchema, type UserIdT, userPictureSchema } from '../users/types';

export type HabitIdT = string & { readonly __brand: unique symbol };
export const HabitIdSchema = z.coerce
  .string()
  .transform((val) => val as HabitIdT);

export const habitCompletionPeriodSchema = z.enum(['daily', 'weekly']);
export type HabitCompletionPeriodT = z.infer<
  typeof habitCompletionPeriodSchema
>;

export const participantSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  mostRecentCompletionDate: z.date(),
  isOwner: z.boolean().optional(),
});
export type ParticipantT = z.infer<typeof participantSchema>;

export const participantsSchema = z.record(
  UserIdSchema,
  z.object({
    displayName: z.string(),
    username: z.string(),
    mostRecentCompletionDate: z.date(),
    isOwner: z.boolean().optional(),
  }),
);
export type ParticipantsT = Record<UserIdT, ParticipantT>;

export const participantsWithPictureSchema = z.record(
  UserIdSchema,
  participantSchema.extend({
    picture: userPictureSchema,
  }),
);
export type ParticipantsWithPictureT = Record<
  UserIdT,
  ParticipantT & { picture: string }
>;

export const habitInfoSchema = z.object({
  color: colorSchema,
  createdAt: z.date(),
  description: z.string(),
  title: z.string(),
  goal: z.object({
    period: habitCompletionPeriodSchema,
    completionsPerPeriod: z.number(),
  }),
  icon: z.string(),
});
export type HabitInfoT = z.infer<typeof habitInfoSchema>;

export const habitInfoWithIdSchema = habitInfoSchema.extend({
  id: HabitIdSchema,
});
export type HabitInfoWithIdT = z.infer<typeof habitInfoWithIdSchema>;

export const habitSchema = habitInfoWithIdSchema.extend({
  participants: participantsWithPictureSchema,
});
export type HabitT = z.infer<typeof habitSchema>;

export const habitWithParticipantsSchema = habitInfoWithIdSchema.extend({
  participants: participantsSchema,
});
export type HabitWithParticipantsT = z.infer<
  typeof habitWithParticipantsSchema
>;

export const habitWithParticipantPicturesSchema = habitInfoWithIdSchema.extend({
  participants: participantsWithPictureSchema,
});
export type HabitWithParticipantPicturesT = z.infer<
  typeof habitWithParticipantPicturesSchema
>;

export const participantCompletionsSchema = z.object({
  completions: z.record(z.string(), z.number()), // { date: numberOfCompletions }
});
export type ParticipantCompletionsT = z.infer<
  typeof participantCompletionsSchema
>;

export const allCompletionsSchema = z.record(
  UserIdSchema,
  participantCompletionsSchema,
);
export type AllCompletionsT = z.infer<typeof allCompletionsSchema>;

export const completeHabit = habitWithParticipantPicturesSchema.extend({
  ...participantCompletionsSchema.shape,
});
export type HabitWithCompletionsT = z.infer<typeof completeHabit>;

export const habitCompletionWithDateInfoSchema = z.object({
  date: z.string(),
  numberOfCompletions: z.number(),
  dayOfTheMonth: z.number(),
  dayOfTheWeek: z.string(),
});
export type HabitCompletionWithDateInfoT = z.infer<
  typeof habitCompletionWithDateInfoSchema
>;
