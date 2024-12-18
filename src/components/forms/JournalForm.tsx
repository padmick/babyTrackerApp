// Journal entry form with mood tracking and photo upload
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Smile, Meh, Frown, Thermometer } from 'lucide-react';

// Schema for journal entry validation
const journalSchema = z.object({
  date: z.string(),
  mood: z.enum(['happy', 'neutral', 'sad', 'sick']),
  milestone: z.string().optional(),
  notes: z.string().optional(),
  photos: z.array(z.instanceof(File)).optional(),
});

type JournalFormData = z.infer<typeof journalSchema>;

interface Props {
  onSubmit: (data: JournalFormData) => void;
  isLoading?: boolean;
}

export default function JournalForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: 'happy',
    },
  });

  const selectedMood = watch('mood');

  const moodIcons = {
    happy: <Smile className="w-8 h-8" />,
    neutral: <Meh className="w-8 h-8" />,
    sad: <Frown className="w-8 h-8" />,
    sick: <Thermometer className="w-8 h-8" />,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date
          <input
            type="date"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mood
        </label>
        <div className="flex space-x-4">
          {Object.entries(moodIcons).map(([mood, icon]) => (
            <label
              key={mood}
              className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer ${
                selectedMood === mood
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
            >
              <input
                type="radio"
                value={mood}
                {...register('mood')}
                className="sr-only"
              />
              {icon}
              <span className="mt-1 text-sm capitalize">{mood}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Milestone
          <input
            type="text"
            {...register('milestone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., First steps, First word"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
          <textarea
            {...register('notes')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="How was your child's day?"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Photos
          <input
            type="file"
            multiple
            accept="image/*"
            {...register('photos')}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? 'Saving...' : 'Save Journal Entry'}
      </button>
    </form>
  );
}