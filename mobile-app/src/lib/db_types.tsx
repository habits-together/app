type dbT = {
  users: Record<
    string, // userId
    {
      createdAt: Date;
      displayName: string;
      username: string;
      picture: string;
    }
  >;

  friendships: Record<
    string, // friendshipId
    {
      // user1Id is always less than user2Id (just use frontend functions)
      user1Id: string;
      user2Id: string;
      friendsSince: Date;
    }
  >;

  habits: Record<
    string, // habitId
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
        string, // participantId
        {
          displayName: string; // maintained by cloud function
          username: string; // maintained by cloud function
          picture: string; // maintained by cloud function
          mostRecentCompletionDate: Date; // maintained by cloud function
          isOwner?: true; // only owner has this field
        }
      >;
      // collection
      participantCompletions: Record<
        string, // participantId
        Record<string, number> // { date: numberOfCompletions }
      >;
    }
  >;

  notifications: Record<
    string, // inviteId
    habitNotificationT | friendNotificationT
  >;
};

export type friendNotificationT = {
  type: "friendRequest";
  senderId: string;
  receiverId: string;
  sentAt: Date;
};
export type habitNotificationT = {
  type: "habitInvite" | "nudge";
  habitId: string;
  senderId: string;
  receiverId: string;
  sentAt: Date;
};

export type allUsersInfoT = dbT["users"];
export type userT = allUsersInfoT[0];
export type userWithIdT = userT & { id: string };

export type allFriendshipsT = dbT["friendships"];
export type friendshipT = allFriendshipsT[0];

export type habitT = Omit<dbT["habits"][0], "participantCompletions">;
export type allHabitsT = Record<string, habitT>;
export type habitInfoT = Omit<habitT, "participants">;

export type habitParticipantsT = dbT["habits"][0]["participants"];
export type habitParticipantT = habitParticipantsT[0];

export type allParticipantCompletionsT =
  dbT["habits"][0]["participantCompletions"];
export type habitCompletionsT = allParticipantCompletionsT[0];
export type habitCompletionT = number;
export type habitCompletionWithDateInfoT = {
  date: string;
  numberOfCompletions: number;
  dayOfTheMonth: number;
  dayOfTheWeek: string;
};
export type allParticipantCompletionsForAllHabitsT = Record<
  string,
  allParticipantCompletionsT
>;

export type allNotificationsT = dbT["notifications"];
export type notificationT = allNotificationsT[0];

// more types
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
