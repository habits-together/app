import { z } from 'zod';

import { colorSchema } from '../colors-schemas';
import { UserIdSchema, type UserIdT } from '../users/types';

export type HabitIdT = string & { readonly __brand: unique symbol };

export const HabitIdSchema = z.coerce
  .string()
  .transform((val) => val as HabitIdT);

export const habitCompletionPeriodSchema = z.enum(['daily', 'weekly']);

export const habitSchema = z.object({
  color: colorSchema,
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
    }),
  ),
});

export const participantCompletionsSchema = z.object({
  completions: z.record(z.string(), z.number()), // { date: numberOfCompletions }
});

export const allCompletionsSchema = z.object({
  userId: z.record(UserIdSchema, participantCompletionsSchema), // { userId: participantCompletions }
});

export type HabitCompletionPeriodT = z.infer<
  typeof habitCompletionPeriodSchema
>;
export type HabitT = z.infer<typeof habitSchema> & { id: HabitIdT };
export type ParticipantCompletionsT = z.infer<
  typeof participantCompletionsSchema
>;
export type AllCompletionsT = Record<UserIdT, ParticipantCompletionsT>;
// when inferring the type it converts the userId to a string, so define manually
export type HabitWithCompletionsT = HabitT & {
  participantCompletions: AllCompletionsT;
};
