export function convertTime(timestamp): string {
  const date = new Date(timestamp);

  return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
}
