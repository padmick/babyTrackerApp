import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckSquare, Plus } from 'lucide-react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from '../lib/api/tasks';
import { useAuth } from '../hooks/useAuth';

export default function Tasks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = React.useState(false);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', user?.families[0]],
    queryFn: () => fetchTasks(user?.families[0] || ''),
    enabled: !!user?.families[0],
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setShowForm(false);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckSquare className="h-6 w-6 text-gray-400" />
          <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <TaskForm
            onSubmit={createMutation.mutate}
            isLoading={createMutation.isPending}
            familyMembers={[
              { id: user?.id || '', name: user?.displayName || 'Me' },
              // Add partner if available
            ]}
          />
        </div>
      )}

      <TaskList
        tasks={tasks || []}
        isLoading={isLoading}
        onStatusChange={(taskId, status) =>
          updateStatusMutation.mutate({ taskId, status })
        }
        onDelete={(taskId) => deleteMutation.mutate(taskId)}
      />
    </div>
  );
}