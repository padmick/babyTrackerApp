import React from 'react';
import { format } from 'date-fns';
import { Pill, Clock, Calendar } from 'lucide-react';
import type { Medication } from '../../types';

interface Props {
  medications: Medication[];
  isLoading: boolean;
}

export default function MedicationList({ medications, isLoading }: Props) {
  if (isLoading) {
    return <div>Loading medications...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
      {medications.map((medication) => (
        <div key={medication.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Pill className="h-5 w-5 text-indigo-500" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {medication.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {medication.dosage}
                </p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              medication.frequency === 'daily' ? 'bg-green-100 text-green-800' :
              medication.frequency === 'weekly' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {medication.frequency}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              {medication.time}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              {format(new Date(medication.startDate), 'MMM d, yyyy')}
              {medication.endDate && ` - ${format(new Date(medication.endDate), 'MMM d, yyyy')}`}
            </div>
          </div>

          {medication.notes && (
            <p className="mt-4 text-sm text-gray-500">{medication.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}