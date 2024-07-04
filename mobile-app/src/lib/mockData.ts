import {
  allFriendshipsT,
  allHabitsT,
  allNotificationsT,
  allParticipantCompletionsForAllHabitsT,
  userT,
  userWithIdT,
} from "./db_types";
import { formatDateString, todayString } from "./formatDateString";
import { mockProfilePictures } from "./mockBase64Images";

export const mockUsers: Record<string, userT> = {
  currentUserId123: {
    createdAt: new Date(),
    displayName: "John",
    username: "jdoe",
    picture: mockProfilePictures[0],
  },
  friend1: {
    createdAt: new Date(),
    displayName: "Jane",
    username: "janejane",
    picture: mockProfilePictures[1],
  },
  friend2: {
    createdAt: new Date(),
    displayName: "Bob",
    username: "bobby_boy",
    picture: mockProfilePictures[2],
  },
  friend3: {
    createdAt: new Date(),
    displayName: "Alice",
    username: "alice3",
    picture: mockProfilePictures[3],
  },
  friend4: {
    createdAt: new Date(),
    displayName: "Guy",
    username: "guy4",
    picture: mockProfilePictures[4],
  },
  friend5: {
    createdAt: new Date(),
    displayName: "Dude",
    username: "dude5",
    picture: mockProfilePictures[5],
  },
};

export const mockCurrentUser: userWithIdT = {
  id: "currentUserId123",
  ...mockUsers["currentUserId123"],
};

export const mockHabits: allHabitsT = {
  habit1: {
    createdAt: new Date(),
    title: "Read for 15 minutes",
    icon: "book",
    color: "orange",
    description: "Let's expand our mind capacity",
    goal: {
      period: "daily",
      completionsPerPeriod: 1,
    },
    participants: {
      currentUserId123: {
        mostRecentCompletionDate: new Date(),
        isOwner: true,
        ...mockUsers["currentUserId123"],
      },
      friend1: {
        mostRecentCompletionDate: new Date(),
        ...mockUsers["friend1"],
      },
      friend2: {
        mostRecentCompletionDate: new Date("2024-05-4T04:00:00"),
        ...mockUsers["friend2"],
      },
    },
  },
  habit2_userNotPartOfToStart: {
    createdAt: new Date(),
    title: "Work out",
    icon: "barbell",
    color: "green",
    description: "Working out is better together",
    goal: {
      period: "weekly",
      completionsPerPeriod: 4,
    },
    participants: {
      friend2: {
        mostRecentCompletionDate: new Date("2024-05-4T04:00:00"),
        ...mockUsers["friend2"],
      },
      friend3: {
        mostRecentCompletionDate: new Date(),
        ...mockUsers["friend3"],
      },
    },
  },
  habit3: {
    createdAt: new Date(),
    title: "Drink water",
    icon: "bottle",
    color: "purple",
    description: "",
    goal: {
      period: "daily",
      completionsPerPeriod: 5,
    },
    participants: {
      currentUserId123: {
        mostRecentCompletionDate: new Date(),
        isOwner: true,
        ...mockUsers["currentUserId123"],
      },
      friend1: {
        mostRecentCompletionDate: new Date(),
        ...mockUsers["friend1"],
      },
    },
  },
};

export const mockHabitCompletions: allParticipantCompletionsForAllHabitsT = {
  habit1: {
    currentUserId123: {
      [todayString()]: 1,
      [formatDateString(new Date("2024-06-14T04:00:00"))]: 1,
      [formatDateString(new Date("2024-06-14T04:00:00"))]: 1,
      [formatDateString(new Date("2024-06-8T04:00:00"))]: 1,
      [formatDateString(new Date("2024-06-2T04:00:00"))]: 1,
      [formatDateString(new Date("2024-04-15T04:00:00"))]: 1,
      [formatDateString(new Date("2024-04-2T04:00:00"))]: 1,
      [formatDateString(new Date("2024-04-14T04:00:00"))]: 1,
      [formatDateString(new Date("2024-04-22T04:00:00"))]: 1,
      [formatDateString(new Date("2024-05-30T04:00:00"))]: 1,
      [formatDateString(new Date("2024-05-23T04:00:00"))]: 1,
      [formatDateString(new Date("2024-05-20T04:00:00"))]: 1,
      [formatDateString(new Date("2024-05-10T04:00:00"))]: 1,
      [formatDateString(new Date("2024-05-4T04:00:00"))]: 1,
      [formatDateString(new Date("2024-05-3T04:00:00"))]: 1,
      [formatDateString(new Date("2024-05-2T04:00:00"))]: 1,
    },
    friend1: {
      [formatDateString(new Date("2024-06-26T04:00:00"))]: 1,
      [formatDateString(new Date("2024-06-25T04:00:00"))]: 1,
    },
    friend2: {
      [todayString()]: 1,
      [formatDateString(new Date("2024-06-26T04:00:00"))]: 1,
      [formatDateString(new Date("2024-06-23T04:00:00"))]: 1,
    },
  },
  habit2_userNotPartOfToStart: {
    friend2: {
      [formatDateString(new Date("2024-05-4T04:00:00"))]: 1,
    },
  },
  habit3: {
    currentUserId123: {
      [todayString()]: 1,
    },
    friend1: {
      [todayString()]: 1,
    },
  }
};

export const mockNotifications: allNotificationsT = {
  noti1: {
    type: "friendRequest",
    senderId: "friend1",
    receiverId: "currentUserId123",
    sentAt: new Date(),
  },
  noti2: {
    type: "habitInvite",
    habitId: "habit2_userNotPartOfToStart",
    senderId: "friend2",
    receiverId: "currentUserId123",
    sentAt: new Date(),
  },
  noti3: {
    type: "nudge",
    habitId: "habit1",
    senderId: "friend3",
    receiverId: "currentUserId123",
    sentAt: new Date(),
  },
};

// export const mockFriends: allUsersInfoT = {
//   friend2: mockUsers['friend2'],
//   friend3: mockUsers['friend3'],
// };
export const mockFriendships: allFriendshipsT = {
  friendship1: {
    user1Id: "currentUserId123",
    user2Id: "friend1",
    friendsSince: new Date(),
  },
  friendship2: {
    user1Id: "friend2",
    user2Id: "currentUserId123",
    friendsSince: new Date(),
  },
  friendship3: {
    user1Id: "currentUserId123",
    user2Id: "friend3",
    friendsSince: new Date(),
  },
  otherpplsfriendship: {
    user1Id: "friend2",
    user2Id: "friend3",
    friendsSince: new Date(),
  },
  otherpplsfriendship2: {
    user1Id: "friend1",
    user2Id: "friend3",
    friendsSince: new Date(),
  },
  friendship4: {
    user1Id: "currentUserId123",
    user2Id: "friend4",
    friendsSince: new Date(),
  },
  otherpplsfriendship3: {
    user1Id: "friend3",
    user2Id: "friend4",
    friendsSince: new Date(),
  },
  friendship5: {
    user1Id: "currentUserId123",
    user2Id: "friend5",
    friendsSince: new Date(),
  },
  otherpplsfriendship4: {
    user1Id: "friend3",
    user2Id: "friend5",
    friendsSince: new Date(),
  },
};

export function generateMockId() {
  return Math.random().toString(36).substring(2, 15);
}
