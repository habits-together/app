import { HabitCompletionValue } from "@/src/components/HabitCard";

export function getMockCompletionsData() {
  function getNumberOfDaysInLastWeek() {
    const currDay = new Date().getDay();
    return currDay === 0 ? 7 : currDay;
  }
  const daysInLastWeek = getNumberOfDaysInLastWeek();
  const activityData: HabitCompletionValue[] = new Array(56); // (3*2) weeks * 7 days + 7 days of last week = 49 days
  for (let i = 0; i < 49 + daysInLastWeek; i++) {
    Math.floor(Math.random() * 2)
      ? (activityData[i] = "completed")
      : (activityData[i] = "missed");
  }
  for (let i = 49 + daysInLastWeek; i < activityData.length; i++) {
    activityData[i] = "not-applicable";
  }
  let indexOftoday = 49 + daysInLastWeek - 1;
  // make sure last fay is always missed
  activityData[indexOftoday] = "missed";
  return [activityData, indexOftoday] as const;
}
