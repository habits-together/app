import { z } from 'zod'
export const colorSchema = z.object({
  light: z.string(),
  base: z.string(),
  faded: z.string(),
  text: z.string(),
});

export const habitColorsSchema = z.object({
  stone: colorSchema,
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
});

export type HabitColorsT = z.infer<typeof habitColorsSchema>;
