import React from 'react';
import { Download } from 'lucide-react';
import { exportChildData } from '../lib/export';

interface Props {
  childId: string;
}

export default function ExportButton({ childId }: Props) {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportChildData(childId);
    } catch (error) {
      console.error('Failed to export data:', error);
      // TODO: Show error toast
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Download className="h-4 w-4 mr-2" />
      {isExporting ? 'Exporting...' : 'Export Data'}
    </button>
  );
}