'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { getCollections } from '@/lib/store';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimations, useHeroParallax } from '@/hooks/use-scroll-animations';

export default function Home() {
  const collections = getCollections();
  useScrollAnimations();
  useHeroParallax();

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/hero-bg.png"
            alt="The Sculpted Symmetry"
            fill
            className="hero-bg object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary mb-6 block animate-fade-in-up">
              Premium Fashion
            </span>
            <h1 className="font-serif text-foreground mb-8 leading-tight animate-fade-in-up delay-100" style={{ fontSize: 'clamp(3rem, 8vw, 9rem)' }}>
              Majestic <br />
              <span className="italic">Hub</span>
            </h1>
            <p className="text-foreground/60 font-sans text-xs uppercase tracking-[0.3em] max-w-lg mx-auto mb-12 animate-fade-in-up delay-200">
              Your trusted destination for premium clothing and exceptional customer service in Warri, Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
              <Link
                href="/archive"
                className="bg-primary text-background px-12 py-4 font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-background transition-all duration-500"
              >
                The Collection
              </Link>
              <Link
                href="/about"
                className="text-foreground border border-white/20 px-12 py-4 font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all duration-500"
              >
                About Us
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Collection Section */}
        <section className="py-16 md:py-24 lg:py-32 px-4 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden group reveal-left">
              <Image
                src="/emerald-featured.png"
                alt="Featured Collection"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <div className="space-y-12 reveal-right">
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary">
                Featured Collection
              </span>
              <h2 className="text-5xl md:text-6xl font-serif text-foreground leading-tight">
                Style <br /> & Elegance
              </h2>
              <p className="text-foreground/50 font-sans text-sm leading-relaxed max-w-md">
                A curated selection of premium clothing designed for the modern fashion enthusiast. Each piece represents our commitment to quality and style.
              </p>
              <Link
                href="/archive"
                className="inline-flex items-center gap-4 text-foreground hover:text-primary transition-colors font-sans text-[10px] uppercase tracking-[0.3em] group"
              >
                Explore Edition
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-16 md:py-24 lg:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-24 gap-4 reveal">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">Our Collections</h2>
              <Link href="/archive" className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors">
                View All Collections
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5 stagger">
              {collections.map((collection) => (
                <Link key={collection.id} href={`/archive?collection=${collection.id}`}>
                  <div className="group relative aspect-[3/4] overflow-hidden bg-background p-8 flex flex-col justify-end hover:bg-white/[0.02] transition-all duration-500 reveal-scale">
                    <div className="relative z-10 space-y-4">
                      <span className="font-sans text-[8px] uppercase tracking-[0.4em] text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 block">
                        Series 0{collections.indexOf(collection) + 1}
                      </span>
                      <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors duration-500">
                        {collection.name}
                      </h3>
                      <p className="text-foreground/40 text-[10px] uppercase tracking-widest font-sans line-clamp-2 leading-relaxed h-0 group-hover:h-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy CTA */}
        <section className="py-24 md:py-36 lg:py-48 px-4 bg-white/[0.02] text-center border-t border-white/5">
          <div className="max-w-3xl mx-auto space-y-8 md:space-y-12 reveal">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground italic leading-tight">
              &quot;Excellence in every product, <br /> satisfaction in every service.&quot;
            </h2>
            <p className="text-foreground/40 font-sans text-[10px] uppercase tracking-[0.4em]">
              The Majestic Hub Philosophy
            </p>
            <Link
              href="/about"
              className="inline-block border-b border-primary pb-2 text-primary hover:text-foreground hover:border-foreground transition-all duration-300 font-sans text-xs uppercase tracking-[0.3em]"
            >
              Our Story
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
