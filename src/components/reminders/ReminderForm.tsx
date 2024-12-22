import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clock } from 'lucide-react';

const reminderSchema = z.object({
  type: z.enum(['feeding', 'sleep', 'medicine']),
  time: z.string(),
  frequency: z.enum(['once', 'daily', 'weekly']),
  notes: z.string().optional(),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

interface Props {
  onSubmit: (data: ReminderFormData) => void;
  isLoading?: boolean;
}

export default function ReminderForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reminder Type
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="feeding">Feeding</option>
            <option value="sleep">Sleep</option>
            <option value="medicine">Medicine</option>
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
          </select>
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
        {isLoading ? 'Creating...' : 'Create Reminder'}
      </button>
    </form>
  );
}