import { z } from 'zod';
export const colorSchema = z.object({
  light: z.string(),
  base: z.string(),
  faded: z.string(),
  text: z.string(),
});
export type HabitColorT = z.infer<typeof colorSchema>;

export const habitColorsSchema = z.object({
  red: colorSchema,
  orange: colorSchema,
  amber: colorSchema,
  yellow: colorSchema,
  lime: colorSchema,
  green: colorSchema,
  emerald: colorSchema,
  teal: colorSchema,
  cyan: colorSchema,
  sky: colorSchema,
  blue: colorSchema,
  indigo: colorSchema,
  violet: colorSchema,
  purple: colorSchema,
  fuchsia: colorSchema,
  pink: colorSchema,
  rose: colorSchema,
  stone: colorSchema,
});
export type HabitColorsT = z.infer<typeof habitColorsSchema>;

export const habitColorNames = Object.keys(
  habitColorsSchema.shape,
) as (keyof typeof habitColorsSchema.shape)[];
export type HabitColorNameT = (typeof habitColorNames)[number];
