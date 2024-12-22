import { format, differenceInMinutes, differenceInHours, startOfDay, endOfDay } from 'date-fns';

export function formatDuration(startTime: string, endTime: string): string {
  const hours = differenceInHours(new Date(endTime), new Date(startTime));
  const minutes = differenceInMinutes(new Date(endTime), new Date(startTime)) % 60;
  return `${hours}h ${minutes}m`;
}

export function getTodayRange() {
  const today = new Date();
  return {
    start: startOfDay(today),
    end: endOfDay(today)
  };
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'MMM d, h:mm a');
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMMM d, yyyy');
}