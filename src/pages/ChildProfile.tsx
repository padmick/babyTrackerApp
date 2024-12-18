import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Baby, Bottle, Moon, Book } from 'lucide-react';
import { fetchChild, fetchLatestEntries } from '../lib/api';

export default function ChildProfile() {
  const { id } = useParams<{ id: string }>();
  const { data: child, isLoading: childLoading } = useQuery({
    queryKey: ['child', id],
    queryFn: () => fetchChild(id!),
    enabled: !!id,
  });

  const { data: latestEntries } = useQuery({
    queryKey: ['latest-entries', id],
    queryFn: () => fetchLatestEntries(id!),
    enabled: !!id,
  });

  if (childLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {child?.photoUrl ? (
            <img
              src={child.photoUrl}
              alt={child.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <Baby className="h-8 w-8 text-indigo-600" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{child?.name}</h1>
            <p className="text-sm text-gray-500">
              Born {new Date(child?.dateOfBirth || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Link
          to={`/child/${id}/feeding`}
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <Bottle className="h-6 w-6 text-indigo-600" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Feeding</h2>
              <p className="text-sm text-gray-500">
                Last: {latestEntries?.feeding?.startTime
                  ? new Date(latestEntries.feeding.startTime).toLocaleTimeString()
                  : 'No entries'}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to={`/child/${id}/sleep`}
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <Moon className="h-6 w-6 text-indigo-600" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Sleep</h2>
              <p className="text-sm text-gray-500">
                Last: {latestEntries?.sleep?.startTime
                  ? new Date(latestEntries.sleep.startTime).toLocaleTimeString()
                  : 'No entries'}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to={`/child/${id}/journal`}
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <Book className="h-6 w-6 text-indigo-600" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Journal</h2>
              <p className="text-sm text-gray-500">
                Last: {latestEntries?.journal?.date
                  ? new Date(latestEntries.journal.date).toLocaleDateString()
                  : 'No entries'}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}