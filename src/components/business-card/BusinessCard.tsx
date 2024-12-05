import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BusinessCardData } from '@/types/business-card';
import SocialLinks from './SocialLinks';
import ContactForm from './ContactForm';

interface BusinessCardProps {
  data: BusinessCardData;
  className?: string;
}

export default function BusinessCard({ data, className = '' }: BusinessCardProps) {
  const {
    photo,
    name,
    title,
    bio,
    contacts,
    socialLinks,
    theme = {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      fontFamily: 'Inter',
      layout: 'vertical'
    }
  } = data;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div 
        className={`business-card rounded-2xl shadow-2xl overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          '--primary-color': theme.primaryColor,
          '--secondary-color': theme.secondaryColor,
          '--font-family': theme.fontFamily,
        } as React.CSSProperties}
      >
        <div className={`grid ${theme.layout === 'vertical' ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
          {/* Profile Section */}
          <div className="p-8 bg-white">
            <div className="text-center mb-6">
              {photo && (
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              {title && (
                <h2 className="text-xl text-gray-600 mt-2">{title}</h2>
              )}
            </div>

            {bio && (
              <p className="text-gray-600 text-center mb-6">{bio}</p>
            )}

            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-center space-x-2">
                  {contact.icon && (
                    <span className={`text-xl ${contact.icon}`} />
                  )}
                  <span className="text-gray-700">{contact.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <SocialLinks links={socialLinks} />
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="p-8 bg-gray-50">
            <ContactForm cardId={data.id} />
          </div>
        </div>
      </motion.div>

      {/* Generate Your Own Card Button */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <a
          href="/signup"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Your Own Card
        </a>
      </motion.div>
    </div>
  );
} 