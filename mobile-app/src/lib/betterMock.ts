import {
  allHabitsT,
  allNotificationsT,
  allUsersInfoT,
  userWithIdT,
} from "./db_types";

export const mockUser: userWithIdT = {
  id: "d7w89ayd9",
  createdAt: new Date(),
  displayName: "John",
  username: "jdoe",
  picture: "2",
};

export const mockHabits: allHabitsT = {
  dwuaidnwuiad222: {
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
      d7w89ayd9: {
        displayName: "Alice",
        username: "alice",
        picture: "1",
        mostRecentCompletionDate: new Date(),
        isOwner: true,
      },
    },
  },
};

export const mockFriends: allUsersInfoT = {
  gg8g9g89g: {
    createdAt: new Date(),
    displayName: "Alice",
    username: "alice",
    picture: "1",
  },
};

export const mockNotifications: allNotificationsT = {
  q90q90q: {
    type: "friendRequest",
    senderId: "gg8g9g89g",
    receiverId: "d7w89ayd9",
    sentAt: new Date(),
  },
};
