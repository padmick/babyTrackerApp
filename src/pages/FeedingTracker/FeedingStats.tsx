import React from 'react';
import { startOfDay, endOfDay, differenceInMinutes } from 'date-fns';
import type { FeedingEntry } from '../../types';

interface Props {
  entries: FeedingEntry[];
}

export default function FeedingStats({ entries }: Props) {
  // Calculate today's stats
  const today = new Date();
  const todayStart = startOfDay(today);
  const todayEnd = endOfDay(today);
  
  const todayEntries = entries.filter(
    (entry) => new Date(entry.startTime) >= todayStart && 
               new Date(entry.startTime) <= todayEnd
  );

  const stats = {
    totalFeedings: todayEntries.length,
    avgDuration: todayEntries.reduce((acc, entry) => {
      return acc + differenceInMinutes(
        new Date(entry.endTime),
        new Date(entry.startTime)
      );
    }, 0) / (todayEntries.length || 1),
    byType: {
      breast: todayEntries.filter(e => e.type === 'breast').length,
      bottle: todayEntries.filter(e => e.type === 'bottle').length,
      solids: todayEntries.filter(e => e.type === 'solids').length,
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Today's Stats</h2>
      <dl className="mt-5 grid grid-cols-1 gap-5">
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Total Feedings
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {stats.totalFeedings}
          </dd>
        </div>
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Average Duration
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {Math.round(stats.avgDuration)} min
          </dd>
        </div>
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            By Type
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            <ul className="space-y-1">
              <li>Breast: {stats.byType.breast}</li>
              <li>Bottle: {stats.byType.bottle}</li>
              <li>Solids: {stats.byType.solids}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}