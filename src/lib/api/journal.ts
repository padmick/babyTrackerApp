import { auth } from '../firebase';
import type { JournalEntry } from '../../types';

const API_URL = import.meta.env.VITE_WORKER_URL;

/**
 * Fetches journal entries for a specific child
 */
export async function fetchJournalEntries(childId: string): Promise<JournalEntry[]> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/journal`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch journal entries');
  }
  
  return response.json();
}

/**
 * Creates a new journal entry with photo uploads
 */
export async function createJournalEntry(
  childId: string,
  entry: Omit<JournalEntry, 'id' | 'childId' | 'createdBy' | 'photoUrls'>,
  photos?: File[]
): Promise<JournalEntry> {
  const token = await auth.currentUser?.getIdToken();
  
  // If there are photos, upload them first
  let photoUrls: string[] = [];
  if (photos?.length) {
    const uploadPromises = photos.map(async (photo) => {
      const formData = new FormData();
      formData.append('file', photo);
      
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }
      
      const { url } = await response.json();
      return url;
    });
    
    photoUrls = await Promise.all(uploadPromises);
  }
  
  // Create the journal entry with photo URLs
  const response = await fetch(
    `${API_URL}/api/children/${childId}/journal`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...entry, photoUrls }),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to create journal entry');
  }
  
  return response.json();
}