'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600 text-sm mb-8">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-gray-900 font-semibold hover:underline">
                Sign up
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Demo Admin Credentials:</p>
              <p className="text-xs text-gray-600">Email: majestic@gmail.com</p>
              <p className="text-xs text-gray-600">Password: majestic@2026</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
