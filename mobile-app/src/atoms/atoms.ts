import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as AsyncStorageType } from "jotai/vanilla/utils/atomWithStorage";
import colors from "../constants/colors";
import {
  acceptFriendRequestInDb,
  acceptHabitInviteInDb,
  createNewHabitInDb,
  deleteNotificationInDb,
  editHabitInDb,
  fetchAllMyHabitsInfo,
  fetchCommonHabitIds,
  fetchFriendData,
  fetchHabitCompletionsForAllParticipants,
  fetchHabitCompletionsForParticipant,
  fetchHabitInfo,
  fetchMutualFriends,
  fetchNotifications,
  fetchOutboundNotifications,
  fetchUserInfo,
  searchFriendsInDb,
  sendNotificationInDb,
  subscribeToFriendList,
  updatetHabitCompletionsInDb,
} from "../firebase/api";
import {
  HabitDisplayType,
  allHabitsT,
  allNotificationsT,
  allParticipantCompletionsT,
  allUsersInfoT,
  friendNotificationT,
  habitCompletionsT,
  habitInfoT,
  habitNotificationT,
  habitParticipantT,
  notificationT,
} from "../lib/db_types";
import { todayString } from "../lib/formatDateString";
import { getNumberOfDaysInLastWeek } from "../lib/getNumberOfDaysInLastWeek";
import { generateMockId } from "../lib/mockData";
import { structureCompletionData } from "../lib/structureCompletionData";
import { currentUserAtom, currentUserIdAtom } from "./currentUserAtom";

// using Jotai atoms: https://jotai.org/docs/introduction
// we especially use the atomFamily atom: https://jotai.org/docs/utilities/family

const localStore = createJSONStorage(() => AsyncStorage);

currentUserAtom.onMount = (set) => {
  fetchUserInfo({ userId: "1QsFUZQSFsV83tYNPnChFOwbhjK2" }).then(set);
  // curently settign the default user to Alice, if will change when auth state changes
  // TODO: stop doing this at some point
  // change the defalut value to empty user and get this from auth
};

const allHabitsAtom = atom<allHabitsT>({});
allHabitsAtom.onMount = (set) => {
  fetchAllMyHabitsInfo().then(set);
};
export const habitIdsAtom = atom((get) => Object.keys(get(allHabitsAtom)));
export const habitInfoAtom = atomFamily((habitId: string) =>
  atom((get) => {
    const { participants, ...habitInfo } = get(allHabitsAtom)[habitId];
    return habitInfo;
  }),
);
export const habitParticipantIdsAtom = atomFamily((habitId: string) =>
  atom((get) => Object.keys(get(habitParticipantsAtom(habitId)))),
);
export const habitParticipantsAtom = atomFamily((habitId: string) =>
  atom((get) => {
    return get(allHabitsAtom)[habitId].participants;
  }),
);
export const habitParticipantPfpsListAtom = atomFamily((habitId: string) =>
  atom((get) => {
    const habitParticipants = get(habitParticipantsAtom(habitId));
    return Object.values(habitParticipants).map(
      (participant) => participant.picture,
    );
  }),
);

export const habitColorAtom = atomFamily((habitId: string) =>
  atom(
    (get) =>
      get(habitInfoAtom(habitId)).color as keyof typeof colors.habitColors,
  ),
);
export const habitDescriptionAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).description),
);
export const habitTitleAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).title),
);
export const habitGoalAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).goal),
);
export const habitIconAtom = atomFamily((habitId: string) =>
  atom((get) => get(habitInfoAtom(habitId)).icon),
);

export const targetNumberOfCompletionsPerDayAtom = atomFamily(
  (habitId: string) =>
    atom((get) => {
      const habitGoal = get(habitInfoAtom(habitId)).goal;
      return habitGoal.period === "daily" ? habitGoal.completionsPerPeriod : 1;
    }),
);
export const targetNumberOfCompletionsPerWeekAtom = atomFamily(
  (habitId: string) =>
    atom((get) => {
      const habitGoal = get(habitInfoAtom(habitId)).goal;
      return habitGoal.period === "weekly"
        ? habitGoal.completionsPerPeriod
        : habitGoal.completionsPerPeriod * 7;
    }),
);

