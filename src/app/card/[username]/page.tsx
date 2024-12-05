'use client';

import { use } from 'react';
import Link from 'next/link';
import ContactForm from './ContactForm';
import { useState } from 'react';
import { kv } from '@vercel/kv'

type Props = {
  params: {
    username: string;
  };
};

async function getBusinessCard(username: string) {
  try {
    const card = await kv.get(`card:${username}`)
    if (!card) {
      throw new Error('Business card not found')
    }
    return card
  } catch (error) {
    console.error('Error fetching business card:', error)
    throw error
  }
}

export default async function BusinessCard({ params }: Props) {
  try {
    const businessCard = await getBusinessCard(params.username)
    
    const [showForm, setShowForm] = useState(false);

    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header/Avatar Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-center">
              <img
                src={businessCard.avatar}
                alt={businessCard.name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
              />
              <h1 className="text-2xl font-bold text-white mt-4">
                {businessCard.name}
              </h1>
              <p className="text-blue-100">
                {businessCard.title} at {businessCard.company}
              </p>
            </div>

            {/* Contact Information */}
            <div className="px-6 py-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${businessCard.email}`} className="text-blue-600 hover:underline">
                    {businessCard.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${businessCard.phone}`} className="text-blue-600 hover:underline">
                    {businessCard.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <a href={businessCard.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href={businessCard.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    GitHub Profile
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-600">{businessCard.bio}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect
            </button>
            <Link href="/" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              Back to Home
            </Link>
          </div>

          {/* Contact Form Modal */}
          {showForm && (
            <ContactForm onClose={() => setShowForm(false)} client={params.username} />
          )}
        </div>
      </main>
    );
  } catch (error) {
    // Handle error state appropriately
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Business card not found</p>
      </div>
    )
  }
}