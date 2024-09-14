import deepEquals from "fast-deep-equal";
import { atom } from "jotai";
import { atomFamily, selectAtom, splitAtom } from "jotai/utils";
import { ColorSchemeName } from "nativewind/dist/style-sheet/color-scheme";
import colors from "../constants/colors";
import { maxNumWeeksToDisplay } from "../constants/constants";
import {
  acceptFriendRequestInDb,
  acceptHabitInviteInDb,
  createNewHabitInDb,
  deleteAllNotificationsOfHabitInDb,
  deleteHabitInDb,
  deleteNotificationInDb,
  editHabitInfoInDb,
  editHabitParticipantInfoInDb,
  fetchAllMyHabitsInfo,
  fetchCommonHabitIds,
  fetchFriendData,
  fetchHabitCompletionsForAllParticipants,
  fetchHabitCompletionsForParticipant,
  fetchHabitInfo,
  fetchMultipleHabitsInfo,
  fetchMutualFriends,
  fetchOtherHabitIds,
  fetchOutboundNotifications,
  fetchUserInfo,
  getUserProfilePicUrl,
  removeFriendInDb,
  searchFriendsInDb,
  sendNotificationInDb,
  subscribeToFriendList,
  subscribeToNotifications,
  updatetHabitCompletionsInDb,
} from "../firebase/api";
import { betterAtomWithStorage } from "../lib/betterAtomWithStorage";
import {
  HabitDisplayType,
  HabitIdT,
  HabitVisibilityType,
  NotificationIdT,
  UserIdT,
  allHabitsT,
  allNotificationsT,
  allParticipantCompletionsT,
  allUsersInfoT,
  friendNotificationT,
  habitCompletionWithDateInfoT,
  habitCompletionsT,
  habitInfoT,
  habitNotificationT,
  habitParticipantT,
  habitParticipantsT,
  notificationT,
} from "../lib/db_types";
import { todayString } from "../lib/formatDateString";
import { getNumberOfDaysInLastWeek } from "../lib/getNumberOfDaysInLastWeek";
import { structureCompletionData } from "../lib/structureCompletionData";
import { currentUserAtom, currentUserIdAtom } from "./currentUserAtom";
// using Jotai atoms: https://jotai.org/docs/introduction
// we especially use the atomFamily atom: https://jotai.org/docs/utilities`/family

const allHabitsAtom = atom<allHabitsT>({});
allHabitsAtom.onMount = (set) => {
  fetchAllMyHabitsInfo().then(set);
};
export const habitIdsAtom = atom(
  (get) => Object.keys(get(allHabitsAtom)) as HabitIdT[],
);
export const habitInfoAtom = atomFamily((habitId: HabitIdT) =>
  atom((get) => {
    const { participants, ...habitInfo } = get(allHabitsAtom)[habitId];
    return habitInfo;
  }),
);
export const habitParticipantIdsAtom = atomFamily((habitId: HabitIdT) =>
  atom(
    (get) => Object.keys(get(habitParticipantsInfoAtom(habitId))) as UserIdT[],
  ),
);
export const habitParticipantsInfoAtom = atomFamily((habitId: HabitIdT) =>
  atom((get) => {
    return get(allHabitsAtom)[habitId].participants;
  }),
);

export const habitColorAtom = atomFamily((habitId: HabitIdT) =>
  atom(
    (get) =>
      get(habitInfoAtom(habitId)).color as keyof typeof colors.habitColors,
  ),
);
export const habitDescriptionAtom = atomFamily((habitId: HabitIdT) =>
  atom((get) => get(habitInfoAtom(habitId)).description),
);
export const habitTitleAtom = atomFamily((habitId: HabitIdT) =>
  atom((get) => get(habitInfoAtom(habitId)).title),
);
export const habitGoalAtom = atomFamily((habitId: HabitIdT) =>
  atom((get) => get(habitInfoAtom(habitId)).goal),
);
export const habitIconAtom = atomFamily((habitId: HabitIdT) =>
  atom((get) => get(habitInfoAtom(habitId)).icon),
);

export const targetNumberOfCompletionsPerDayAtom = atomFamily(
  (habitId: HabitIdT) =>
    atom((get) => {
      const habitGoal = get(habitInfoAtom(habitId)).goal;
      return habitGoal.period === "daily" ? habitGoal.completionsPerPeriod : 1;
    }),
);
export const targetNumberOfCompletionsPerWeekAtom = atomFamily(
  (habitId: HabitIdT) =>
    atom((get) => {
      const habitGoal = get(habitInfoAtom(habitId)).goal;
      return habitGoal.period === "weekly"
        ? habitGoal.completionsPerPeriod
        : habitGoal.completionsPerPeriod * 7;
    }),
);

