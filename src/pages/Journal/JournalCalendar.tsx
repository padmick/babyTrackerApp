import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Smile, Meh, Frown, Thermometer } from 'lucide-react';
import type { JournalEntry } from '../../types';

interface Props {
  entries: JournalEntry[];
}

const moodIcons = {
  happy: { icon: Smile, color: 'text-green-500' },
  neutral: { icon: Meh, color: 'text-yellow-500' },
  sad: { icon: Frown, color: 'text-red-500' },
  sick: { icon: Thermometer, color: 'text-purple-500' },
};

export default function JournalCalendar({ entries }: Props) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const entriesByDate = entries.reduce((acc, entry) => {
    const date = format(new Date(entry.date), 'yyyy-MM-dd');
    acc[date] = entry;
    return acc;
  }, {} as Record<string, JournalEntry>);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">
        {format(today, 'MMMM yyyy')}
      </h2>
      <div className="mt-6 grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const entry = entriesByDate[dateStr];
          const MoodIcon = entry ? moodIcons[entry.mood].icon : null;
          const moodColor = entry ? moodIcons[entry.mood].color : '';

          return (
            <div
              key={dateStr}
              className="h-12 flex items-center justify-center border rounded-lg"
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <span className="text-sm">{format(day, 'd')}</span>
                {MoodIcon && (
                  <MoodIcon className={`h-4 w-4 ${moodColor}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}