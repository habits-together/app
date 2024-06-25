import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { habitColorAtom } from "../atoms/atoms";
import colors from "../constants/colors";
import { SmallProfilePicture } from "./ProfilePicture";
import { Text, View } from "./Themed";

export default function HorizontalProfilePics({
  ProfilePics,
  maxPics,
  borderColor,
  habitId,
}: {
  ProfilePics: string[];
  maxPics: number;
  borderColor: string;
  habitId?: string;
}) {
  const [numPfpsToDisplay, setNumPfpsToDisplay] = useState<number>(maxPics);
  const { colorScheme } = useColorScheme();
  let backgroundColor:string =
    colorScheme === "dark" ? colors.stone.base : colors.white;
  if (habitId) {
    const habitColor = useAtomValue(habitColorAtom(habitId));
    backgroundColor =
      colorScheme === "dark"
        ? colors.stone.light
        : colors.habitColors[habitColor].light;
  }
  useEffect(() => {
    // since we want to display x pfps
    // but if there are more, we want to take one away
    // in order to display the +y circle
    if (ProfilePics.length === maxPics) {
      setNumPfpsToDisplay(maxPics);
    } else {
      setNumPfpsToDisplay(maxPics - 1);
    }
  }, [ProfilePics]);

  return (
    <View
      className="mr-[7px] flex flex-row-reverse"
      style={{ backgroundColor }}
    >
      {ProfilePics.length > maxPics && (
        <ExtraHiddenPfpsCircle
          maxPics={maxPics}
          totalPicLen={ProfilePics.length}
          habitId={habitId}
        />
      )}
      {ProfilePics.slice(0, numPfpsToDisplay).map((picBase64String) => (
        <View
          key={picBase64String}
          className="-mr-[7px] rounded-full border"
          style={{ borderColor }}
        >
          <SmallProfilePicture picUrl={picBase64String} isLocalImage={true} />
        </View>
      ))}
    </View>
  );
}

function ExtraHiddenPfpsCircle({
  totalPicLen,
  maxPics,
  habitId,
}: {
  totalPicLen: number;
  maxPics: number;
  habitId?: string;
}) {
  const { colorScheme } = useColorScheme();
  let backgroundColor =
    colorScheme === "dark" ? colors.stone.faded : colors.stone[300];
  let color = colors.stone.text;
  if (habitId != undefined) {
    const habitColor = useAtomValue(habitColorAtom(habitId));
    backgroundColor =
      colorScheme === "dark"
        ? colors.stone.faded
        : colors.habitColors[habitColor].faded;
    color =
      colorScheme === "dark"
        ? colors.stone.text
        : colors.habitColors[habitColor].text;
  }

  return (
    <View
      className="-mr-[10px] h-[31px] w-[31px] rounded-full" // 30px + 1px border
      style={{
        backgroundColor,
      }}
    >
      <Text
        className="mx-auto my-auto pl-1 text-xs font-semibold"
        style={{
          color,
        }}
      >
        +{totalPicLen - maxPics + 1}
      </Text>
    </View>
  );
}