export const editHabitInfoAtom = atomFamily((habitId: HabitIdT) =>
  atom(null, async (get, set, newHabitInfo: habitInfoT) => {
    await editHabitInfoInDb({ habitId, habitInfo: newHabitInfo });
    const habitParticipantInfo = get(habitParticipantsInfoAtom(habitId));
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

export const editHabitParticipantInfoAtom = atomFamily((habitId: HabitIdT) =>
  atom(null, async (get, set, newHabitParticipantsInfo: habitParticipantsT) => {
    const habitInfo = get(habitInfoAtom(habitId));
    const currentUserId = get(currentUserIdAtom);

    await editHabitParticipantInfoInDb({
      habitId,
      habitParticipantsInfo: newHabitParticipantsInfo,
    });

    set(allHabitsAtom, (prev) => {
      return {
        ...prev,
        [habitId]: {
          ...habitInfo,
          participants: {
            [currentUserId]: { ...newHabitParticipantsInfo[currentUserId] },
          },
        },
      };
    });
  }),
);

export const editHabitVisibilityAtom = atomFamily((habitId: HabitIdT) =>
  atom(null, async (get, set, newVisibility: HabitVisibilityType) => {
    const currentHabitParticipantsInfo = get(
      habitParticipantsInfoAtom(habitId),
    );
    const currentUserId = get(currentUserIdAtom);

    const updatedParticipantInfo = {
      ...currentHabitParticipantsInfo[currentUserId],
      visibility: newVisibility,
    };

    set(editHabitParticipantInfoAtom(habitId), {
      ...currentHabitParticipantsInfo,
      [currentUserId]: updatedParticipantInfo,
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
              mostRecentCompletionDate: new Date(),
              isOwner: true,
            },
          },
        },
      };
    });
  },
);

export const createOrEditHabitFormAtom = atom({
  createdAt: new Date(),
  title: "",
  description: "",
  color: "red",
  icon: "default",
  goal: {
    period: "daily",
    completionsPerPeriod: 1,
  },
});

export const deleteHabitAtom = atomFamily((habitId: HabitIdT) =>
  atom(null, async (_get, set) => {
    set(allHabitsAtom, (prev) => {
      const { [habitId]: _, ...remaining } = prev;
      return remaining;
    });
    await deleteHabitInDb({ habitId: habitId });
    await deleteAllNotificationsOfHabitInDb({ habitId });
  }),
);

export const habitCompletionsForAllParticipantsAtom = atomFamily(
  (habitId: HabitIdT) => {
    const completionsAtom = atom<allParticipantCompletionsT>({});
    completionsAtom.onMount = (set) => {
      fetchHabitCompletionsForAllParticipants({ habitId }).then(set);
    };
    return completionsAtom;
  },
);
export const habitCompletionsForParticipantAtom = atomFamily(
  ({
    habitId,
    participantId,
  }: {
    habitId: HabitIdT;
    participantId: UserIdT;
  }) => {
    const completionsBaseAtom = atom<habitCompletionsT>({ completions: {} });

    const completionsAtom = atom<
      habitCompletionsT, // getter type
      [habitCompletionsT], // arguments passed to the set function as an array
      Promise<void> // return type of the set function
    >(
      (get) => get(completionsBaseAtom),
      async (_get, set, newCompletions) => {
        set(completionsBaseAtom, JSON.parse(JSON.stringify(newCompletions)));
        await updatetHabitCompletionsInDb({
          habitId,
          participantId,
          completionData: newCompletions,
        });
      },
    );
    completionsAtom.onMount = (set) => {
      fetchHabitCompletionsForParticipant({ habitId, participantId }).then(set);
    };
    return completionsAtom;
  },
  deepEquals,
);

/**
 * Get habit completions for a participant, excluding today.
 * For performance reasons so that not everything has to rerender
 * when marking today as complete
 */
const selectedHabitCompletionsAtom = atomFamily(
  ({
    habitId,
    participantId,
  }: {
    habitId: HabitIdT;
    participantId: UserIdT;
  }) => {
    const completionsAtom = selectAtom(
      habitCompletionsForParticipantAtom({ habitId, participantId }),
      (completions: habitCompletionsT) => {
        const result: habitCompletionsT = { ...completions };
        delete result.completions[todayString()];
        return result;
      },
      deepEquals,
    );
    return completionsAtom;
  },
  deepEquals,
);
/**
 * Convert record of habit completions to list
 * Does not include today
 */
