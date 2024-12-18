export interface User {
  id: string;
  email: string;
  displayName: string;
  families: string[];
}

export interface Child {
  id: string;
  familyId: string;
  name: string;
  dateOfBirth: string;
  photoUrl?: string;
}

export interface FeedingEntry {
  id: string;
  childId: string;
  startTime: string;
  endTime: string;
  type: 'breast' | 'bottle' | 'solids';
  amount?: number;
  notes?: string;
  createdBy: string;
}

export interface SleepEntry {
  id: string;
  childId: string;
  startTime: string;
  endTime: string;
  location: string;
  quality?: number;
  notes?: string;
  createdBy: string;
}

export interface JournalEntry {
  id: string;
  childId: string;
  date: string;
  mood: 'happy' | 'neutral' | 'sad' | 'sick';
  milestone?: string;
  notes?: string;
  photoUrls?: string[];
  createdBy: string;
}

export interface Task {
  id: string;
  familyId: string;
  title: string;
  description?: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  createdBy: string;
}