import {
  habitColorAtom,
  habitDisplayTypeAtom,
  habitParticipantIdsAtom,
  participantPictureAtom,
} from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React from "react";
import HorizontalProfilePics from "../HorizontalProfilePics";

export default function ParticipantProfilePictures({
  habitId,
}: {
  habitId: string;
}) {
  const displayType = useAtomValue(habitDisplayTypeAtom(habitId));

  // it would be good to figure out how to do this responsively based on screen width
  const maxPfps = displayType === "weekly-view" ? 6 : 4;

  const participantIds = useAtomValue(habitParticipantIdsAtom(habitId));
  const participantPictures = participantIds.map((participantId) =>
    useAtomValue(participantPictureAtom({ habitId, participantId })),
  );
  const habitColor = useAtomValue(habitColorAtom(habitId));

  return (
    <HorizontalProfilePics
      ProfilePics={participantPictures}
      maxPics={maxPfps}
      borderColor={colors.habitColors[habitColor].base}
      habitId={habitId}
    />
  );
}