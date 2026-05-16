'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  // Cart state would normally come from Context or state management
  const cartItems = [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-600 mb-6">Your cart is empty</p>
                <Link
                  href="/archive"
                  className="inline-block bg-gray-900 text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex gap-6 p-6 border-b border-gray-200 last:border-b-0">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
                      <div className="flex-grow">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">${item.price * item.quantity}</p>
                      </div>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 max-w-sm ml-auto">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${0}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${0}</span>
                    </div>
                  </div>
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
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
