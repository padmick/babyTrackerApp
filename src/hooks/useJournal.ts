import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJournalEntry } from '../lib/api/journal';
import type { JournalEntry } from '../types';

export function useJournal(childId: string) {
  const queryClient = useQueryClient();
  
  const createEntry = useMutation({
    mutationFn: ({ entry, photos }: {
      entry: Omit<JournalEntry, 'id' | 'childId' | 'createdBy' | 'photoUrls'>;
      photos?: File[];
    }) => createJournalEntry(childId, entry, photos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal-entries', childId] });
    },
  });
  
  return {
    createEntry,
  };
}