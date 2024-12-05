'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Basic',
    price: '$4',
    features: [
      'Single business card',
      'Basic analytics',
      'Email form',
      'Google Sheets integration',
    ],
    href: '/signup?plan=basic',
  },
  {
    name: 'Professional',
    price: '$9',
    features: [
      'Everything in Basic',
      'Custom domain',
      'Calendar integration',
      'Newsletter integration',
      'Advanced analytics',
    ],
    href: '/signup?plan=professional',
  },
  {
    name: 'Enterprise',
    price: '$24',
    features: [
      'Everything in Professional',
      'Multiple business cards',
      'Priority support',
      'Custom branding',
      'API access',
    ],
    href: '/signup?plan=enterprise',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Digital Business Card
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create and share your professional profile in minutes
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Personalized Landing Page</h3>
              <ul className="space-y-2">
                <li>Professional photo display</li>
                <li>Resume highlights</li>
                <li>Contact information</li>
                <li>Social media integration</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Smart Contact Management</h3>
              <ul className="space-y-2">
                <li>Custom email form</li>
                <li>Google Contacts integration</li>
                <li>Calendar scheduling</li>
                <li>Newsletter subscription</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Site Generation</h3>
              <ul className="space-y-2">
                <li>Custom domain support</li>
                <li>Easy-to-use templates</li>
                <li>Mobile-responsive design</li>
                <li>Analytics dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-lg">/month</span></p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start 14-Day Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