export const structuredHabitCompletionsAtom = atomFamily(
  ({
    habitId,
    participantId,
  }: {
    habitId: HabitIdT;
    participantId: UserIdT;
  }) => {
    return atom((get) => {
      const habitCompletions = get(
        selectedHabitCompletionsAtom({ habitId, participantId }),
      );
      return structureCompletionData({
        completionData: habitCompletions,
        numDays: maxNumWeeksToDisplay * 7 + getNumberOfDaysInLastWeek(),
      });
    });
  },
  deepEquals,
);
/**
 * So that the whole habit display doesn't have to rerender when anything changes
 */
export const habitCompletionAtomsAtom = atomFamily(
  ({
    habitId,
    participantId,
  }: {
    habitId: HabitIdT;
    participantId: UserIdT;
  }) => {
    return splitAtom(
      structuredHabitCompletionsAtom({ habitId, participantId }),
    );
  },
);

export const myStructuredHabitCompletionsAtom = atomFamily(
  (habitId: HabitIdT) =>
    atom((get) => {
      const userId = get(currentUserIdAtom);
      return get(
        structuredHabitCompletionsAtom({ habitId, participantId: userId }),
      );
    }),
);

export const numberOfCompletionsTodayAtom = atomFamily(
  ({ habitId, participantId }: { habitId: HabitIdT; participantId: UserIdT }) =>
    atom(
      (get) => {
        const habitCompletions = get(
          habitCompletionsForParticipantAtom({
            habitId,
            participantId,
          }),
        );
        const completionsToday = habitCompletions.completions[todayString()] as
          | number
          | undefined;
        const completion: habitCompletionWithDateInfoT = {
          date: todayString(),
          numberOfCompletions: completionsToday ?? 0,
          dayOfTheMonth: new Date().getDate(),
          dayOfTheWeek: new Date().toLocaleString("en-US", {
            weekday: "short",
          }),
        };
        return completion;
      },
      (get, set, newValue: number) => {
        const userId = get(currentUserIdAtom);
        const habitCompletions = get(
          habitCompletionsForParticipantAtom({
            habitId,
            participantId: userId,
          }),
        );
        const newCompletions = {
          completions: {
            ...habitCompletions.completions,
            [todayString()]: newValue,
          },
        };
        set(
          habitCompletionsForParticipantAtom({
            habitId,
            participantId: userId,
          }),
          newCompletions,
        );
      },
    ),
  deepEquals,
);

export const incrementNumberOfCompletionsTodayAtom = atomFamily(
  (habitId: HabitIdT) =>
    atom(null, (get, set) => {
      const userId = get(currentUserIdAtom);
      const currentNumberOfCompletions = get(
        numberOfCompletionsTodayAtom({ habitId, participantId: userId }),
      ).numberOfCompletions;
      const targetNumberOfCompletionsPerDay = get(
        targetNumberOfCompletionsPerDayAtom(habitId),
      );
      const newNumberOfCompletions =
        currentNumberOfCompletions === targetNumberOfCompletionsPerDay
          ? 0
          : currentNumberOfCompletions + 1;
      set(
        numberOfCompletionsTodayAtom({ habitId, participantId: userId }),
        newNumberOfCompletions,
      );
    }),
);

export const participantAtom = atomFamily(
  ({ habitId, participantId }: { habitId: HabitIdT; participantId: UserIdT }) =>
    atom<habitParticipantT>(
      (get) => get(habitParticipantsInfoAtom(habitId))[participantId],
    ),
  deepEquals,
);
export const participantDisplayNameAtom = atomFamily(
  ({ habitId, participantId }: { habitId: HabitIdT; participantId: UserIdT }) =>
    atom((get) => get(participantAtom({ habitId, participantId })).displayName),
  deepEquals,
);
export const participantUsernameAtom = atomFamily(
  ({ habitId, participantId }: { habitId: HabitIdT; participantId: UserIdT }) =>
    atom((get) => get(participantAtom({ habitId, participantId })).username),
  deepEquals,
);

// Friends
export const allFriendsDataAtom = atom<allUsersInfoT>({});
allFriendsDataAtom.onMount = (set) => {
  // refetch everytime users friends change
  const unsubscribeFriendlist = subscribeToFriendList(set);
  return () => {
    // close the socket on unmount
    unsubscribeFriendlist();
  };
};

export const friendIdsAtom = atom(
  (get) => Object.keys(get(allFriendsDataAtom)) as UserIdT[],
);
export const friendAtom = atomFamily((friendId: UserIdT) =>
  atom((get) => get(allFriendsDataAtom)[friendId]),
);
export const friendDisplayNameAtom = atomFamily((friendId: UserIdT) =>
  atom((get) => get(friendAtom(friendId)).displayName),
);
export const friendUsernameAtom = atomFamily((friendId: UserIdT) =>
  atom((get) => get(friendAtom(friendId)).username),
);

