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
  "1QsFUZQSFsV83tYNPnChFOwbhjK2": {
    createdAt: new Date(),
    displayName: "Alice",
    username: "alice3",
    picture: mockProfilePictures[3],
  },
  "8p0Jom3hTUTA3r1JpEWwsxHfYXK2": {
    createdAt: new Date(),
    displayName: "Dude",
    username: "dude5",
    picture: mockProfilePictures[5],
  },
  OqpamKgeRUPCR7X9GbkydZH3uqQ2: {
    createdAt: new Date(),
    displayName: "Guy",
    username: "guy4",
    picture: mockProfilePictures[4],
  },
  Xbc5C2wQfxc0rFFwFyXHsF6LtWp1: {
    createdAt: new Date(),
    displayName: "Bob",
    username: "bobby_boy",
    picture: mockProfilePictures[2],
  },
  ognaplankMQIgapbAOvv5npyTWR2: {
    createdAt: new Date(),
    displayName: "John",
    username: "jdoe",
    picture: mockProfilePictures[0],
  },
  qyPPiAHAYweKNxyWJmdCNXNbXSV2: {
    createdAt: new Date(),
    displayName: "Jane",
    username: "janejane",
    picture: mockProfilePictures[1],
  },
};

export const mockCurrentUser: userWithIdT = {
  id: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
  ...mockUsers["1QsFUZQSFsV83tYNPnChFOwbhjK2"],
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
      "1QsFUZQSFsV83tYNPnChFOwbhjK2": {
        mostRecentCompletionDate: new Date(),
        isOwner: true,
        ...mockUsers["1QsFUZQSFsV83tYNPnChFOwbhjK2"],
      },
      qyPPiAHAYweKNxyWJmdCNXNbXSV2: {
        mostRecentCompletionDate: new Date(),
        ...mockUsers["qyPPiAHAYweKNxyWJmdCNXNbXSV2"],
      },
      Xbc5C2wQfxc0rFFwFyXHsF6LtWp1: {
        mostRecentCompletionDate: new Date("2024-05-4T04:00:00"),
        ...mockUsers["Xbc5C2wQfxc0rFFwFyXHsF6LtWp1"],
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
      completionsPerPeriod: 2,
    },
    participants: {
      Xbc5C2wQfxc0rFFwFyXHsF6LtWp1: {
        mostRecentCompletionDate: new Date("2024-05-4T04:00:00"),
        ...mockUsers["Xbc5C2wQfxc0rFFwFyXHsF6LtWp1"],
      },
      ognaplankMQIgapbAOvv5npyTWR2: {
        mostRecentCompletionDate: new Date(),
        ...mockUsers["ognaplankMQIgapbAOvv5npyTWR2"],
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
      "8p0Jom3hTUTA3r1JpEWwsxHfYXK2": {
        mostRecentCompletionDate: new Date(),
        ...mockUsers["8p0Jom3hTUTA3r1JpEWwsxHfYXK2"],
      },
    },
  },
};

export const mockHabitCompletions: allParticipantCompletionsForAllHabitsT = {
  habit1: {
    "1QsFUZQSFsV83tYNPnChFOwbhjK2": {
      completions: {
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
    },
    qyPPiAHAYweKNxyWJmdCNXNbXSV2: {
      completions: {
        [formatDateString(new Date("2024-06-26T04:00:00"))]: 1,
        [formatDateString(new Date("2024-06-25T04:00:00"))]: 1,
      },
    },
    Xbc5C2wQfxc0rFFwFyXHsF6LtWp1: {
      completions: {
        [todayString()]: 1,
        [formatDateString(new Date("2024-06-26T04:00:00"))]: 1,
        [formatDateString(new Date("2024-06-23T04:00:00"))]: 1,
      },
    },
  },
  habit2_userNotPartOfToStart: {
    Xbc5C2wQfxc0rFFwFyXHsF6LtWp1: {
      completions: {
        [formatDateString(new Date("2024-05-4T04:00:00"))]: 1,
      },
    },
    friend3: {
      completions: {
        [formatDateString(new Date("2024-05-4T04:00:00"))]: 1,
      },
    },
  },
  habit3: {
    currentUserId123: {
      completions: {
        [todayString()]: 1,
      },
    },
    friend1: {
      completions: {
        [todayString()]: 1,
      },
    },
  },
};

export const mockNotifications: allNotificationsT = {
  noti1: {
    type: "friendRequest",
    senderId: "qyPPiAHAYweKNxyWJmdCNXNbXSV2",
    receiverId: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
    sentAt: new Date(),
  },
  noti2: {
    type: "habitInvite",
    habitId: "habit2_userNotPartOfToStart",
    senderId: "Xbc5C2wQfxc0rFFwFyXHsF6LtWp1",
    receiverId: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
    sentAt: new Date(),
  },
  noti3: {
    type: "nudge",
    habitId: "habit1",
    senderId: "ognaplankMQIgapbAOvv5npyTWR2",
    receiverId: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
    sentAt: new Date(),
  },
};

export const mockFriendships: allFriendshipsT = {
  friendship1: {
    user1Id: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
    user2Id: "qyPPiAHAYweKNxyWJmdCNXNbXSV2",
    friendsSince: new Date(),
  },
  friendship2: {
    user1Id: "Xbc5C2wQfxc0rFFwFyXHsF6LtWp1",
    user2Id: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
    friendsSince: new Date(),
  },
  friendship3: {
    user1Id: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
    user2Id: "ognaplankMQIgapbAOvv5npyTWR2",
    friendsSince: new Date(),
  },
  friendship4: {
    user1Id: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
    user2Id: "OqpamKgeRUPCR7X9GbkydZH3uqQ2",
    friendsSince: new Date(),
  },
  friendship5: {
    user1Id: "1QsFUZQSFsV83tYNPnChFOwbhjK2",
    user2Id: "8p0Jom3hTUTA3r1JpEWwsxHfYXK2",
    friendsSince: new Date(),
  },
  otherpplsfriendship: {
    user1Id: "Xbc5C2wQfxc0rFFwFyXHsF6LtWp1",
    user2Id: "ognaplankMQIgapbAOvv5npyTWR2",
    friendsSince: new Date(),
  },
  otherpplsfriendship2: {
    user1Id: "qyPPiAHAYweKNxyWJmdCNXNbXSV2",
    user2Id: "ognaplankMQIgapbAOvv5npyTWR2",
    friendsSince: new Date(),
  },
  otherpplsfriendship3: {
    user1Id: "ognaplankMQIgapbAOvv5npyTWR2",
    user2Id: "OqpamKgeRUPCR7X9GbkydZH3uqQ2",
    friendsSince: new Date(),
  },
  otherpplsfriendship4: {
    user1Id: "ognaplankMQIgapbAOvv5npyTWR2",
    user2Id: "8p0Jom3hTUTA3r1JpEWwsxHfYXK2",
    friendsSince: new Date(),
  },
};

export function generateMockId() {
  return Math.random().toString(36).substring(2, 15);
}
