export function getFormattedTime(totalTimeInSeconds) {
  if (typeof totalTimeInSeconds !== "number") return "00:00:00";
  const timeInHours = addLeadingZero(Math.floor(totalTimeInSeconds / 3600));
  const timeInMinutes = addLeadingZero(
    Math.floor((totalTimeInSeconds % 3600) / 60)
  );
  const timeInSeconds = addLeadingZero(Math.floor(totalTimeInSeconds % 60));

  return `${timeInHours}:${timeInMinutes}:${timeInSeconds}`;
}
function addLeadingZero(num) {
  return num < 10 ? "0" + num : num;
}
