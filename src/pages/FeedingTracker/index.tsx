import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFeedingEntries } from '../../lib/api/feeding';
import FeedingForm from '../../components/forms/FeedingForm';
import FeedingList from './FeedingList';
import FeedingStats from './FeedingStats';

export default function FeedingTracker() {
  const { id: childId } = useParams<{ id: string }>();
  const { data: entries, isLoading } = useQuery({
    queryKey: ['feeding-entries', childId],
    queryFn: () => fetchFeedingEntries(childId!),
    enabled: !!childId,
  });

  return (
    <div className="space-y-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h1 className="text-2xl font-semibold text-gray-900">Feeding Tracker</h1>
          <p className="mt-2 text-sm text-gray-500">
            Track feeding times, types, and amounts for your child.
          </p>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <FeedingForm />
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <FeedingStats entries={entries || []} />
        </div>
        <div className="md:col-span-2">
          <FeedingList entries={entries || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}