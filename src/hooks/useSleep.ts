import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSleepEntry } from '../lib/api/sleep';
import type { SleepEntry } from '../types';

export function useSleep(childId: string) {
  const queryClient = useQueryClient();
  
  const createEntry = useMutation({
    mutationFn: (entry: Omit<SleepEntry, 'id' | 'childId' | 'createdBy'>) =>
      createSleepEntry(childId, entry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sleep-entries', childId] });
    },
  });
  
  return {
    createEntry,
  };
}