import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

const feedingSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  type: z.enum(['breast', 'bottle', 'solids']),
  amount: z.number().optional(),
  notes: z.string().optional(),
});

type FeedingFormData = z.infer<typeof feedingSchema>;

interface Props {
  onSubmit: (data: FeedingFormData) => void;
  isLoading?: boolean;
}

export default function FeedingForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FeedingFormData>({
    resolver: zodResolver(feedingSchema),
    defaultValues: {
      startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      type: 'breast',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Time
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
          End Time
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
          Type
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="breast">Breast</option>
            <option value="bottle">Bottle</option>
            <option value="solids">Solids</option>
          </select>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount (ml/oz)
          <input
            type="number"
            {...register('amount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
        {isLoading ? 'Saving...' : 'Save Feeding Entry'}
      </button>
    </form>
  );
}