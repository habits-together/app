import {
  habitColorAtom,
  habitDisplayTypeAtom,
  habitParticipantIdsAtom,
  participantPictureAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SmallProfilePicture } from "../ProfilePicture";

export default function ParticipantProfilePictures({
  habitId,
}: {
  habitId: string;
}) {
  const { colorScheme } = useColorScheme();

  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  // it would be good to figure out how to do this responsively based on screen width
  const maxPfps = displayType === "weekly-view" ? 6 : 4;

  const participantIds = useAtomValue(habitParticipantIdsAtom(habitId));
  const [numPfpsToDisplay, setNumPfpsToDisplay] = useState<number>(maxPfps);
  const habitColor = useAtomValue(habitColorAtom(habitId));

  useEffect(() => {
    // since we want to display x pfps
    // but if there are more, we want to take one away
    // in order to display the +y circle
    if (participantIds.length === maxPfps) {
      setNumPfpsToDisplay(maxPfps);
    } else {
      setNumPfpsToDisplay(maxPfps - 1);
    }
  }, [participantIds]);

  function ExtraHiddenPfpsCircle() {
    return (
      <View
        className="-mr-[7px] h-[30px] w-[30px] rounded-full"
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? colors.stone.faded
              : colors.habitColors[habitColor].faded,
        }}
      >
        <Text
          className="mx-auto my-auto pl-1 text-xs font-semibold"
          style={{
            color:
              colorScheme === "dark"
                ? colors.stone.text
                : colors.habitColors[habitColor].text,
          }}
        >
          +{participantIds.length - maxPfps}
        </Text>
      </View>
    );
  }
  return (
    <View className="mr-[7px] flex flex-row-reverse">
      {participantIds.length > maxPfps && <ExtraHiddenPfpsCircle />}
      {participantIds.slice(0, numPfpsToDisplay).map((id) => (
        <ParticipantPfp key={id} habitId={habitId} participantId={id} />
      ))}
    </View>
  );
}

function ParticipantPfp({
  habitId,
  participantId,
}: {
  habitId: string;
  participantId: string;
}) {
  const color = useAtomValue(habitColorAtom(habitId));
  const pictureString = useAtomValue(
    participantPictureAtom({ habitId, participantId }),
  );

  return (
    <View
      key={participantId}
      className="-mr-[7px] rounded-full border"
      style={{ borderColor: colors.habitColors[color].base }}
    >
      <SmallProfilePicture picUrl={pictureString} isLocalImage={true} />
    </View>
  );
}