export const editHabitAtom = atomFamily((habitId: string) =>
  atom(null, async (get, set, newHabitInfo: habitInfoT) => {
    await editHabitInDb({ habitId, habitInfo: newHabitInfo });
    const habitParticipantInfo = get(habitParticipantsAtom(habitId));
    set(allHabitsAtom, (prev) => {
      return {
        ...prev,
        [habitId]: {
          ...newHabitInfo,
          participants: habitParticipantInfo,
        },
      };
    });
  }),
);
export const createNewHabitAtom = atom(
  null,
  async (get, set, newHabitInfo: habitInfoT) => {
    const newId = await createNewHabitInDb({ habitInfo: newHabitInfo });
    const currentUserInfo = get(currentUserAtom);
    set(allHabitsAtom, (prev) => {
      return {
        ...prev,
        [newId]: {
          ...newHabitInfo,
          participants: {
            [currentUserInfo.id]: {
              displayName: currentUserInfo.displayName,
              username: currentUserInfo.username,
              picture: currentUserInfo.picture,
              mostRecentCompletionDate: new Date(),
              isOwner: true,
            },
          },
        },
      };
    });
  },
);

export const habitCompletionsForAllParticipantsAtom = atomFamily(
  (habitId: string) => {
    const completionsAtom = atom<allParticipantCompletionsT>({});
    completionsAtom.onMount = (set) => {
      fetchHabitCompletionsForAllParticipants({ habitId }).then(set);
    };
    return completionsAtom;
  },
);
export const habitCompletionsForParticipantAtom = atomFamily(
  ({ habitId, participantId }: { habitId: string; participantId: string }) => {
    const baseAtom = atom({ completions: {} });

    const completionsAtom = atom<
      habitCompletionsT, // getter type
      [habitCompletionsT], // arguments passed to the set function as an array
      Promise<void> // return type of the set function
    >(
      (get) => {
        return get(baseAtom);
      },
      async (get, set, newCompletions) => {
        set(baseAtom, newCompletions);
        await updatetHabitCompletionsInDb({ habitId, participantId });
      },
    );
    completionsAtom.onMount = (set) => {
      fetchHabitCompletionsForParticipant({ habitId, participantId }).then(set);
    };
    return completionsAtom;
  },
  (a, b) => a.habitId === b.habitId && a.participantId === b.participantId,
);

const myHabitCompletionsAtom = atomFamily((habitId: string) =>
  atom((get) => {
    const userId = get(currentUserIdAtom);
    return get(
      habitCompletionsForParticipantAtom({ habitId, participantId: userId }),
    );
  }),
);
export const structuredHabitCompletionsAtom = atomFamily(
  ({ habitId, participantId }: { habitId: string; participantId: string }) => {
    return atom((get) => {
      const habitCompletions = get(
        habitCompletionsForParticipantAtom({ habitId, participantId }),
      );
      return structureCompletionData({
        completionData: habitCompletions,
        numDays: 12 * 7 + getNumberOfDaysInLastWeek(),
      });
    });
  },
  (a, b) => a.habitId === b.habitId && a.participantId === b.participantId,
);
export const myStructuredHabitCompletionsAtom = atomFamily((habitId: string) =>
  atom((get) => {
    const userId = get(currentUserIdAtom);
    return get(
      structuredHabitCompletionsAtom({ habitId, participantId: userId }),
    );
  }),
);

export const numberOfCompletionsTodayAtom = atomFamily((habitId: string) =>
  atom(
    (get) => {
      const userId = get(currentUserIdAtom);
      const habitCompletions = get(
        habitCompletionsForParticipantAtom({
          habitId,
          participantId: userId,
        }),
      );
      const completionsToday = habitCompletions.completions[todayString()] as
        | number
        | undefined;
      return completionsToday ?? 0;
    },
    (get, set, newValue: number) => {
      const userId = get(currentUserIdAtom);
      const habitCompletions = get(
        habitCompletionsForParticipantAtom({
          habitId,
          participantId: userId,
        }),
      );
      set(
        habitCompletionsForParticipantAtom({
          habitId,
          participantId: userId,
        }),
        {
          completions: {
            ...habitCompletions.completions,
            [todayString()]: newValue,
          },
        },
      );
    },
  ),
);

export const incrementNumberOfCompletionsTodayAtom = atomFamily(
  (habitId: string) =>
    atom(null, (get, set) => {
      const currentNumberOfCompletions = get(
        numberOfCompletionsTodayAtom(habitId),
      );
      const targetNumberOfCompletionsPerDay = get(
        targetNumberOfCompletionsPerDayAtom(habitId),
      );
      const newNumberOfCompletions =
        currentNumberOfCompletions === targetNumberOfCompletionsPerDay
          ? 0
          : currentNumberOfCompletions + 1;
      set(numberOfCompletionsTodayAtom(habitId), newNumberOfCompletions);
    }),
);

