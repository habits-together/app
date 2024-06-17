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
        { date: number } // i.e. { date: numberOfCompletions }
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

export type allFriendshipsT = dbT["friendships"];
export type friendshipT = allFriendshipsT[0];

export type habitT = Omit<dbT["habits"][0], "participantCompletions">;
export type allHabitsT = Record<string, habitT>;
export type habitInfoT = Omit<habitT, "participants">;

export type habitParticipantsT = dbT["habits"][0]["participants"];
export type habitParticipantT = habitParticipantsT[0];

export type habitCompletionsT = dbT["habits"][0]["participantCompletions"];
export type habitCompletionT = habitCompletionsT[0];

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
