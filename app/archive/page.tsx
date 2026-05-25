'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { getProducts } from '@/lib/store';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';

export default function Archive() {
  const products = getProducts();
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  useScrollAnimations();

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-background text-foreground">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 reveal">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary">
              The Archive
            </span>
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Curated <br /> <span className="italic">Excellence</span>
            </h1>
            <p className="text-foreground/40 font-sans text-xs uppercase tracking-[0.2em] max-w-sm">
              Exploring our complete collection of premium fashion pieces for every occasion.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-12 lg:gap-y-16 stagger">
              {products.map((product) => (
                <div key={product.id} className="group space-y-6 reveal">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/5 group-hover:border-primary/30 transition-all duration-500">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
                      }}
                    />
                    <div className="fallback absolute inset-0 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center hidden">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/20 font-sans">{product.category}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 px-2">
                    <div className="flex justify-between items-start gap-4">
                      <Link href={`/archive/${product.id}`} className="group-hover:text-primary transition-colors duration-500">
                        <h3 className="text-sm font-sans uppercase tracking-[0.2em] leading-relaxed">
                          {product.name}
                        </h3>
                      </Link>
                      <span className="text-xs font-sans text-primary/80">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-foreground/30 text-[10px] uppercase tracking-widest font-sans line-clamp-2 leading-relaxed h-10">
                      {product.description}
                    </p>

                    <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.sizes.map((size) => (
                          <span key={size} className="text-[8px] uppercase tracking-widest text-foreground/40 border border-white/10 px-2 py-1">
                            {size}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => addToCart(product.id)}
                          className="text-[10px] uppercase tracking-[0.3em] font-sans text-primary hover:text-foreground transition-colors"
                        >
                          Add to Cart
                        </button>
                        {product.stock < 5 && (
                          <span className="text-[8px] uppercase tracking-widest text-primary/50 italic">
                            Limited Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
