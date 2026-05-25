'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import RateLimiter from '@/lib/rate-limiter';
import { sanitizeInput, isValidEmail, showToast, generateCSRFToken } from '@/lib/security-helpers';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [csrfToken, setCsrfToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setCsrfToken(generateCSRFToken());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && rateLimited) {
      setRateLimited(false);
    }
    return () => clearInterval(interval);
  }, [countdown, rateLimited]);

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check (max 5 attempts per 60 seconds)
    if (!RateLimiter.check('login', 5, 60000)) {
      setRateLimited(true);
      setCountdown(60);
      showToast('Too many login attempts. Please wait.', 'error');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);
      
      await login(sanitizedEmail, sanitizedPassword);
      showToast('Login successful!', 'success');
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
      showToast('Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-1">
          {/* Left Panel - Brand */}
          <div className="hidden lg:flex bg-[#111111] p-8 md:p-12 flex-col justify-center items-center text-center border-r border-white/5">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4 md:mb-6 tracking-widest uppercase">Majestic Hub</h2>
            <p className="text-foreground/60 font-sans text-xs uppercase tracking-[0.3em] leading-relaxed max-w-xs mb-6 md:mb-8">
              &quot;Fashion is not something that exists in dresses only. Fashion is in the sky, in the street.&quot;
            </p>
            <p className="text-foreground/40 font-sans text-[10px] uppercase tracking-widest">
              — Coco Chanel
            </p>
          </div>

          {/* Right Panel - Form */}
          <div className="bg-background p-6 md:p-8 lg:p-12">
            <h1 className="text-3xl font-serif text-foreground mb-2">Sign In</h1>
            <p className="text-foreground/60 font-sans text-xs uppercase tracking-[0.3em] mb-8">
              Join thousands of fashion lovers in Warri
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm font-sans">{error}</p>
                </div>
              )}

              {rateLimited && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm font-sans">
                    Too many attempts. Please wait {countdown} seconds.
                  </p>
                </div>
              )}

              <input type="hidden" name="csrf_token" value={csrfToken} />

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-primary uppercase tracking-[0.2em] mb-2 font-sans">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border ${emailError ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground font-sans text-sm transition-colors`}
                  placeholder="you@example.com"
                  disabled={rateLimited}
                />
                {emailError && <p className="text-red-400 text-[10px] mt-1 font-sans uppercase tracking-widest">{emailError}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-primary uppercase tracking-[0.2em] mb-2 font-sans">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border ${passwordError ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground font-sans text-sm transition-colors pr-12`}
                    placeholder="••••••••"
                    disabled={rateLimited}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {passwordError && <p className="text-red-400 text-[10px] mt-1 font-sans uppercase tracking-widest">{passwordError}</p>}
              </div>

              <div className="flex justify-between items-center">
                <Link href="#" className="text-[10px] uppercase tracking-widest text-primary hover:text-foreground transition-colors font-sans">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading || rateLimited}
                className="w-full bg-primary text-background py-4 rounded-lg font-semibold hover:bg-foreground hover:text-background disabled:opacity-50 transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.2em]"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm text-foreground/60 mt-8 font-sans">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:text-foreground transition-colors uppercase tracking-widest">
                Sign up
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[10px] text-foreground/40 mb-2 font-sans uppercase tracking-widest">Demo Admin Credentials:</p>
              <p className="text-xs text-foreground/60 font-sans">Email: majestic@gmail.com</p>
              <p className="text-xs text-foreground/60 font-sans">Password: majestic@2026</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
