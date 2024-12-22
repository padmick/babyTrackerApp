import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Phone } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { fetchEmergencyContacts } from '../../lib/api/contacts';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import PrimaryContact from './PrimaryContact';

export default function EmergencyContacts() {
  const { user } = useAuth();
  const { data: contacts, isLoading } = useQuery({
    queryKey: ['emergency-contacts', user?.families[0]],
    queryFn: () => fetchEmergencyContacts(user?.families[0] || ''),
    enabled: !!user?.families[0],
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Phone className="h-6 w-6 text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-900">Emergency Contacts</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactList contacts={contacts || []} isLoading={isLoading} />
        </div>
        <div>
          <PrimaryContact contact={contacts?.find(c => c.isPrimary)} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add Emergency Contact</h2>
        <ContactForm />
      </div>
    </div>
  );
}