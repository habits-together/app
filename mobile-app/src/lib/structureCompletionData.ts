import { habitCompletionsT, habitCompletionWithDateInfoT } from "./db_types";
import { formatDateString } from "./formatDateString";

/**
 * This function structures the completion data for a habit over a specified number of days.
 * It creates an array where each entry corresponds to the completion data for a specific day.
 * The completion data for each day is accessed using the formatted date string as the key.
 * If there is no completion data for a specific day, it defaults to 0.
 * The array is ordered from the most recent day to the oldest day.
 *
 * @param {habitCompletionsT} params.completionData - The completion data for the habit. This is an object where each key is a formatted date string and the value is the completion data for that day.
 * @param {number} params.numDays - The number of days to structure the completion data for.
 * @returns {Array} An array of completion data for each day, ordered from most recent to oldest.
 */
export function structureCompletionData({
  completionData,
  numDays,
}: {
  completionData: habitCompletionsT;
  numDays: number;
}): habitCompletionWithDateInfoT[] {
  const structuredCompletionData: habitCompletionWithDateInfoT[] = [];

  let currentDate = new Date();
  // go back to the first day we want to display
  currentDate.setDate(currentDate.getDate() - numDays + 1);
  // loop through each day and add the completion data for that day to the structured data
  for (let i = 0; i < numDays; i++) {
    // if there is no completion data for the current date, default to 0 (no completions that day)
    structuredCompletionData.push({
      numberOfCompletions:
        completionData?.completions?.[formatDateString(currentDate)] ?? 0,
      dayOfTheMonth: currentDate.getDate(),
      dayOfTheWeek: currentDate.toLocaleString("en-US", { weekday: "short" }),
    });
    // move current date ahead 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return structuredCompletionData;
}
