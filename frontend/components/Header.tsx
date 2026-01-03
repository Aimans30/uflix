'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-3xl font-bold text-accent">
            Uflix
          </Link>

          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search for furniture..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/login" className="p-2 hover:text-accent transition-colors" aria-label="Account">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <Link href="/wishlist" className="p-2 hover:text-accent transition-colors relative" aria-label="Wishlist">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="p-2 hover:text-accent transition-colors relative" aria-label="Cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="hidden lg:flex items-center justify-center space-x-8 py-4 border-t border-border">
          <Link href="/shop" className="text-sm font-medium hover:text-accent transition-colors">
            Shop All
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-accent transition-colors">
            Categories
          </Link>
          <Link href="/business" className="text-sm font-medium hover:text-accent transition-colors">
            For Business
          </Link>
          <Link href="/shops" className="text-sm font-medium hover:text-accent transition-colors">
            Our Shops
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link href="/shop" className="text-sm font-medium hover:text-accent transition-colors">
                Shop All
              </Link>
              <Link href="/categories" className="text-sm font-medium hover:text-accent transition-colors">
                Categories
              </Link>
              <Link href="/business" className="text-sm font-medium hover:text-accent transition-colors">
                For Business
              </Link>
              <Link href="/shops" className="text-sm font-medium hover:text-accent transition-colors">
                Our Shops
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
