import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFeedingEntry } from '../lib/api/feeding';
import type { FeedingEntry } from '../types';

export function useFeeding(childId: string) {
  const queryClient = useQueryClient();
  
  const createEntry = useMutation({
    mutationFn: (entry: Omit<FeedingEntry, 'id' | 'childId' | 'createdBy'>) =>
      createFeedingEntry(childId, entry),
    onSuccess: () => {
      // Invalidate and refetch feeding entries
      queryClient.invalidateQueries({ queryKey: ['feeding-entries', childId] });
    },
  });
  
  return {
    createEntry,
  };
}