import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield } from 'lucide-react';
import NotificationSettings from '../components/settings/NotificationSettings';
import { useAuth } from '../hooks/useAuth';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="h-6 w-6 text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-900">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={user?.displayName || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                readOnly
              />
            </div>
          </div>
        </div>

        <NotificationSettings />

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-900">Privacy</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Share data with partner
              </span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}