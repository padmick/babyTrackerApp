import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../../lib/api/tasks';
import { useAuth } from '../../hooks/useAuth';
import TaskForm from '../../components/tasks/TaskForm';
import TaskList from '../../components/tasks/TaskList';

export default function Tasks() {
  const { user } = useAuth();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', user?.families[0]],
    queryFn: () => fetchTasks(user?.families[0] || ''),
    enabled: !!user?.families[0],
  });

  return (
    <div className="space-y-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h1 className="text-2xl font-semibold text-gray-900">Family Tasks</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage and track shared responsibilities with your partner.
          </p>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <TaskForm />
        </div>
      </div>

      <div className="mt-8">
        <TaskList tasks={tasks || []} isLoading={isLoading} />
      </div>
    </div>
  );
} 