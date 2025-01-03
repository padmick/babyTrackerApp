import React from 'react';
import { Download } from 'lucide-react';
import { exportChildData } from '../lib/export';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '../hooks/useToast';
import { exportData } from '../utils/export';
import { fetchFeedingEntries } from '../lib/api/feeding';
import { fetchSleepEntries } from '../lib/api/sleep';
import { fetchJournalEntries } from '../lib/api/journal';
import { fetchMedications } from '../lib/api/medication';

interface Props {
  childId: string;
}

export default function ExportButton({ childId }: Props) {
  const toast = useToast();
  const [isExporting, setIsExporting] = React.useState(false);

  const { data: feeding } = useQuery({
    queryKey: ['feeding-entries', childId],
    queryFn: () => fetchFeedingEntries(childId),
  });

  const { data: sleep } = useQuery({
    queryKey: ['sleep-entries', childId],
    queryFn: () => fetchSleepEntries(childId),
  });

  const { data: journal } = useQuery({
    queryKey: ['journal-entries', childId],
    queryFn: () => fetchJournalEntries(childId),
  });

  const { data: medications } = useQuery({
    queryKey: ['medications', childId],
    queryFn: () => fetchMedications(childId),
  });

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportData(childId, {
        feeding: feeding || [],
        sleep: sleep || [],
        journal: journal || [],
        medications: medications || [],
      });
      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Download className="h-4 w-4 mr-2" />
      {isExporting ? 'Exporting...' : 'Export Data'}
    </button>
  );
}