import { auth } from '../firebase';
import type { SleepEntry } from '../../types';

const API_URL = import.meta.env.VITE_WORKER_URL;

/**
 * Fetches sleep entries for a specific child
 */
export async function fetchSleepEntries(childId: string): Promise<SleepEntry[]> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/sleep`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch sleep entries');
  }
  
  return response.json();
}

/**
 * Creates a new sleep entry
 */
export async function createSleepEntry(
  childId: string,
  entry: Omit<SleepEntry, 'id' | 'childId' | 'createdBy'>
): Promise<SleepEntry> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/sleep`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to create sleep entry');
  }
  
  return response.json();
}