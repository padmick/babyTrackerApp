import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSleepEntries } from '../../lib/api/sleep';
import SleepForm from '../../components/forms/SleepForm';
import SleepList from './SleepList';
import SleepStats from './SleepStats';

export default function SleepTracker() {
  const { id: childId } = useParams<{ id: string }>();
  const { data: entries, isLoading } = useQuery({
    queryKey: ['sleep-entries', childId],
    queryFn: () => fetchSleepEntries(childId!),
    enabled: !!childId,
  });

  return (
    <div className="space-y-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h1 className="text-2xl font-semibold text-gray-900">Sleep Tracker</h1>
          <p className="mt-2 text-sm text-gray-500">
            Monitor sleep patterns and quality for better rest.
          </p>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <SleepForm />
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <SleepStats entries={entries || []} />
        </div>
        <div className="md:col-span-2">
          <SleepList entries={entries || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}