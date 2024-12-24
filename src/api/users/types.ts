import { z } from 'zod';

export type UserIdT = string & { readonly __brand: unique symbol };
export const UserIdSchema = z.coerce
  .string()
  .transform((val) => val as UserIdT);

export type FriendshipIdT = string & { readonly __brand: unique symbol };
export const FriendshipIdSchema = z.coerce
  .string()
  .transform((val) => val as FriendshipIdT);

export const dbUserSchema = z.object({
  createdAt: z.date(),
  displayName: z.string(),
  username: z.string(),
});
export type DbUserT = z.infer<typeof userSchema>;

export const userSchema = dbUserSchema.extend({
  id: UserIdSchema,
});
export type UserT = z.infer<typeof userSchema>;

export const dbRelationshipStatusSchema = z.enum([
  'pending',
  'friends',
  'blocked',
]);
export type dbRelationshipStatusT = z.infer<typeof dbRelationshipStatusSchema>;

export const relationshipStatusSchema = z.enum([
  ...dbRelationshipStatusSchema.options,
  'none',
]);
export type RelationshipStatusT = z.infer<typeof relationshipStatusSchema>;

export const relationshipSchema = z.union([
  z.object({
    status: dbRelationshipStatusSchema.extract(['friends']),
    friendsSince: z.date(),
  }),
  z.object({
    status: relationshipStatusSchema.exclude(['friends']),
    friendsSince: z.undefined(),
  }),
]);
export type RelationshipT = z.infer<typeof relationshipSchema>;

export const userWithRelationshipSchema = userSchema.extend({
  relationship: relationshipSchema,
});
export type UserWithRelationshipT = z.infer<typeof userWithRelationshipSchema>;
