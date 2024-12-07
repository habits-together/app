import { z } from 'zod';

export type UserIdT = string & { readonly __brand: unique symbol };
export type FriendshipIdT = string & { readonly __brand: unique symbol };

export const UserIdSchema = z.coerce
  .string()
  .transform((val) => val as UserIdT);
export const FriendshipIdSchema = z.coerce
  .string()
  .transform((val) => val as FriendshipIdT);

export const userSchema = z.object({
  createdAt: z.date(),
  displayName: z.string(),
  username: z.string(),
});

export const friendshipSchema = z.object({
  user1Id: UserIdSchema,
  user2Id: UserIdSchema,
  friendsSince: z.date(),
});

export type UserT = z.infer<typeof userSchema>;

export type FriendshipT = z.infer<typeof friendshipSchema>;

// TODO: figure out what to do about user types (then create zod schemas for them)
export type CompleteUserT = {
  id: UserIdT;
  picture: string;
} & UserT;
export type CompleteUserWithFriendStatusT = {
  id: UserIdT;
  picture: string;
  isFriend: boolean;
} & UserT;
