import {
  habitColorAtom,
  habitDisplayTypeAtom,
  habitParticipantsAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { getLocalRandomProfilePics } from "@/src/lib/getRandomProfilePics";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SmallProfilePicture } from "../ProfilePicture";

export default function ParticipantProfilePictures({
  habitId,
}: {
  habitId: number;
}) {
  const { colorScheme } = useColorScheme();

  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  // it would be good to figure out how to do this responsively based on screen width
  const maxPfps = displayType === "weekly-view" ? 6 : 4;

  const habitParticipantIds = useAtomValue(habitParticipantsAtom(habitId));
  const [mockPfps, setMockPfps] = useState<
    { imgurl: string; hasCompleted: boolean }[]
  >([]);
  const [numPfpsToDisplay, setNumPfpsToDisplay] = useState<number>(maxPfps);

  const habitColor = useAtomValue(habitColorAtom(habitId));

  useEffect(() => {
    setMockPfps(getLocalRandomProfilePics(habitParticipantIds));
  }, []);

  useEffect(() => {
    // since we want to display x pfps
    // but if there are more, we want to take one away
    // in order to display the +y circle
    if (mockPfps.length === maxPfps) {
      setNumPfpsToDisplay(maxPfps);
    } else {
      setNumPfpsToDisplay(maxPfps - 1);
    }
  }, [mockPfps]);

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
          +{mockPfps.length - maxPfps}
        </Text>
      </View>
    );
  }
  return (
    <View className="mr-[7px] flex flex-row-reverse">
      {mockPfps.length > maxPfps && <ExtraHiddenPfpsCircle />}
      {mockPfps.slice(0, numPfpsToDisplay).map((data, index) => (
        <View
          key={data.imgurl + index}
          className="-mr-[7px] rounded-full border"
          style={{ borderColor: colors.habitColors[habitColor].base }}
        >
          <SmallProfilePicture picUrl={data.imgurl} isLocalImage={true} />
        </View>
      ))}
    </View>
  );
}
