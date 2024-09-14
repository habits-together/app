import {
  habitColorAtom,
  habitParticipantPfpsListAtom,
  homeScreenHabitDisplayTypeAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { HabitIdT } from "@/src/lib/db_types";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React from "react";
import HorizontalProfilePicsList from "../HorizontalProfilePicsList";

export default function ParticipantProfilePictures({
  habitId,
}: {
  habitId: HabitIdT;
}) {
  const { colorScheme } = useColorScheme();
  const displayType = useAtomValue(homeScreenHabitDisplayTypeAtom(habitId));
  // it would be good to figure out how to do this responsively based on screen width
  const maxPfps = displayType === "weekly-view" ? 6 : 4;

  const participantPictures = useAtomValue(
    habitParticipantPfpsListAtom({ habitId, colorScheme }),
  );

  const habitColor = useAtomValue(habitColorAtom(habitId));

  return (
    <HorizontalProfilePicsList
      profilePics={participantPictures}
      maxPics={maxPfps}
      borderColor={colors.habitColors[habitColor].base}
      habitId={habitId}
    />
  );
}

const participantPictures = [""];
