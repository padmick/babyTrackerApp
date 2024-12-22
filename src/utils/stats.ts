import { getTodayRange } from './date';
import type { FeedingEntry, SleepEntry } from '../types';

export function calculateDailyStats<T extends { startTime: string }>(
  entries: T[],
  calculate: (entries: T[]) => Record<string, number>
): Record<string, number> {
  const { start, end } = getTodayRange();
  const todayEntries = entries.filter(
    entry => {
      const entryDate = new Date(entry.startTime);
      return entryDate >= start && entryDate <= end;
    }
  );
  return calculate(todayEntries);
}

export function calculateFeedingStats(entries: FeedingEntry[]) {
  return calculateDailyStats(entries, (todayEntries) => ({
    totalFeedings: todayEntries.length,
    breastFeedings: todayEntries.filter(e => e.type === 'breast').length,
    bottleFeedings: todayEntries.filter(e => e.type === 'bottle').length,
    solidFeedings: todayEntries.filter(e => e.type === 'solids').length,
  }));
}

export function calculateSleepStats(entries: SleepEntry[]) {
  return calculateDailyStats(entries, (todayEntries) => {
    const totalMinutes = todayEntries.reduce((acc, entry) => {
      return acc + differenceInMinutes(new Date(entry.endTime), new Date(entry.startTime));
    }, 0);
    
    const avgQuality = todayEntries.reduce((acc, entry) => {
      return acc + (entry.quality || 0);
    }, 0) / (todayEntries.length || 1);

    return {
      totalSleepMinutes: totalMinutes,
      averageQuality: Math.round(avgQuality * 10) / 10,
      naps: todayEntries.length,
    };
  });
}