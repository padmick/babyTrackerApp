import { auth } from './firebase';

const API_URL = import.meta.env.VITE_WORKER_URL;

async function handleResponse(response: Response) {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

async function validateParams(params: Record<string, string | undefined>) {
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      throw new Error(`Missing required parameter: ${key}`);
    }
  }
}

export async function fetchChildren(familyId: string) {
  await validateParams({ familyId });
  const response = await fetch(`${API_URL}/api/children?familyId=${familyId}`, {
    headers: await getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function fetchChild(childId: string) {
  await validateParams({ childId });
  const response = await fetch(`${API_URL}/api/children/${childId}`, {
    headers: await getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function fetchLatestEntries(childId: string) {
  await validateParams({ childId });
  const response = await fetch(`${API_URL}/api/children/${childId}/latest`, {
    headers: await getAuthHeaders(),
  });
  return handleResponse(response);
}

export async function invitePartner(email: string) {
  const response = await fetch(`${API_URL}/api/invite`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
}

export async function fetchUserData(userId: string) {
  await validateParams({ userId });
  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error('User not authenticated');
  }
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

async function getAuthHeaders() {
  const token = await auth.currentUser?.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function createChild(familyId: string, child: { name: string; dateOfBirth: string; photoUrl?: string }) {
  await validateParams({ familyId });
  const response = await fetch(`${API_URL}/api/children`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ ...child, familyId }),
  });
  return handleResponse(response);
}

export async function createFamily() {
  const response = await fetch(`${API_URL}/api/families`, {
    method: 'POST',
    headers: await getAuthHeaders(),
  });
  return handleResponse(response);
}