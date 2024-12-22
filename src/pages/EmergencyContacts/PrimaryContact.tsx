import React from 'react';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import type { EmergencyContact } from '../../types';

interface Props {
  contact?: EmergencyContact;
}

export default function PrimaryContact({ contact }: Props) {
  if (!contact) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <Star className="h-8 w-8 text-gray-400 mx-auto" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">No Primary Contact</h2>
          <p className="mt-1 text-sm text-gray-500">
            Add an emergency contact and mark them as primary
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Star className="h-6 w-6 text-yellow-400" fill="currentColor" />
        <h2 className="text-lg font-medium text-gray-900">Primary Contact</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medium text-gray-900">{contact.name}</h3>
          <p className="text-sm text-gray-500">{contact.relationship}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 text-gray-400 mr-2" />
            <a href={`tel:${contact.phone}`} className="text-indigo-600 hover:text-indigo-800">
              {contact.phone}
            </a>
          </div>

          {contact.email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 text-gray-400 mr-2" />
              <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:text-indigo-800">
                {contact.email}
              </a>
            </div>
          )}

          {contact.address && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
              {contact.address}
            </div>
          )}
        </div>

        {contact.notes && (
          <p className="text-sm text-gray-500 border-t pt-4">{contact.notes}</p>
        )}
      </div>
    </div>
  );
}