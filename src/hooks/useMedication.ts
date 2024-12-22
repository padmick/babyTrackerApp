import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMedication, updateMedication, deleteMedication } from '../lib/api/medication';
import type { Medication } from '../types';

export function useMedication(childId: string) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: Omit<Medication, 'id' | 'childId' | 'createdBy'>) =>
      createMedication(childId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications', childId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<Medication>) =>
      updateMedication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications', childId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications', childId] });
    },
  });

  return {
    createMedication: createMutation.mutate,
    updateMedication: updateMutation.mutate,
    deleteMedication: deleteMutation.mutate,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}