'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif tracking-widest uppercase mb-8">Majestic Hub</h3>
            <p className="text-foreground/50 text-xs leading-relaxed font-sans uppercase tracking-widest max-w-xs">
              Your trusted destination for high-quality products and exceptional customer service.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary mb-8">Collections</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/archive" className="text-foreground/70 hover:text-primary text-xs uppercase tracking-widest transition-colors font-sans">
                  The Archive
                </Link>
              </li>
              <li>
                <Link href="/" className="text-foreground/70 hover:text-primary text-xs uppercase tracking-widest transition-colors font-sans">
                  Current Series
                </Link>
              </li>
              <li>
                <Link href="/bespoke" className="text-foreground/70 hover:text-primary text-xs uppercase tracking-widest transition-colors font-sans">
                  Bespoke
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary mb-8">Journal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-primary text-xs uppercase tracking-widest transition-colors font-sans">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/philosophy" className="text-foreground/70 hover:text-primary text-xs uppercase tracking-widest transition-colors font-sans">
                  Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary mb-8">Contact</h4>
            <p className="text-foreground/70 text-xs uppercase tracking-widest font-sans mb-4">
              <a href="mailto:info@majestichub.com" className="hover:text-primary transition-colors">info@majestichub.com</a>
            </p>
            <p className="text-foreground/70 text-xs uppercase tracking-widest font-sans mb-4">
              <a href="https://www.google.com/maps/place/Majestic+Hub/@4.9225856,6.2920345,17z/data=!3m1!4b1!4m6!3m5!1s0x106a05812c1e053f:0xec84a180ee7980d6!8m2!3d4.9225856!4d6.2946094!16s%2Fg%2F11h70gy4rm" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Location</a>
            </p>
            <p className="text-foreground/70 text-xs uppercase tracking-widest font-sans">
              <a href="https://instagram.com/majestic.hub" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-sans">
          <p>&copy; 2024 Majestic Hub. Excellence in Service.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
