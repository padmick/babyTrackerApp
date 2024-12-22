import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { createEmergencyContact, deleteEmergencyContact } from '../lib/api/contacts';
import type { EmergencyContact } from '../types';

export function useContacts() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const familyId = user?.families[0];

  const createMutation = useMutation({
    mutationFn: (data: Omit<EmergencyContact, 'id' | 'familyId' | 'createdBy'>) =>
      createEmergencyContact(familyId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergency-contacts', familyId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmergencyContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergency-contacts', familyId] });
    },
  });

  return {
    createContact: createMutation.mutate,
    deleteContact: deleteMutation.mutate,
    isLoading: createMutation.isPending || deleteMutation.isPending,
  };
}