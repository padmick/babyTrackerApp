import { auth } from '../firebase';
import type { Medication } from '../../types';

const API_URL = import.meta.env.VITE_WORKER_URL;

export async function fetchMedications(childId: string): Promise<Medication[]> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/medications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch medications');
  }
  
  return response.json();
}

export async function createMedication(
  childId: string,
  medication: Omit<Medication, 'id' | 'childId' | 'createdBy'>
): Promise<Medication> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/medications`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medication),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to create medication');
  }
  
  return response.json();
}

export async function updateMedication(
  medicationId: string,
  updates: Partial<Medication>
): Promise<Medication> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/medications/${medicationId}`,
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
    throw new Error('Failed to update medication');
  }
  
  return response.json();
}

export async function deleteMedication(medicationId: string): Promise<void> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/medications/${medicationId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to delete medication');
  }
}