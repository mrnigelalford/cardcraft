import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactFormData } from '@/types/business-card';

interface ContactFormProps {
  cardId: string;
  onSuccess?: () => void;
}

export default function ContactForm({ cardId, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    subscribeNewsletter: false,
    requestMeeting: false,
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null as string | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cardId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          submitting: false,
          submitted: true,
          error: null,
        });
        
        setFormData({
          name: '',
          email: '',
          message: '',
          subscribeNewsletter: false,
          requestMeeting: false,
        });

        onSuccess?.();

        // Handle calendar redirect if meeting requested
        if (formData.requestMeeting && data.calendarLink) {
          window.open(data.calendarLink, '_blank');
        }
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.subscribeNewsletter}
              onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
            />
            <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
              Subscribe to newsletter
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="meeting"
              name="meeting"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.requestMeeting}
              onChange={(e) => setFormData({ ...formData, requestMeeting: e.target.checked })}
            />
            <label htmlFor="meeting" className="ml-2 block text-sm text-gray-700">
              Schedule a coffee chat
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={status.submitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {status.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {status.error && (
          <div className="text-red-600 text-sm mt-2">
            {status.error}
          </div>
        )}

        {status.submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 text-sm mt-2"
          >
            Message sent successfully!
          </motion.div>
        )}
      </form>
    </motion.div>
  );
} 