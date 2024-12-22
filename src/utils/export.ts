import JSZip from 'jszip';
import { format } from 'date-fns';
import type { FeedingEntry, SleepEntry, JournalEntry, Medication } from '../types';

export async function exportData(childId: string, data: {
  feeding: FeedingEntry[];
  sleep: SleepEntry[];
  journal: JournalEntry[];
  medications: Medication[];
}) {
  const zip = new JSZip();

  // Convert data to CSV
  zip.file('feeding.csv', convertToCSV(data.feeding, [
    'startTime', 'endTime', 'type', 'amount', 'notes'
  ]));
  
  zip.file('sleep.csv', convertToCSV(data.sleep, [
    'startTime', 'endTime', 'location', 'quality', 'notes'
  ]));
  
  zip.file('journal.csv', convertToCSV(data.journal, [
    'date', 'mood', 'milestone', 'notes'
  ]));
  
  zip.file('medications.csv', convertToCSV(data.medications, [
    'name', 'dosage', 'frequency', 'time', 'startDate', 'endDate', 'notes'
  ]));

  // Generate and download zip
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = `child-data-${childId}-${format(new Date(), 'yyyy-MM-dd')}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function convertToCSV<T>(data: T[], headers: (keyof T)[]): string {
  const rows = [headers.join(',')];
  
  for (const item of data) {
    const values = headers.map(header => {
      const value = item[header];
      return typeof value === 'string' ? `"${value}"` : value;
    });
    rows.push(values.join(','));
  }
  
  return rows.join('\n');
}