export const removeFriendAtom = atom(
  null,
  async (_get, _set, friendId: UserIdT) => {
    await removeFriendInDb({ friendId });
    // The onSnapshot should take care of reseting allFriendsDataAtom
  },
);

export const commonHabitIdsAtom = atomFamily((friendId: UserIdT) =>
  atom(async () => {
    return await fetchCommonHabitIds({ participantId: friendId });
  }),
);

export const otherHabitIdsAtom = atomFamily((friendId: UserIdT) =>
  atom(async (get) => {
    const myFriendIds = get(friendIdsAtom);
    const commonHabitIds = await get(commonHabitIdsAtom(friendId));
    return fetchOtherHabitIds({
      participantId: friendId,
      myFriendIds,
      commonHabitIds,
    });
  }),
);

export const updateAllHabitsWithOtherHabitsAtom = atom(
  null,
  async (get, set, friendId: UserIdT) => {
    const otherHabitIds = await get(otherHabitIdsAtom(friendId));
    const newHabits = await fetchMultipleHabitsInfo(otherHabitIds);
    const allHabits = get(allHabitsAtom);
    const newAllHabits: allHabitsT = {
      ...(newHabits ?? {}),
      ...(allHabits ?? {}),
    };
    set(allHabitsAtom, newAllHabits);
  },
);

export const mutualFriendsAtom = atomFamily((friendId: UserIdT) =>
  atom(async (get) => {
    const myFriendIds = get(friendIdsAtom);
    const mutualFriends = await fetchMutualFriends({ friendId, myFriendIds });
    return mutualFriends;
  }),
);

export const numberOfMutualFriendsAtom = atomFamily((friendId: UserIdT) =>
  atom(async (get) => {
    const mutualFriends = await get(mutualFriendsAtom(friendId));
    return Object.keys(mutualFriends).length;
  }),
);

// NOTIFICATIONS
const notificationsAtom = atom<allNotificationsT>({});
notificationsAtom.onMount = (set) => {
  // refresh everytime notification changes
  const unsubscribeNotifs = subscribeToNotifications(set);
  return () => {
    // close the socket on unmount
    unsubscribeNotifs();
  };
};
export const notificationIdsAtom = atom(
  (get) => Object.keys(get(notificationsAtom)) as NotificationIdT[],
);
export const notificationAtom = atomFamily((notificationId: NotificationIdT) =>
  atom((get) => get(notificationsAtom)[notificationId]),
);
export const notificationTypeAtom = atomFamily(
  (notificationId: NotificationIdT) =>
    atom((get) => get(notificationAtom(notificationId)).type),
);
export const friendNotificationAtom = atomFamily(
  (notificationId: NotificationIdT) =>
    atom<friendNotificationT>((get) => {
      const notiAtom = get(notificationAtom(notificationId));
      if ("habitId" in notiAtom) throw new Error("Not a friend notification");
      return notiAtom as friendNotificationT;
    }),
);
export const habitNotificationAtom = atomFamily(
  (notificationId: NotificationIdT) =>
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

export const getUserInfoAtom = atomFamily((userId: UserIdT) =>
  atom(async (get) => fetchUserInfo({ userId })),
);

/**
 * Does not remove in Db !
 */
const removeLocalCopyOfNotification = atom(
  null,
  (get, set, notificationId: NotificationIdT) => {
    set(notificationsAtom, (prev) => {
      const { [notificationId]: _, ...remaining } = prev;
      return remaining;
    });
  },
);

export const deleteNotificationAtom = atom(
  null,
  async (get, set, notificationId: NotificationIdT) => {
    deleteNotificationInDb({ notifId: notificationId });
    set(removeLocalCopyOfNotification, notificationId);
  },
);

export const acceptFriendRequestAtom = atom(
  null,
  async (get, set, notificationId: NotificationIdT) => {
    set(removeLocalCopyOfNotification, notificationId);
    acceptFriendRequestInDb({ notifId: notificationId }).then(() =>
      fetchFriendData({ userId: get(currentUserIdAtom) }).then((friends) =>
        set(allFriendsDataAtom, friends),
      ),
    );
  },
);

export const acceptHabitInviteAtom = atom(
  null,
  async (get, set, notificationId: NotificationIdT) => {
    set(removeLocalCopyOfNotification, notificationId);
    acceptHabitInviteInDb({ notifId: notificationId }).then(() =>
      fetchAllMyHabitsInfo().then((allHabitsInfo) =>
        set(allHabitsAtom, allHabitsInfo),
      ),
    );
  },
);

// friend search
export const searchQueryAtom = atom("");

export const searchResultUsersAtom = atom(async (get) => {
  return await searchFriendsInDb({ searchText: get(searchQueryAtom) });
});
export const searchResultUserIdsAtom = atom(
  (get) => Object.keys(get(searchResultUsersAtom)) as UserIdT[],
);

export const outboundNotificationsAtom = atom<allNotificationsT>({});
outboundNotificationsAtom.onMount = (set) => {
  fetchOutboundNotifications().then(set);
};

export const inviteUserToHabitAtom = atomFamily(
  ({ habitId, theirUserId }: { habitId: HabitIdT; theirUserId: UserIdT }) =>
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
        const notifId = await sendNotificationInDb({ info: notificationInfo });
        set(outboundNotificationsAtom, (prev) => ({
          ...prev,
          [notifId]: notificationInfo,
        }));
      },
    ),
  deepEquals,
);

