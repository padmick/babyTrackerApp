import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { milestoneSchema } from '../../types/growth';
import type { Milestone } from '../../types/growth';

type MilestoneFormData = Omit<Milestone, 'id' | 'childId' | 'createdBy'>;

interface Props {
  onSubmit: (data: MilestoneFormData) => void;
  isLoading?: boolean;
}

export default function MilestoneForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<MilestoneFormData>({
    resolver: zodResolver(milestoneSchema.omit({ id: true, childId: true, createdBy: true })),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      category: 'motor',
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
          Category
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="motor">Motor Skills</option>
            <option value="cognitive">Cognitive</option>
            <option value="social">Social</option>
            <option value="language">Language</option>
          </select>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
          <input
            type="text"
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., First Steps, First Word"
          />
        </label>
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Add more details about this milestone..."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? 'Saving...' : 'Save Milestone'}
      </button>
    </form>
  );
}