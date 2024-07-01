export function getNumberOfDaysInLastWeek() {
  const currDay = new Date().getDay();
  return currDay === 0 ? 7 : currDay;
}