export const participantAtom = atomFamily(
  ({ habitId, participantId }: { habitId: string; participantId: string }) =>
    atom<habitParticipantT>(
      (get) => get(habitParticipantsAtom(habitId))[participantId],
    ),
  (a, b) => a.participantId === b.participantId,
);
export const participantDisplayNameAtom = atomFamily(
  ({ habitId, participantId }: { habitId: string; participantId: string }) =>
    atom((get) => get(participantAtom({ habitId, participantId })).displayName),
  (a, b) => a.participantId === b.participantId,
);
export const participantUsernameAtom = atomFamily(
  ({ habitId, participantId }: { habitId: string; participantId: string }) =>
    atom((get) => get(participantAtom({ habitId, participantId })).username),
  (a, b) => a.participantId === b.participantId,
);
export const participantPictureAtom = atomFamily(
  ({ habitId, participantId }: { habitId: string; participantId: string }) =>
    atom((get) => get(participantAtom({ habitId, participantId })).picture),
  (a, b) => a.participantId === b.participantId,
);

// Friends
export const allFriendsDataAtom = atom<allUsersInfoT>({});
allFriendsDataAtom.onMount = (set) => {
  // refetch everytime users friends change
  const unsubscribeFriendlist = subscribeToFriendList(set);
  return () => {
    // close the socket when allFriendsDataAtom is unmount
    unsubscribeFriendlist();
  };
};

export const friendIdsAtom = atom((get) =>
  Object.keys(get(allFriendsDataAtom)),
);
export const friendAtom = atomFamily((friendId: string) =>
  atom((get) => get(allFriendsDataAtom)[friendId]),
);
export const friendDisplayNameAtom = atomFamily((friendId: string) =>
  atom((get) => get(friendAtom(friendId)).displayName),
);
export const friendUsernameAtom = atomFamily((friendId: string) =>
  atom((get) => get(friendAtom(friendId)).username),
);
export const friendPictureAtom = atomFamily((friendId: string) =>
  atom((get) => get(friendAtom(friendId)).picture),
);

export const commonHabitIdsAtom = atomFamily((friendId: string) =>
  atom(async () => {
    return await fetchCommonHabitIds({ participantId: friendId });
  }),
);

export const mutualFriendsAtom = atomFamily((friendId: string) =>
  atom(async (get) => {
    const myFriendIds = get(friendIdsAtom);
    const mutualFriends = await fetchMutualFriends({ friendId, myFriendIds });
    return mutualFriends;
  }),
);

export const mutualFriendsPfpsListAtom = atomFamily((friendId: string) =>
  atom(async (get) => {
    const mutualFriends = await get(mutualFriendsAtom(friendId));
    return Object.values(mutualFriends).map((friend) => friend.picture);
  }),
);

export const numberOfMutualFriendsAtom = atomFamily((friendId: string) =>
  atom(async (get) => {
    const mutualFriends = await get(mutualFriendsAtom(friendId));
    return Object.keys(mutualFriends).length;
  }),
);

// NOTIFICATIONS
const notificationsAtom = atom<allNotificationsT>({});
notificationsAtom.onMount = (set) => {
  fetchNotifications().then(set);
};
export const notificationIdsAtom = atom((get) =>
  Object.keys(get(notificationsAtom)),
);
export const notificationAtom = atomFamily((notificationId: string) =>
  atom((get) => get(notificationsAtom)[notificationId]),
);
export const notificationTypeAtom = atomFamily((notificationId: string) =>
  atom((get) => get(notificationAtom(notificationId)).type),
);
export const friendNotificationAtom = atomFamily((notificationId: string) =>
  atom<friendNotificationT>((get) => {
    const notiAtom = get(notificationAtom(notificationId));
    if ("habitId" in notiAtom) throw new Error("Not a friend notification");
    return notiAtom as friendNotificationT;
  }),
);
export const habitNotificationAtom = atomFamily((notificationId: string) =>
  atom(async (get) => {
    const notificationInfo = get(notificationAtom(notificationId));
    if (!("habitId" in notificationInfo))
      throw new Error("Not a habit notification");

    const {
      title: habitTitle,
      icon: habitIcon,
      color: habitColor,
      participants: habitParticipants,
    } = await fetchHabitInfo({
      habitId: notificationInfo.habitId,
    });
    return {
      habitTitle,
      habitIcon,
      habitColor: habitColor as keyof typeof colors.habitColors,
      numberOfParticipants: Object.keys(habitParticipants).length,
      ...(notificationInfo as habitNotificationT),
    };
  }),
);

