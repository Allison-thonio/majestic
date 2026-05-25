'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import RateLimiter from '@/lib/rate-limiter';
import { sanitizeInput, isValidEmail, isValidNigerianPhone, calculatePasswordStrength, showToast, generateCSRFToken } from '@/lib/security-helpers';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [csrfToken, setCsrfToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const passwordStrength = calculatePasswordStrength(password);

  const validateForm = (): boolean => {
    let isValid = true;
    setFullNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!fullName) {
      setFullNameError('Full name is required');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!isValidNigerianPhone(phone)) {
      setPhoneError('Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!termsAccepted) {
      setError('You must accept the terms and conditions');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check (max 3 attempts per 60 seconds)
    if (!RateLimiter.check('signup', 3, 60000)) {
      setRateLimited(true);
      setCountdown(60);
      showToast('Too many sign-up attempts. Please wait.', 'error');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      const sanitizedFullName = sanitizeInput(fullName);
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPhone = sanitizeInput(phone);
      const sanitizedPassword = sanitizeInput(password);
      
      await signup(sanitizedEmail, sanitizedPassword);
      showToast('Account created successfully!', 'success');
      router.push('/');
    } catch (err) {
      setError('Failed to create account. Please try again.');
      showToast('Account creation failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-1">
          {/* Left Panel - Form */}
          <div className="bg-background p-6 md:p-8 lg:p-12 order-2 lg:order-1">
            <h1 className="text-3xl font-serif text-foreground mb-2">Create Account</h1>
            <p className="text-foreground/60 font-sans text-xs uppercase tracking-[0.3em] mb-8">
              Join our fashion community in Warri
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <label htmlFor="fullName" className="block text-xs font-medium text-primary uppercase tracking-[0.2em] mb-2 font-sans">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border ${fullNameError ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground font-sans text-sm transition-colors`}
                  placeholder="John Doe"
                  disabled={rateLimited}
                />
                {fullNameError && <p className="text-red-400 text-[10px] mt-1 font-sans uppercase tracking-widest">{fullNameError}</p>}
              </div>

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
                <label htmlFor="phone" className="block text-xs font-medium text-primary uppercase tracking-[0.2em] mb-2 font-sans">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border ${phoneError ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground font-sans text-sm transition-colors`}
                  placeholder="08012345678"
                  disabled={rateLimited}
                />
                {phoneError && <p className="text-red-400 text-[10px] mt-1 font-sans uppercase tracking-widest">{phoneError}</p>}
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
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1 h-1">
                      <div className={`flex-1 rounded-full ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'fair' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                      <div className={`flex-1 rounded-full ${passwordStrength === 'fair' || passwordStrength === 'strong' ? 'bg-yellow-500' : 'bg-white/10'}`} />
                      <div className={`flex-1 rounded-full ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-white/10'}`} />
                    </div>
                    <p className="text-[10px] mt-1 font-sans uppercase tracking-widest text-foreground/40">
                      Password strength: {passwordStrength}
                    </p>
                  </div>
                )}
                {passwordError && <p className="text-red-400 text-[10px] mt-1 font-sans uppercase tracking-widest">{passwordError}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-primary uppercase tracking-[0.2em] mb-2 font-sans">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-3 bg-white/5 border ${confirmPasswordError ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground font-sans text-sm transition-colors pr-12`}
                    placeholder="••••••••"
                    disabled={rateLimited}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {confirmPasswordError && <p className="text-red-400 text-[10px] mt-1 font-sans uppercase tracking-widest">{confirmPasswordError}</p>}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-white/5 border-white/10 rounded focus:ring-primary"
                  disabled={rateLimited}
                />
                <label htmlFor="terms" className="text-xs text-foreground/60 font-sans">
                  I accept the{' '}
                  <Link href="#" className="text-primary hover:text-foreground transition-colors">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || rateLimited}
                className="w-full bg-primary text-background py-4 rounded-lg font-semibold hover:bg-foreground hover:text-background disabled:opacity-50 transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.2em]"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-foreground/60 mt-8 font-sans">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:text-foreground transition-colors uppercase tracking-widest">
                Sign in
              </Link>
            </p>
          </div>

          {/* Right Panel - Brand */}
          <div className="hidden lg:flex bg-[#111111] p-8 md:p-12 flex-col justify-center items-center text-center border-l border-white/5 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4 md:mb-6 tracking-widest uppercase">Majestic Hub</h2>
            <p className="text-foreground/60 font-sans text-xs uppercase tracking-[0.3em] leading-relaxed max-w-xs mb-6 md:mb-8">
              &quot;Style is a way to say who you are without having to speak.&quot;
            </p>
            <p className="text-foreground/40 font-sans text-[10px] uppercase tracking-widest">
              — Rachel Zoe
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
