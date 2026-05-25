'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Cart state would normally come from Context or state management
  const cartItems: Array<{ id: string; name: string; quantity: number; price: number }> = [];

  useEffect(() => {
    // NOTE: In production, implement proper authentication check on server-side
    // This is a client-side check only
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary selection:text-background text-foreground">
      <Header />
      <main className="flex-grow">
        <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8 font-serif">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="bg-white/[0.02] rounded-lg border border-white/5 p-12 text-center">
                <p className="text-foreground/60 mb-6 font-sans text-xs uppercase tracking-widest">Your cart is empty</p>
                <Link
                  href="/archive"
                  className="inline-block bg-primary text-background px-8 py-3 font-semibold hover:bg-foreground hover:text-background transition-colors font-sans text-[10px] uppercase tracking-[0.2em]"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-background border border-white/5 rounded-lg overflow-hidden mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-6 p-6 border-b border-white/5 last:border-b-0">
                      <div className="w-24 h-24 bg-white/5 rounded-lg flex-shrink-0" />
                      <div className="flex-grow">
                        <h3 className="font-bold text-foreground font-sans text-sm uppercase tracking-widest">{item.name}</h3>
                        <p className="text-foreground/60 text-xs uppercase tracking-widest">Quantity: {item.quantity}</p>
                        <p className="text-lg font-bold text-primary mt-2">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-white/[0.02] rounded-lg border border-white/5 p-6 max-w-sm ml-auto">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-foreground/60">
                      <span className="font-sans text-[10px] uppercase tracking-widest">Subtotal</span>
                      <span className="font-sans text-xs">₦0</span>
                    </div>
                    <div className="flex justify-between text-foreground/60">
                      <span className="font-sans text-[10px] uppercase tracking-widest">Shipping</span>
                      <span className="font-sans text-xs">Free</span>
                    </div>
                    <div className="border-t border-white/5 pt-4 flex justify-between font-bold text-lg">
                      <span className="font-sans text-[10px] uppercase tracking-widest">Total</span>
                      <span className="font-sans text-xs">₦0</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-background py-3 rounded-lg font-semibold hover:bg-foreground hover:text-background transition-colors font-sans text-[10px] uppercase tracking-[0.2em]">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
