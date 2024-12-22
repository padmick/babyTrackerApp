import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContacts } from '../../hooks/useContacts';

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional(),
  notes: z.string().optional(),
  isPrimary: z.boolean(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { createContact, isLoading } = useContacts();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      isPrimary: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    await createContact(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Relationship
            <input
              type="text"
              {...register('relationship')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="e.g., Grandparent, Doctor"
            />
          </label>
          {errors.relationship && (
            <p className="mt-1 text-sm text-red-600">{errors.relationship.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
            <input
              type="tel"
              {...register('phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="+1234567890"
            />
          </label>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email (Optional)
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address (Optional)
          <textarea
            {...register('address')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes (Optional)
          <textarea
            {...register('notes')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('isPrimary')}
          className="h-4 w-4 text-indigo-600 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Set as primary emergency contact
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? 'Saving...' : 'Add Emergency Contact'}
      </button>
    </form>
  );
}