import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, Baby, Coffee, Moon, Book, CheckSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Layout() {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Children', href: '/children', icon: Baby },
    { name: 'Feeding', href: '/feeding', icon: Coffee },
    { name: 'Sleep', href: '/sleep', icon: Moon },
    { name: 'Journal', href: '/journal', icon: Book },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-indigo-600"
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}