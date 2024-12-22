import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Ruler } from 'lucide-react';
import GrowthForm from '../components/growth/GrowthForm';
import GrowthChart from '../components/growth/GrowthChart';
import { fetchGrowthEntries } from '../lib/api/growth';

export default function Growth() {
  const { id: childId } = useParams<{ id: string }>();
  const { data: entries, isLoading } = useQuery({
    queryKey: ['growth-entries', childId],
    queryFn: () => fetchGrowthEntries(childId!),
    enabled: !!childId,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Ruler className="h-6 w-6 text-gray-400" />
          <h1 className="text-2xl font-semibold text-gray-900">Growth Tracking</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <GrowthForm />
        </div>
        
        <div className="space-y-6">
          <GrowthChart entries={entries || []} metric="weight" />
          <GrowthChart entries={entries || []} metric="height" />
          <GrowthChart entries={entries || []} metric="headCircumference" />
        </div>
      </div>
    </div>
  );
}