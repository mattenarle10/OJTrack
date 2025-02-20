// src/app/auth/page.tsx (Client-side component)
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'signIn' | 'signUp'>('signIn');
  const router = useRouter();

  const handleGoogleResponse = async (response: any) => {
    const token = response.credential;

    if (!token) {
      console.error('Google authentication failed');
      return;
    }

    try {
      const res = await fetch('/auth/google', {  // Call your server-side route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Get error message from server
        throw new Error(errorData.error || 'Authentication failed');
      }

      // Successful login! Redirect. The cookie is set by the server.
      router.push('/dashboard'); 

    } catch (error) {
      console.error('Google authentication error:', error);
      // Display error to the user (e.g., using a state variable)
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="z-10 w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl flex"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side: Logo */}
        <div className="w-1/2 p-6 flex flex-col justify-center items-center">
          <motion.img
            src="/images/Logo2-OJTrack.png"
            alt="OJTrack Logo"
            className="max-w-full max-h-[250px] object-contain mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Right Side: Login / Signup Section */}
        <div className="w-1/2 p-6 bg-gray-50 rounded-r-2xl shadow-xl flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8 text-center">
            Get Started with OJTrack
          </h2>

          {/* Tabs */}
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setActiveTab('signIn')}
              className={`w-1/2 py-2 text-sm font-medium rounded-[var(--border-radius)] transition ${
                activeTab === 'signIn'
                  ? 'bg-[var(--primary)] text-[var(--background)]'
                  : 'bg-transparent text-[var(--secondary)] hover:text-[var(--primary)]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signUp')}
              className={`w-1/2 py-2 text-sm font-medium rounded-[var(--border-radius)] transition ${
                activeTab === 'signUp'
                  ? 'bg-[var(--primary)] text-[var(--background)]'
                  : 'bg-transparent text-[var(--secondary)] hover:text-[var(--primary)]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'signIn' && (
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Sign In
                </button>
              </form>
            )}

            {activeTab === 'signUp' && (
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-700 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Sign Up
                </button>
              </form>
            )}

            {/* Google Login Button */}
            <div className="mt-4">
              <GoogleLogin
                onSuccess={handleGoogleResponse}
                onError={() => console.log('Google login failed')}
                theme="outline"
                shape="pill"
                useOneTap
                text="signin_with"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
