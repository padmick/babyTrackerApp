import React from 'react';
import { format } from 'date-fns';
import { Smile, Meh, Frown, Thermometer, Camera } from 'lucide-react';
import type { JournalEntry } from '../../types';

interface Props {
  entries: JournalEntry[];
  isLoading: boolean;
}

const moodIcons = {
  happy: { icon: Smile, color: 'text-green-500' },
  neutral: { icon: Meh, color: 'text-yellow-500' },
  sad: { icon: Frown, color: 'text-red-500' },
  sick: { icon: Thermometer, color: 'text-purple-500' },
};

export default function JournalList({ entries, isLoading }: Props) {
  if (isLoading) {
    return <div>Loading entries...</div>;
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => {
        const { icon: MoodIcon, color } = moodIcons[entry.mood];
        
        return (
          <div key={entry.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MoodIcon className={`h-6 w-6 ${color}`} />
                  <h3 className="text-lg font-medium text-gray-900">
                    {format(new Date(entry.date), 'MMMM d, yyyy')}
                  </h3>
                </div>
                {entry.milestone && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Milestone
                  </span>
                )}
              </div>
              
              {entry.milestone && (
                <p className="mt-4 text-sm font-medium text-gray-900">
                  {entry.milestone}
                </p>
              )}
              
              {entry.notes && (
                <p className="mt-2 text-sm text-gray-500">{entry.notes}</p>
              )}
              
              {entry.photoUrls?.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Camera className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {entry.photoUrls.length} photo{entry.photoUrls.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {entry.photoUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Journal photo ${index + 1}`}
                        className="rounded-lg object-cover h-48 w-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}