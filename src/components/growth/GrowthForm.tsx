import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { growthSchema } from '../../types/growth';
import type { GrowthEntry } from '../../types/growth';

type GrowthFormData = Omit<GrowthEntry, 'id' | 'childId' | 'createdBy'>;

interface Props {
  onSubmit: (data: GrowthFormData) => void;
  isLoading?: boolean;
}

export default function GrowthForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<GrowthFormData>({
    resolver: zodResolver(growthSchema.omit({ id: true, childId: true, createdBy: true })),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date
          <input
            type="date"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Weight (kg)
          <input
            type="number"
            step="0.1"
            {...register('weight', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        {errors.weight && (
          <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Height (cm)
          <input
            type="number"
            step="0.1"
            {...register('height', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        {errors.height && (
          <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Head Circumference (cm)
          <input
            type="number"
            step="0.1"
            {...register('headCircumference', { valueAsNumber: true })}
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
        {isLoading ? 'Saving...' : 'Save Growth Entry'}
      </button>
    </form>
  );
}