
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif tracking-widest text-foreground uppercase">
            Majestic Hub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-12 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-foreground/70 hover:text-primary transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em]">
              Collections
            </Link>
            <Link href="/about" className="text-foreground/70 hover:text-primary transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em]">
              About
            </Link>
            <Link href="/archive" className="text-foreground/70 hover:text-primary transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em]">
              Archive
            </Link>
            {/* Admin link — only visible when logged in as admin */}
            {isAdmin && (
              <Link href="/admin" className="text-primary/80 hover:text-primary transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em]">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/cart"
              className="p-2 hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
            {user ? (
              <Link
                href={isAdmin ? '/admin' : '/'}
                className="w-8 h-8 bg-primary/15 rounded-full flex items-center justify-center text-primary font-semibold text-sm ring-1 ring-primary/20 hover:bg-primary/25 transition-colors"
                title={user.email}
              >
                {user.email[0].toUpperCase()}
              </Link>
            ) : (
              <Link
                href="/login"
                className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile/Tablet Actions */}
          <div className="lg:hidden flex items-center gap-4">
            <Link
              href="/cart"
              className="p-2 hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-8 space-y-6 animate-in slide-in-from-top duration-300">
            <Link
              href="/"
              className="block text-center text-foreground/70 hover:text-primary font-sans text-sm uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="block text-center text-foreground/70 hover:text-primary font-sans text-sm uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/archive"
              className="block text-center text-foreground/70 hover:text-primary font-sans text-sm uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              Archive
            </Link>
            {/* Admin link — only visible when logged in as admin (mobile) */}
            {isAdmin && (
              <Link
                href="/admin"
                className="block text-center text-primary/80 hover:text-primary font-sans text-sm uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="flex justify-center pt-4 border-t border-white/10 gap-8">
              {user ? (
                <span className="font-sans text-xs uppercase tracking-widest text-foreground/70">
                  {user.email}
                </span>
              ) : (
                <Link
                  href="/login"
                  className="font-sans text-xs uppercase tracking-widest text-foreground/70"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
