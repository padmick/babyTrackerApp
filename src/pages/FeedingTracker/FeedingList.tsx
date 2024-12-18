import React from 'react';
import { format } from 'date-fns';
import { Bottle, Utensils, Heart } from 'lucide-react';
import type { FeedingEntry } from '../../types';

interface Props {
  entries: FeedingEntry[];
  isLoading: boolean;
}

const typeIcons = {
  breast: Heart,
  bottle: Bottle,
  solids: Utensils,
};

export default function FeedingList({ entries, isLoading }: Props) {
  if (isLoading) {
    return <div>Loading entries...</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {entries.map((entry) => {
          const Icon = typeIcons[entry.type];
          return (
            <li key={entry.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-gray-400 mr-3" />
                    <p className="text-sm font-medium text-indigo-600 capitalize">
                      {entry.type} feeding
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(entry.startTime), 'MMM d, h:mm a')}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="text-sm text-gray-500">
                      Duration: {format(new Date(entry.endTime), 'h:mm a')}
                    </p>
                    {entry.amount && (
                      <p className="mt-2 text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        Amount: {entry.amount}ml
                      </p>
                    )}
                  </div>
                </div>
                {entry.notes && (
                  <div className="mt-2 text-sm text-gray-500">{entry.notes}</div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}