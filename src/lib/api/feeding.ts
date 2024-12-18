import { auth } from '../firebase';
import type { FeedingEntry } from '../../types';

const API_URL = import.meta.env.VITE_WORKER_URL;

/**
 * Fetches feeding entries for a specific child
 * @param childId The ID of the child
 * @returns Promise<FeedingEntry[]>
 */
export async function fetchFeedingEntries(childId: string): Promise<FeedingEntry[]> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/feeding`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch feeding entries');
  }
  
  return response.json();
}

/**
 * Creates a new feeding entry
 * @param childId The ID of the child
 * @param entry The feeding entry data
 * @returns Promise<FeedingEntry>
 */
export async function createFeedingEntry(
  childId: string,
  entry: Omit<FeedingEntry, 'id' | 'childId' | 'createdBy'>
): Promise<FeedingEntry> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/feeding`,
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
    throw new Error('Failed to create feeding entry');
  }
  
  return response.json();
}