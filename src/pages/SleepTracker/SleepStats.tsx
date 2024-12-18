import React from 'react';
import { startOfDay, endOfDay, differenceInMinutes } from 'date-fns';
import type { SleepEntry } from '../../types';

interface Props {
  entries: SleepEntry[];
}

export default function SleepStats({ entries }: Props) {
  const today = new Date();
  const todayStart = startOfDay(today);
  const todayEnd = endOfDay(today);
  
  const todayEntries = entries.filter(
    (entry) => new Date(entry.startTime) >= todayStart && 
               new Date(entry.startTime) <= todayEnd
  );

  const stats = {
    totalSleep: todayEntries.reduce((acc, entry) => {
      return acc + differenceInMinutes(
        new Date(entry.endTime),
        new Date(entry.startTime)
      );
    }, 0),
    avgQuality: todayEntries.reduce((acc, entry) => {
      return acc + (entry.quality || 0);
    }, 0) / (todayEntries.length || 1),
    byLocation: todayEntries.reduce((acc, entry) => {
      acc[entry.location] = (acc[entry.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Today's Sleep</h2>
      <dl className="mt-5 grid grid-cols-1 gap-5">
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Total Sleep
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {Math.floor(stats.totalSleep / 60)}h {stats.totalSleep % 60}m
          </dd>
        </div>
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Average Quality
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {stats.avgQuality.toFixed(1)}/5
          </dd>
        </div>
        <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Sleep Locations
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            <ul className="space-y-1">
              {Object.entries(stats.byLocation).map(([location, count]) => (
                <li key={location} className="capitalize">
                  {location}: {count}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}