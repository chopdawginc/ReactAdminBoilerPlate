export function formatDuration(duration: number): string {
  const totalSeconds: number = Math.floor(duration * 60); // Convert minutes to seconds
  const minutes: number = Math.floor(totalSeconds / 60); // Extract the minutes
  const seconds: number = totalSeconds % 60; // Extract the remaining seconds

  // Format minutes and seconds to ensure two digits
  const formattedMinutes: string = String(minutes).padStart(2, "0");
  const formattedSeconds: string = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
