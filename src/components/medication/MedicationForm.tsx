import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

const medicationSchema = z.object({
  name: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.enum(['once', 'daily', 'weekly', 'as-needed']),
  time: z.string(),
  notes: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
});

type MedicationFormData = z.infer<typeof medicationSchema>;

interface Props {
  onSubmit: (data: MedicationFormData) => void;
  isLoading?: boolean;
}

export default function MedicationForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      startDate: format(new Date(), 'yyyy-MM-dd'),
      frequency: 'daily',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Medication Name
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., Ibuprofen"
          />
        </label>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dosage
          <input
            type="text"
            {...register('dosage')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., 5ml or 1 tablet"
          />
        </label>
        {errors.dosage && (
          <p className="mt-1 text-sm text-red-600">{errors.dosage.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Frequency
            <select
              {...register('frequency')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="as-needed">As Needed</option>
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
            <input
              type="time"
              {...register('time')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
            <input
              type="date"
              {...register('startDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date (Optional)
            <input
              type="date"
              {...register('endDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
          <textarea
            {...register('notes')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? 'Saving...' : 'Add Medication'}
      </button>
    </form>
  );
}