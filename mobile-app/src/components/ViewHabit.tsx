import { HabitIcon } from "@/src/components/Icon";
import IconButton from "@/src/components/IconButton";
import { Text, View } from "@/src/components/Themed";
import {
  IconCalendarMonth,
  IconEdit,
  IconHistory,
  IconShare2,
  IconTrash,
  IconUserPlus,
} from "@tabler/icons-react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import { Pressable } from "react-native";
import { habitInfoAtom } from "../atoms/atoms";

export default function ViewHabitComponent() {
  const params = useLocalSearchParams();
  const { id } = params;
  if (typeof id !== "string") {
    throw new Error("Invalid habit id provided in URL params");
  }
  // get habit based on id
  const habit = useAtomValue(habitInfoAtom(parseInt(id)));
  if (!habit) {
    throw new Error(`Habit with id ${id} not found`);
  }

  return (
    <View className="flex-1 p-4" style={{ gap: 40 }}>
      <View className="flex-column flex" style={{ gap: 20 }}>
        {/* Title */}
        <View>
          <View className="flex flex-row items-center justify-between">
            <View
              className="flex flex-1 flex-row items-center"
              style={{ gap: 10 }}
            >
              <HabitIcon size={32} icon={habit.icon} />
              <Text
                numberOfLines={1}
                className="mb-1 flex-1 text-xl font-bold text-black dark:text-white"
              >
                {habit.title}
              </Text>
            </View>
          </View>
          <Text>{habit.description}</Text>
        </View>

        {/* Edit/Delete Buttons */}
        <View className="flex flex-row" style={{ gap: 10 }}>
          <Pressable
            className="flex-1"
            onPress={() => {
              router.push({
                pathname: "/habits/edithabit",
                params: { habitidStr: id },
              });
            }}
          >
            <IconButton icon={IconEdit} text="Edit habit" />
          </Pressable>
          <Pressable className="flex-1">
            <IconButton icon={IconTrash} text="Delete habit" />
          </Pressable>
        </View>

        {/* Full/Edit Heatmap Buttons */}
        <View className="flex flex-row" style={{ gap: 10 }}>
          <Pressable className="flex-1">
            <IconButton icon={IconHistory} text="Full history" />
          </Pressable>
          <Pressable className="flex-1">
            <IconButton icon={IconCalendarMonth} text="Edit dates" />
          </Pressable>
        </View>
      </View>

      {/* Participants */}
      <View className="flex-column flex" style={{ gap: 20 }}>
        <Text className="mb-1 text-xl font-bold text-black dark:text-white">
          Participants (3)
        </Text>
        {/* add participant cards */}
      </View>

      {/* Invite/Share Buttons*/}
      <View className="flex flex-row" style={{ gap: 10 }}>
        <Link
          push
          href={{
            pathname: "/modals/invitefriends",
          }}
          asChild
        >
          <Pressable className="flex-1">
            <IconButton icon={IconUserPlus} text="Invite friends" />
          </Pressable>
        </Link>
        <Pressable className="flex-1">
          <IconButton icon={IconShare2} text="Share link" />
        </Pressable>
      </View>
    </View>
  );
}

// function ParticipantsSection({ habitId }: { habitId: number }) {
//   const user = useAtomValue(userAtom);
//   const participants = useAtomValue(habitParticipantIdsAtom(habitId));

