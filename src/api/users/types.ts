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

export const friendStatusSchema = z.object({
  isFriend: z.boolean(),
});
export type FriendStatusT = z.infer<typeof friendStatusSchema>;

export const userWithFriendStatusSchema = userSchema.extend({
  ...friendStatusSchema.shape,
});
export type UserWithFriendStatusT = z.infer<typeof userWithFriendStatusSchema>;

export const friendshipSchema = z.object({
  user1Id: UserIdSchema,
  user2Id: UserIdSchema,
  friendsSince: z.date(),
});
export type FriendshipT = z.infer<typeof friendshipSchema>;