export const getUserInfoAtom = atomFamily((userId: string) =>
  atom(async (get) => fetchUserInfo({ userId })),
);

/**
 * Does not remove in Db !
 */
const removeLocalCopyOfNotification = atomFamily((notificationId: string) =>
  atom(null, (get, set) => {
    set(notificationsAtom, (prev) => {
      const { [notificationId]: _, ...remaining } = prev;
      return remaining;
    });
  }),
);

export const deleteNotificationAtom = atomFamily((notificationId: string) =>
  atom(null, async (get, set) => {
    deleteNotificationInDb({ notifId: notificationId });
    set(removeLocalCopyOfNotification(notificationId));
  }),
);

export const acceptFriendRequestAtom = atomFamily((notificationId: string) =>
  atom(null, async (get, set) => {
    set(removeLocalCopyOfNotification(notificationId));
    acceptFriendRequestInDb({ notifId: notificationId }).then(() =>
      fetchFriendData({ userId: get(currentUserIdAtom) }).then((friends) =>
        set(allFriendsDataAtom, friends),
      ),
    );
  }),
);

export const acceptHabitInviteAtom = atomFamily((notificationId: string) =>
  atom(null, async (get, set) => {
    set(removeLocalCopyOfNotification(notificationId));
    acceptHabitInviteInDb({ notifId: notificationId }).then(() =>
      fetchAllMyHabitsInfo().then((allHabitsInfo) =>
        set(allHabitsAtom, allHabitsInfo),
      ),
    );
  }),
);

// friend search
export const searchQueryAtom = atom("");

export const searchResultUsersAtom = atom(async (get) => {
  return await searchFriendsInDb({ searchText: get(searchQueryAtom) });
});
export const searchResultUserIdsAtom = atom((get) =>
  Object.keys(get(searchResultUsersAtom)),
);

export const outboundNotificationsAtom = atom<allNotificationsT>({});
outboundNotificationsAtom.onMount = (set) => {
  fetchOutboundNotifications().then(set);
};

export const inviteUserToHabitAtom = atomFamily(
  ({ habitId, theirUserId }: { habitId: string; theirUserId: string }) =>
    atom(
      async (get) => {
        const outboundNotifications = get(outboundNotificationsAtom);
        const inviteExists = Object.values(outboundNotifications).some(
          (notif) =>
            notif.type === "habitInvite" &&
            notif.habitId === habitId &&
            notif.receiverId === theirUserId,
        );
        return inviteExists;
      },
      async (get, set) => {
        const currentUserId = get(currentUserIdAtom);
        const notificationInfo: notificationT = {
          type: "habitInvite",
          habitId,
          senderId: currentUserId,
          receiverId: theirUserId,
          sentAt: new Date(),
        };
        sendNotificationInDb({ info: notificationInfo });
        set(outboundNotificationsAtom, (prev) => ({
          ...prev,
          [generateMockId()]: notificationInfo,
        }));
      },
    ),
  (a, b) => a.theirUserId === b.theirUserId && a.habitId === b.habitId,
);

export const sendFriendRequestAtom = atomFamily((theirUserId: string) =>
  atom(
    async (get) => {
      const outboundNotifications = get(outboundNotificationsAtom);
      const inviteExists = Object.values(outboundNotifications).some(
        (notif) =>
          notif.type === "friendRequest" && notif.receiverId === theirUserId,
      );
      return inviteExists;
    },

    async (get, set) => {
      const currentUserId = get(currentUserIdAtom);
      const notificationInfo: notificationT = {
        type: "friendRequest",
        senderId: currentUserId,
        receiverId: theirUserId,
        sentAt: new Date(),
      };
      sendNotificationInDb({ info: notificationInfo });
      set(outboundNotificationsAtom, (prev) => ({
        ...prev,
        [generateMockId()]: notificationInfo,
      }));
    },
  ),
);

// whether we should display the habit in weekly or monthly view
export const habitDisplayTypeAtom = atomFamily((id: string) =>
  atomWithStorage<HabitDisplayType>(
    `habitDisplayType-${id}`,
    "weekly-view",
    localStore as AsyncStorageType<HabitDisplayType>,
    { getOnInit: true },
  ),
);
