import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';

export default function NotificationSettings() {
  const { preferences, setPreferences } = useNotifications();

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Bell className="h-6 w-6 text-indigo-600" />
        <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(preferences).map(([key, enabled]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <button
              onClick={() => handleToggle(key as keyof typeof preferences)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                enabled ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}