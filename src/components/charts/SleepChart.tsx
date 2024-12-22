import React from 'react';
import { Line } from 'react-chartjs-2';
import { SleepEntry } from '../../types';
import { formatDateTime } from '../../utils/date';

interface Props {
  entries: SleepEntry[];
  days?: number;
}

export default function SleepChart({ entries, days = 7 }: Props) {
  const filteredEntries = entries
    .filter(entry => {
      const date = new Date(entry.startTime);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return date >= cutoff;
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const data = {
    labels: filteredEntries.map(entry => formatDateTime(entry.startTime)),
    datasets: [
      {
        label: 'Sleep Duration (hours)',
        data: filteredEntries.map(entry => {
          const start = new Date(entry.startTime);
          const end = new Date(entry.endTime);
          return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }),
        borderColor: 'rgb(79, 70, 229)',
        tension: 0.1,
      },
      {
        label: 'Sleep Quality',
        data: filteredEntries.map(entry => entry.quality || 0),
        borderColor: 'rgb(234, 179, 8)',
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
              beginAtZero: true,
              max: 12,
            },
          },
        }}
      />
    </div>
  );
}