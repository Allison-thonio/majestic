'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';

export default function AboutUs() {
  useScrollAnimations();
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-background text-foreground">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 lg:py-32 border-b border-white/5">
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 text-center reveal">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary block">
              Our Philosophy
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              Excellence in <br /> <span className="italic">Service</span>
            </h1>
            <p className="text-foreground/40 font-sans text-xs uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
              At Majestic Hub, we believe in providing exceptional quality clothing and outstanding customer service—building lasting relationships through trust and reliability in Warri, Nigeria.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-4 py-24 md:py-36 lg:py-48">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-8 reveal-left">
              <h2 className="text-4xl font-serif italic text-primary">Our Narrative</h2>
              <div className="space-y-8 text-foreground/50 font-sans text-sm leading-relaxed tracking-wide">
                <p>
                  Founded with a commitment to excellence, Majestic Hub was established to provide premium clothing and exceptional customer service in Warri, Delta State. We believe in quality, reliability, and building lasting relationships with our customers.
                </p>
                <p>
                  Every piece we offer is carefully selected to meet the highest standards of fashion and quality. Our dedication to customer satisfaction drives everything we do, from curation to after-sales support.
                </p>
              </div>
            </div>
            <div className="space-y-8 lg:space-y-16 reveal-right">
              <div className="p-8 md:p-12 border border-white/5 bg-white/[0.01] space-y-6">
                <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-primary">Quality Assurance</h3>
                <p className="text-foreground/40 text-[10px] uppercase tracking-widest leading-loose">
                  We work exclusively with trusted suppliers who prioritize quality fabrics and craftsmanship. Every garment is carefully inspected to ensure it meets our high standards.
                </p>
              </div>
              <div className="p-8 md:p-12 border border-white/5 bg-white/[0.01] space-y-6">
                <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-primary">Customer Service</h3>
                <p className="text-foreground/40 text-[10px] uppercase tracking-widest leading-loose">
                  Our dedicated team is committed to providing exceptional support. We believe in building lasting relationships through trust, transparency, and responsive service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section (Philosophy) */}
        <section className="px-4 py-24 md:py-36 lg:py-48 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 stagger">
              <div className="space-y-8 text-center md:text-left reveal">
                <span className="text-[10px] font-sans text-primary tracking-[0.5em] uppercase">01</span>
                <h3 className="text-2xl font-serif italic">Quality</h3>
                <p className="text-foreground/30 font-sans text-[10px] uppercase tracking-widest leading-relaxed">
                  The uncompromised quality of our products is matched only by our commitment to excellence.
                </p>
              </div>
              <div className="space-y-8 text-center md:text-left reveal">
                <span className="text-[10px] font-sans text-primary tracking-[0.5em] uppercase">02</span>
                <h3 className="text-2xl font-serif italic">Trust</h3>
                <p className="text-foreground/30 font-sans text-[10px] uppercase tracking-widest leading-relaxed">
                  We build lasting relationships through honesty, transparency, and reliable service.
                </p>
              </div>
              <div className="space-y-8 text-center md:text-left reveal">
                <span className="text-[10px] font-sans text-primary tracking-[0.5em] uppercase">03</span>
                <h3 className="text-2xl font-serif italic">Service</h3>
                <p className="text-foreground/30 font-sans text-[10px] uppercase tracking-widest leading-relaxed">
                  Providing exceptional customer support and satisfaction in every interaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24 md:py-36 lg:py-48 text-center">
          <div className="max-w-2xl mx-auto space-y-8 md:space-y-12 reveal">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Begin Your <span className="italic">Experience</span>
            </h2>
            <Link
              href="/archive"
              className="inline-block bg-primary text-background px-16 py-5 font-sans text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Explore Archive
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
