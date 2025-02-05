export function getDate(string: Date) {
  const now = new Date(string);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  // Format as hh:mm AM/PM
  const formattedTime = `${date} ${month} ${year}`;
  return formattedTime;
}

export function timeDifference(string1: Date, string2: Date) {
  const date1 = new Date(string1);
  const date2 = new Date(string2);

  const hours1 = date1.getHours();
  const hours2 = date2.getHours();

  const hoursDifference = hours2 - hours1;

  if (hoursDifference > 0) return `${hoursDifference}hrs ago`;

  const min1 = date1.getMinutes();
  const min2 = date2.getMinutes();

  const minutesDifference = min2 - min1;
  if (minutesDifference > 0) {
    return `${minutesDifference}min ago`;
  } else {
    return "1 min ago";
  }
}

export function getDisplayTime(string: Date) {
  const today = getDate(new Date());
  const msgDate = getDate(string);
  if (msgDate === today) {
    return timeDifference(string, new Date());
  } else {
    const day = new Date(string);
    const date = day.getDate();
    const month = day.toLocaleString("en-US", { month: "short" }).toLowerCase();
    return `${date} ${month}`;
  }
}
