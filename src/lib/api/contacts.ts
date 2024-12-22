import { auth } from '../firebase';
import type { EmergencyContact } from '../../types';

const API_URL = import.meta.env.VITE_WORKER_URL;

export async function fetchEmergencyContacts(familyId: string): Promise<EmergencyContact[]> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/families/${familyId}/contacts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch emergency contacts');
  }
  
  return response.json();
}

export async function createEmergencyContact(
  familyId: string,
  contact: Omit<EmergencyContact, 'id' | 'familyId' | 'createdBy'>
): Promise<EmergencyContact> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/families/${familyId}/contacts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to create emergency contact');
  }
  
  return response.json();
}

export async function updateEmergencyContact(
  contactId: string,
  updates: Partial<EmergencyContact>
): Promise<EmergencyContact> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/contacts/${contactId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to update emergency contact');
  }
  
  return response.json();
}

export async function deleteEmergencyContact(contactId: string): Promise<void> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/contacts/${contactId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to delete emergency contact');
  }
}