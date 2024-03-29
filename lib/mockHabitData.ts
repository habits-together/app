export function getMockCompletionsData() {
  function getNumberOfDaysInLastWeek() {
    const currDay = new Date().getDay();
    return currDay === 0 ? 7 : currDay;
  }
  const daysInLastWeek = getNumberOfDaysInLastWeek();
  const activityData: number[] = new Array(49 + daysInLastWeek); // (3*2) weeks * 7 days + 7 days of last week = 49 days
  // put random numbers (0 or 1) in the array
  for (let i = 0; i < activityData.length; i++) {
    activityData[i] = Math.floor(Math.random() * 2);
  }
  return activityData;
}
