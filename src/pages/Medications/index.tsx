import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Pill } from 'lucide-react';
import { fetchMedications } from '../../lib/api/medication';
import MedicationForm from '../../components/medication/MedicationForm';
import MedicationList from './MedicationList';
import MedicationSchedule from './MedicationSchedule';

export default function Medications() {
  const { id: childId } = useParams<{ id: string }>();
  const { data: medications, isLoading } = useQuery({
    queryKey: ['medications', childId],
    queryFn: () => fetchMedications(childId!),
    enabled: !!childId,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Pill className="h-6 w-6 text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-900">Medications</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MedicationList medications={medications || []} isLoading={isLoading} />
        </div>
        <div>
          <MedicationSchedule medications={medications || []} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add Medication</h2>
        <MedicationForm />
      </div>
    </div>
  );
}