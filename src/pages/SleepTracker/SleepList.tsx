import React from 'react';
import { format, differenceInHours, differenceInMinutes } from 'date-fns';
import { Moon, Star } from 'lucide-react';
import type { SleepEntry } from '../../types';

interface Props {
  entries: SleepEntry[];
  isLoading: boolean;
}

function formatDuration(startTime: string, endTime: string): string {
  const hours = differenceInHours(new Date(endTime), new Date(startTime));
  const minutes = differenceInMinutes(new Date(endTime), new Date(startTime)) % 60;
  return `${hours}h ${minutes}m`;
}

export default function SleepList({ entries, isLoading }: Props) {
  if (isLoading) {
    return <div>Loading entries...</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {entries.map((entry) => (
          <li key={entry.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      {format(new Date(entry.startTime), 'MMM d, h:mm a')}
                    </p>
                    <p className="text-xs text-gray-500">
                      Duration: {formatDuration(entry.startTime, entry.endTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {entry.quality && (
                    <div className="flex items-center mr-4">
                      {[...Array(entry.quality)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {entry.location}
                  </span>
                </div>
              </div>
              {entry.notes && (
                <div className="mt-2 text-sm text-gray-500">{entry.notes}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}