export const sendFriendRequestAtom = atomFamily((theirUserId: UserIdT) =>
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
      const notifId = await sendNotificationInDb({ info: notificationInfo });
      set(outboundNotificationsAtom, (prev) => ({
        ...prev,
        [notifId]: notificationInfo,
      }));
    },
  ),
);

export const sendHabitNudgeAtom = atomFamily(
  ({ habitId, theirUserId }: { habitId: HabitIdT; theirUserId: UserIdT }) =>
    atom(
      async (get) => {
        const outboundNotifications = get(outboundNotificationsAtom);
        const inviteExists = Object.values(outboundNotifications).some(
          (notif) =>
            notif.type === "nudge" &&
            notif.receiverId === theirUserId &&
            notif.habitId === habitId,
        );
        return inviteExists;
      },
      async (get, set) => {
        const currentUserId = get(currentUserIdAtom);
        const notificationInfo: notificationT = {
          type: "nudge",
          habitId,
          senderId: currentUserId,
          receiverId: theirUserId,
          sentAt: new Date(),
        };
        const notifId = await sendNotificationInDb({ info: notificationInfo });
        set(outboundNotificationsAtom, (prev) => ({
          ...prev,
          [notifId]: notificationInfo,
        }));
      },
    ),
  deepEquals,
);

// whether we should display the habit in weekly or monthly view
export const homeScreenHabitDisplayTypeAtom = atomFamily((habitId: HabitIdT) =>
  betterAtomWithStorage<HabitDisplayType>(
    `homeScreenHabitDisplayTypeAtom-${habitId}`,
    "weekly-view",
  ),
);

export const viewHabitDisplayTypeAtom = atomFamily((habitId: HabitIdT) =>
  betterAtomWithStorage<HabitDisplayType>(
    `viewHabitDisplayTypeAtom-${habitId}`,
    "weekly-view",
  ),
);

export const settingAtom = atomFamily((settingKey: string) =>
  betterAtomWithStorage<number>(settingKey, 0),
);

// Images
export const userPictureAtom = atomFamily(
  ({
    userId,
    colorScheme,
  }: {
    userId: UserIdT;
    colorScheme: ColorSchemeName;
  }) => atom(async () => await getUserProfilePicUrl(userId, colorScheme)),
  deepEquals,
);

export const habitParticipantPfpsListAtom = atomFamily(
  ({
    habitId,
    colorScheme,
  }: {
    habitId: HabitIdT;
    colorScheme: ColorSchemeName;
  }) =>
    atom(async (get) => {
      console.log("hit");
      const habitParticipantsIds = get(habitParticipantIdsAtom(habitId));
      const profilePicUrls = await Promise.all(
        habitParticipantsIds.map((userId) =>
          get(
            userPictureAtom({
              userId,
              colorScheme,
            }),
          ),
        ),
      );
      return profilePicUrls;
    }),
  deepEquals,
);

export const mutualFriendsPfpsListAtom = atomFamily(
  ({
    userId,
    colorScheme,
  }: {
    userId: UserIdT;
    colorScheme: ColorSchemeName;
  }) =>
    atom(async (get) => {
      const mutualFriends = await get(mutualFriendsAtom(userId));
      const mutualFriendIds = Object.keys(mutualFriends) as UserIdT[];
      const profilePicUrls = await Promise.all(
        mutualFriendIds.map((userId) =>
          getUserProfilePicUrl(userId, colorScheme),
        ),
      );
      return profilePicUrls;
    }),
  deepEquals,
);
