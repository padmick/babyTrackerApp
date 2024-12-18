// Component for displaying and managing tasks
import React from 'react';
import { Task } from '../../types';
import { CheckSquare, Clock, AlertTriangle } from 'lucide-react';

interface Props {
  tasks: Task[];
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskList({ tasks, onStatusChange, onDelete }: Props) {
  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.status] = [...(acc[task.status] || []), task];
    return acc;
  }, {} as Record<Task['status'], Task[]>);

  const priorityIcons = {
    low: null,
    medium: <Clock className="w-4 h-4 text-yellow-500" />,
    high: <AlertTriangle className="w-4 h-4 text-red-500" />,
  };

  return (
    <div className="space-y-8">
      {(['pending', 'in-progress', 'completed'] as const).map((status) => (
        <div key={status} className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 capitalize">
            {status.replace('-', ' ')}
          </h3>
          
          <div className="space-y-2">
            {(groupedTasks[status] || []).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={(e) =>
                      onStatusChange(task.id, e.target.checked ? 'completed' : 'pending')
                    }
                    className="h-4 w-4 text-indigo-600 rounded"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {task.title}
                      </span>
                      {priorityIcons[task.priority]}
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-500">{task.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}