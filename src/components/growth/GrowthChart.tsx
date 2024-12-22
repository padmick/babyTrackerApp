import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import type { GrowthEntry } from '../../types/growth';

interface Props {
  entries: GrowthEntry[];
  metric: 'weight' | 'height' | 'headCircumference';
}

export default function GrowthChart({ entries, metric }: Props) {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sortedEntries.map(entry => format(new Date(entry.date), 'MMM d, yyyy')),
    datasets: [
      {
        label: metric === 'weight' ? 'Weight (kg)' : metric === 'height' ? 'Height (cm)' : 'Head Circumference (cm)',
        data: sortedEntries.map(entry => entry[metric]),
        borderColor: 'rgb(79, 70, 229)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line
        data={data}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        }}
      />
    </div>
  );
}