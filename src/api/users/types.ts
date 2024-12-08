import { z } from 'zod';

export type UserIdT = string & { readonly __brand: unique symbol };
export const UserIdSchema = z.coerce
  .string()
  .transform((val) => val as UserIdT);

export type FriendshipIdT = string & { readonly __brand: unique symbol };
export const FriendshipIdSchema = z.coerce
  .string()
  .transform((val) => val as FriendshipIdT);

export const userSchema = z.object({
  createdAt: z.date(),
  displayName: z.string(),
  username: z.string(),
});
export type UserT = z.infer<typeof userSchema>;

export const userWithIdSchema = userSchema.extend({
  id: UserIdSchema,
});
export type UserWithIdT = z.infer<typeof userWithIdSchema>;

export const friendStatusSchema = z.object({
  isFriend: z.boolean(),
});
export type FriendStatusT = z.infer<typeof friendStatusSchema>;

export const userWithFriendStatusSchema = userWithIdSchema.extend({
  ...friendStatusSchema.shape,
});
export type UserWithFriendStatusT = z.infer<typeof userWithFriendStatusSchema>;

export const userPictureSchema = z.union([
  // fetched valid image
  z.object({
    url: z.string(),
    isPending: z.literal(false),
    isError: z.literal(false),
    error: z.literal(null),
  }),
  // we are fetching the image still
  z.object({
    url: z.literal(null),
    isPending: z.literal(true),
    isError: z.literal(false),
    error: z.literal(null),
  }),
  // we got a response but it was an error
  z.object({
    url: z.literal(null),
    isPending: z.literal(false),
    isError: z.literal(true),
    error: z.string(),
  }),
]);
export type UserPictureT = z.infer<typeof userPictureSchema>;
export const loadingPicture: UserPictureT = {
  url: null,
  isPending: true,
  isError: false,
  error: null,
};

export const completeUserSchema = userWithFriendStatusSchema.extend({
  picture: userPictureSchema,
});
export type CompleteUserT = z.infer<typeof completeUserSchema>;

export const friendshipSchema = z.object({
  user1Id: UserIdSchema,
  user2Id: UserIdSchema,
  friendsSince: z.date(),
});
export type FriendshipT = z.infer<typeof friendshipSchema>;
