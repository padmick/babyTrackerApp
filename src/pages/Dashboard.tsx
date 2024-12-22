import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Baby, Plus } from 'lucide-react';
import { fetchChildren } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: children, isLoading } = useQuery({
    queryKey: ['children', user?.families?.[0]],
    queryFn: async () => {
      const result = await fetchChildren(user?.families?.[0] || '');
      console.log('Fetched children:', result);
      return result;
    },
    enabled: !!user?.families?.[0],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!children?.length) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Family Tracker</h1>
        <p className="text-gray-500 mb-6">Get started by adding your first child</p>
        <Link
          to="/child/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Child
        </Link>
      </div>
    );
  }

  const totalEntries = children?.reduce((sum, child) => 
    sum + (child.stats?.feedingCount || 0) + (child.stats?.journalCount || 0), 0
  ) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            {children?.length} children · {totalEntries} total entries
          </p>
        </div>
        <Link
          to="/child/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Child
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {children?.map((child) => (
          <Link
            key={child.id}
            to={`/child/${child.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center space-x-3">
                {child.photoUrl ? (
                  <img
                    src={child.photoUrl}
                    alt={child.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Baby className="h-6 w-6 text-indigo-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{child.name}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(child.dateOfBirth).toLocaleDateString()}
                  </p>
                  {child.stats && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{child.stats.feedingCount} feedings</p>
                      <p>{child.stats.journalCount} journal entries</p>
                      {child.stats.lastFeeding && (
                        <p>Last feeding: {new Date(child.stats.lastFeeding).toLocaleTimeString()}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}