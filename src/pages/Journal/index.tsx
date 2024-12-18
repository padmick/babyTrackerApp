import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJournalEntries } from '../../lib/api/journal';
import JournalForm from '../../components/forms/JournalForm';
import JournalList from './JournalList';
import JournalCalendar from './JournalCalendar';

export default function Journal() {
  const { id: childId } = useParams<{ id: string }>();
  const { data: entries, isLoading } = useQuery({
    queryKey: ['journal-entries', childId],
    queryFn: () => fetchJournalEntries(childId!),
    enabled: !!childId,
  });

  return (
    <div className="space-y-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h1 className="text-2xl font-semibold text-gray-900">Daily Journal</h1>
          <p className="mt-2 text-sm text-gray-500">
            Track moods, milestones, and memories of your child's journey.
          </p>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <JournalForm />
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <JournalCalendar entries={entries || []} />
        </div>
        <div className="md:col-span-2">
          <JournalList entries={entries || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}