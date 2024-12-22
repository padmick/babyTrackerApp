import React from 'react';
import { format, startOfToday, endOfToday } from 'date-fns';
import { Clock } from 'lucide-react';
import type { Medication } from '../../types';

interface Props {
  medications: Medication[];
}

export default function MedicationSchedule({ medications }: Props) {
  const today = startOfToday();
  const todayEnd = endOfToday();

  const scheduledMedications = medications
    .filter(med => {
      const startDate = new Date(med.startDate);
      const endDate = med.endDate ? new Date(med.endDate) : null;
      return startDate <= todayEnd && (!endDate || endDate >= today);
    })
    .sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
      const timeB = new Date(`1970/01/01 ${b.time}`).getTime();
      return timeA - timeB;
    });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h2>
      
      <div className="space-y-4">
        {scheduledMedications.map((med) => (
          <div
            key={med.id}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{med.time}</p>
              <p className="text-sm text-gray-500">
                {med.name} - {med.dosage}
              </p>
            </div>
          </div>
        ))}

        {scheduledMedications.length === 0 && (
          <p className="text-sm text-gray-500">No medications scheduled for today</p>
        )}
      </div>
    </div>
  );
}