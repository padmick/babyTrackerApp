// Add these functions to the existing api.ts file

export async function fetchChildren(familyId: string) {
  const response = await fetch(`${API_URL}/api/children?familyId=${familyId}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function fetchChild(childId: string) {
  const response = await fetch(`${API_URL}/api/children/${childId}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function fetchLatestEntries(childId: string) {
  const response = await fetch(`${API_URL}/api/children/${childId}/latest`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function invitePartner(email: string) {
  const response = await fetch(`${API_URL}/api/invite`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ email }),
  });
  return response.json();
}