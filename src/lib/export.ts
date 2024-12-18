import { auth } from './firebase';
import type { FeedingEntry, SleepEntry, JournalEntry } from '../types';

const API_URL = import.meta.env.VITE_WORKER_URL;

/**
 * Exports all data for a child in CSV format
 */
export async function exportChildData(childId: string): Promise<void> {
  const token = await auth.currentUser?.getIdToken();
  
  // Fetch all data types
  const [feeding, sleep, journal] = await Promise.all([
    fetch(`${API_URL}/api/children/${childId}/feeding`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()) as Promise<FeedingEntry[]>,
    fetch(`${API_URL}/api/children/${childId}/sleep`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()) as Promise<SleepEntry[]>,
    fetch(`${API_URL}/api/children/${childId}/journal`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json()) as Promise<JournalEntry[]>,
  ]);

  // Create CSV content for each type
  const feedingCsv = convertToCSV(feeding, [
    'startTime', 'endTime', 'type', 'amount', 'notes'
  ]);
  const sleepCsv = convertToCSV(sleep, [
    'startTime', 'endTime', 'location', 'quality', 'notes'
  ]);
  const journalCsv = convertToCSV(journal, [
    'date', 'mood', 'milestone', 'notes'
  ]);

  // Create a zip file containing all CSVs
  const zip = new JSZip();
  zip.file('feeding.csv', feedingCsv);
  zip.file('sleep.csv', sleepCsv);
  zip.file('journal.csv', journalCsv);

  // Generate and download the zip file
  const content = await zip.generateAsync({ type: 'blob' });
  const url = window.URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = `child-data-${childId}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Converts an array of objects to CSV format
 */
function convertToCSV<T>(data: T[], headers: (keyof T)[]): string {
  const csvRows = [headers.join(',')];
  
  for (const item of data) {
    const values = headers.map(header => {
      const value = item[header];
      return typeof value === 'string' ? `"${value}"` : value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
}