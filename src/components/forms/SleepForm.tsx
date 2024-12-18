// Sleep tracking form component with validation and time selection
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

// Schema for sleep entry validation
const sleepSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  location: z.string().min(1, 'Location is required'),
  quality: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
});

type SleepFormData = z.infer<typeof sleepSchema>;

interface Props {
  onSubmit: (data: SleepFormData) => void;
  isLoading?: boolean;
}

export default function SleepForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<SleepFormData>({
    resolver: zodResolver(sleepSchema),
    defaultValues: {
      startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      location: 'crib',
      quality: 3,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sleep Time
          <input
            type="datetime-local"
            {...register('startTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        {errors.startTime && (
          <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Wake Time
          <input
            type="datetime-local"
            {...register('endTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        {errors.endTime && (
          <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
          <select
            {...register('location')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="crib">Crib</option>
            <option value="stroller">Stroller</option>
            <option value="car">Car</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sleep Quality (1-5)
          <input
            type="range"
            min="1"
            max="5"
            {...register('quality', { valueAsNumber: true })}
            className="mt-1 block w-full"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
          <textarea
            {...register('notes')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? 'Saving...' : 'Save Sleep Entry'}
      </button>
    </form>
  );
}