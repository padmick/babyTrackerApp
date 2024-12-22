export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  photoUrl?: string;
  familyId: string;
  stats?: {
    feedingCount: number;
    journalCount: number;
    lastFeeding?: string;
    lastJournalEntry?: string;
  }
}

export interface DashboardStats {
  totalChildren: number;
  totalEntries: number;
  recentActivities: {
    type: 'feeding' | 'journal';
    childName: string;
    childId: string;
    timestamp: string;
  }[];
} 