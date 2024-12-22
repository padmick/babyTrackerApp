import React from 'react';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import type { EmergencyContact } from '../../types';
import { useContacts } from '../../hooks/useContacts';

interface Props {
  contacts: EmergencyContact[];
  isLoading: boolean;
}

export default function ContactList({ contacts, isLoading }: Props) {
  const { deleteContact } = useContacts();

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
      {contacts.map((contact) => (
        <div key={contact.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {contact.isPrimary && (
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {contact.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {contact.relationship}
                </p>
              </div>
            </div>
            <button
              onClick={() => deleteContact(contact.id)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              <a href={`tel:${contact.phone}`} className="hover:text-indigo-600">
                {contact.phone}
              </a>
            </div>
            {contact.email && (
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${contact.email}`} className="hover:text-indigo-600">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.address && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {contact.address}
              </div>
            )}
          </div>

          {contact.notes && (
            <p className="mt-4 text-sm text-gray-500">{contact.notes}</p>
          )}
        </div>
      ))}

      {contacts.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No emergency contacts added yet
        </div>
      )}
    </div>
  );
}