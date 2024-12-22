import { auth } from '../firebase';
import type { GrowthEntry, Milestone } from '../../types/growth';

const API_URL = import.meta.env.VITE_WORKER_URL;

export async function fetchGrowthEntries(childId: string): Promise<GrowthEntry[]> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/growth`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch growth entries');
  }
  
  return response.json();
}

export async function createGrowthEntry(
  childId: string,
  entry: Omit<GrowthEntry, 'id' | 'childId' | 'createdBy'>
): Promise<GrowthEntry> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/growth`,
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
    throw new Error('Failed to create growth entry');
  }
  
  return response.json();
}

export async function fetchMilestones(childId: string): Promise<Milestone[]> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/milestones`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch milestones');
  }
  
  return response.json();
}

export async function createMilestone(
  childId: string,
  milestone: Omit<Milestone, 'id' | 'childId' | 'createdBy'>
): Promise<Milestone> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/children/${childId}/milestones`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(milestone),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to create milestone');
  }
  
  return response.json();
}