//   return (
//     <View className="flex flex-1 flex-col">
//       <Text
//         numberOfLines={1}
//         className="text-xl font-bold text-black dark:text-white"
//       >
//         Participants ({participants.length})
//       </Text>
//       <View className="mx-auto my-5">
//         <WeeklyOrMonthlySwitcher />
//       </View>
//       <View className="flex flex-1 flex-col" style={{ gap: 10 }}>
//         <Suspense fallback={<></>}>
//           <View className="flex flex-1 flex-col">
//             <ActivityCard
//               habitId={habitId}
//               participantId={null}
//               // personData={{
//               //   id: user.id,
//               //   displayName: user.displayName,
//               //   username: user.username,
//               //   profilePicUrl: user.profilePicture,
//               // }}
//             />
//             <View className="my-2 flex w-full flex-row items-center justify-center">
//               <Icon icon={IconEye} />
//               <Text className="ml-1 text-sm font-semibold">
//                 My friends can see my progress
//               </Text>
//             </View>
//           </View>
//         </Suspense>
//         {participants.map((participant) => (
//           <Suspense key={participant} fallback={<></>}>
//             <ActivityCard
//               habitId={habitId}
//               participantId={participant}
//               // personData={participant}
//             />
//           </Suspense>
//         ))}
//         {/* <ActivityCard habitId={1} friendId={2} /> */}
//       </View>
//     </View>
//   );
// }

// function ActivityCard({
//   habitId,
//   participantId,
// }: {
//   habitId: number;
//   // null means the user themself
//   participantId: number | null;
// }) {
//   const { colorScheme } = useColorScheme();
//   const habit = useAtomValue(habitInfoAtom(habitId));
//   const completionData = participantId
//     ? useAtomValue(habitParticipantCompletionsAtom({ habitId, participantId }))
//     : useAtomValue(habitCompletionsAtom(habitId));
//   // const completionData = useAtomValue(habitCompletionsAtom(habitId));
//   const participant = participantId
//     ? useAtomValue(habitParticipantAtom({ habitId, participantId }))
//     : useAtomValue(userAtom);

//   const [pfp, setPfp] = useState<string | null>(null);
//   useEffect(() => {
//     participant && setPfp(getLocalRandomProfilePic(participant.id));
//   }, [participant]);

//   return (
//     <View
//       className="flex flex-col rounded-[25px] border border-stone-300 p-[10px]"
//       style={{ gap: 10 }}
//     >
//       {/* info */}
//       <View className="flex flex-row" style={{ gap: 10 }}>
//         {/* image */}
//         <View className="">
//           {pfp && <MediumProfilePicture picUrl={pfp} isLocalImage={true} />}
//         </View>
//         {/* text */}
//         <View className="flex flex-col justify-center">
//           <Text className="text-base font-semibold">
//             {participant.displayName}
//           </Text>
//           <Text className="text-xs text-stone-400">{participant.username}</Text>
//         </View>
//       </View>
//       {/* completions */}
//       <View
//         className="flex w-full flex-1 flex-row items-end justify-between rounded-[15px] p-[10px] pb-[6px]"
//         style={{
//           backgroundColor:
//             colorScheme === "dark"
//               ? colors.habitColors.stone.light
//               : colors.habitColors[habit.color].light,
//         }}
//       >
//         {completionData.slice(-7).map((completion, index) => (
//           <WeeklyViewCompletionSquare
//             key={index}
//             habitId={habitId}
//             completion={completion}
//           />
//         ))}
//       </View>
//     </View>
//   );
// }

// function WeeklyOrMonthlySwitcher() {
//   return (
//     <View className="h-11 w-60 rounded-full bg-stone-100 dark:bg-stone-700"></View>
//   );
// }

// function InviteFriendsButton() {
//   const { colorScheme } = useColorScheme();

//   return (
//     <View className="flex flex-row" style={{ gap: 10 }}>
//       <Link
//         push
//         href={{
//           pathname: "/modals/invitefriends",
//         }}
//         asChild
//       >
//         <Pressable className="flex-1">
//           {/* <IconButton icon={IconUserPlus} text="Invite friends" /> */}
//           <View
//             className="border-1 flex flex-row content-center justify-center rounded-2xl border pb-2 pt-2"
//             style={{
//               borderColor:
//                 colorScheme === "dark" ? colors.stone.light : colors.stone[200],
//               gap: 2,
//             }}
//           >
//             <Icon icon={IconUserPlus} />
//             <Text>Invite friends</Text>
//           </View>
//         </Pressable>
//       </Link>
//     </View>
//   );
// }