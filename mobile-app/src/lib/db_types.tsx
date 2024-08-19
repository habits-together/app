export type UserIdT = string & { readonly __brand: unique symbol };
export type FriendshipIdT = string & { readonly __brand: unique symbol };
export type HabitIdT = string & { readonly __brand: unique symbol };
export type NotificationIdT = string & { readonly __brand: unique symbol };

type dbT = {
  users: Record<
    UserIdT,
    {
      createdAt: Date;
      displayName: string;
      username: string;
      picture: string;
    }
  >;

  friendships: Record<
    FriendshipIdT,
    {
      // user1Id is always less than user2Id (just use frontend functions)
      user1Id: UserIdT;
      user2Id: UserIdT;
      friendsSince: Date;
    }
  >;

  habits: Record<
    HabitIdT,
    {
      color: string;
      createdAt: Date;
      description: string;
      title: string;
      goal: {
        period: string;
        completionsPerPeriod: number;
      };
      icon: string;
      participants: Record<
        UserIdT,
        {
          displayName: string; // maintained by cloud function
          username: string; // maintained by cloud function
          picture: string; // maintained by cloud function
          mostRecentCompletionDate: Date; // maintained by cloud function
          isOwner?: true; // only owner has this field
        }
      >;
      participantCompletions: Record<
        UserIdT,
        {
          completions: Record<string, number>; // { date: numberOfCompletions }
        }
      >;
    }
  >;

  notifications: Record<
    NotificationIdT,
    habitNotificationT | friendNotificationT
  >;
};

export type friendNotificationT = {
  type: "friendRequest";
  senderId: UserIdT;
  receiverId: UserIdT;
  sentAt: Date;
};

export type habitNotificationT = {
  type: "habitInvite" | "nudge";
  habitId: HabitIdT;
  senderId: UserIdT;
  receiverId: UserIdT;
  sentAt: Date;
};

export type allUsersInfoT = dbT["users"];
export type userT = allUsersInfoT[UserIdT];
export type userWithIdT = userT & { id: UserIdT };
export type userWithIdEmailT = userWithIdT & {
  email?: string;
};

export type allFriendshipsT = dbT["friendships"];
export type friendshipT = allFriendshipsT[FriendshipIdT];

export type habitT = Omit<dbT["habits"][HabitIdT], "participantCompletions">;
export type allHabitsT = Record<HabitIdT, habitT>;
export type habitInfoT = Omit<habitT, "participants">;

export type habitParticipantsT = dbT["habits"][HabitIdT]["participants"];
export type habitParticipantT = habitParticipantsT[UserIdT];

export type allParticipantCompletionsT =
  dbT["habits"][HabitIdT]["participantCompletions"];
export type habitCompletionsT = allParticipantCompletionsT[UserIdT];
export type habitCompletionT = number;
export type habitCompletionWithDateInfoT = {
  date: string;
  numberOfCompletions: number;
  dayOfTheMonth: number;
  dayOfTheWeek: string;
};
export type allParticipantCompletionsForAllHabitsT = Record<
  HabitIdT,
  allParticipantCompletionsT
>;

export type allNotificationsT = dbT["notifications"];
export type notificationT = allNotificationsT[NotificationIdT];

export type friendCardDataT = {
  friendInfo: userT;
  commonHabits: commonHabitT[];
};

export type commonHabitT = {
  color: string;
  icon: string;
  title: string;
};

export type HabitDisplayType = "weekly-view" | "monthly-view";
