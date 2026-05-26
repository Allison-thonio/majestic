'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getProductById } from '@/lib/store';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-background text-foreground">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-serif italic text-foreground">Product Not Found</h1>
            <Link href="/archive" className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary hover:text-foreground transition-colors">
              ← Return to Archive
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-background text-foreground">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <Link href="/archive" className="font-sans text-[10px] uppercase tracking-[0.4em] text-foreground/40 hover:text-primary transition-colors mb-16 inline-block">
            ← Archive
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Image Section */}
            <div className="relative aspect-[3/4] bg-white/[0.02] border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                <span className="text-[12px] uppercase tracking-[0.5em] text-foreground/10 font-sans">{product.category} Series</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary">
                  {product.collection} Edition
                </span>
                <h1 className="text-5xl md:text-6xl font-serif leading-tight">
                  {product.name}
                </h1>
                <p className="text-3xl font-serif text-primary/90 mt-8">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>

              <p className="text-foreground/50 font-sans text-sm leading-relaxed max-w-md">
                {product.description}
              </p>

              <div className="space-y-8 pt-8 border-t border-white/5">
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-4">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/40">Select Size</span>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`font-sans text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
                            selectedSize === size
                              ? 'border-primary text-primary bg-primary/10'
                              : 'border-white/10 text-foreground/60 hover:border-white/30 hover:text-foreground'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/40">Quantity</span>
                  <div className="flex items-center gap-8 border border-white/10 px-6 py-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-foreground/40 hover:text-primary transition-colors"
                    >
                      −
                    </button>
                    <span className="font-sans text-xs w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="text-foreground/40 hover:text-primary transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  disabled={product.stock === 0 || !selectedSize}
                  className="w-full bg-primary text-background py-5 font-sans text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-foreground hover:text-background transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Request Acquisition
                </button>

                <p className={`font-sans text-[10px] uppercase tracking-widest text-center ${product.stock > 0 ? 'text-foreground/30' : 'text-red-900/50'}`}>
                  {product.stock > 0 ? `${product.stock} pieces available in series` : 'Current series exhausted'}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-y-8 gap-x-12 pt-16 border-t border-white/5">
                <div className="space-y-2">
                  <span className="block font-sans text-[8px] uppercase tracking-[0.3em] text-primary">Catalog Ref</span>
                  <span className="block font-sans text-[10px] uppercase tracking-widest text-foreground/50">{product.id}</span>
                </div>
                <div className="space-y-2">
                  <span className="block font-sans text-[8px] uppercase tracking-[0.3em] text-primary">Authenticity</span>
                  <span className="block font-sans text-[10px] uppercase tracking-widest text-foreground/50">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
