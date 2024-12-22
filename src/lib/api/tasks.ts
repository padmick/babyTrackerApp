import { auth } from '../firebase';
import type { Task } from '../../types';

const API_URL = import.meta.env.VITE_WORKER_URL;

export async function fetchTasks(familyId: string): Promise<Task[]> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/families/${familyId}/tasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  
  return response.json();
}

export async function createTask(
  familyId: string,
  task: Omit<Task, 'id' | 'familyId' | 'createdBy' | 'status'>
): Promise<Task> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/families/${familyId}/tasks`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task, status: 'pending' }),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  
  return response.json();
}

export async function updateTaskStatus(
  familyId: string,
  taskId: string,
  status: Task['status']
): Promise<Task> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/families/${familyId}/tasks/${taskId}/status`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to update task status');
  }
  
  return response.json();
}

export async function deleteTask(familyId: string, taskId: string): Promise<void> {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(
    `${API_URL}/api/families/${familyId}/tasks/${taskId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
} 