'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';

export default function ShopPage() {
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const products = [
    { id: 1, name: 'Genova Leatherette Sofa in Tan Color', price: '₹24,900', originalPrice: '₹103,000', discount: '76%', image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&q=80', category: 'Living Room' },
    { id: 2, name: 'Garcia Fabric Two Seater Sofa', price: '₹23,900', originalPrice: '₹59,900', discount: '60%', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', category: 'Living Room' },
    { id: 3, name: 'Bradford Fabric Two Seater Sofa', price: '₹29,900', originalPrice: '₹97,900', discount: '69%', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80', category: 'Living Room' },
    { id: 4, name: 'Hazel Fabric 3 Seater Sofa', price: '₹58,000', originalPrice: '₹98,000', discount: '41%', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80', category: 'Living Room' },
    { id: 5, name: 'Alexa Half Leather Single Seater', price: '₹12,499', originalPrice: '₹48,000', discount: '73%', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80', category: 'Living Room' },
    { id: 6, name: 'Bookshelf Unit', price: '₹15,999', originalPrice: '₹32,000', discount: '50%', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80', category: 'Storage' },
    { id: 7, name: 'Garcia Fabric Three Seater Sofa', price: '₹31,900', originalPrice: '₹74,900', discount: '58%', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', category: 'Living Room' },
    { id: 8, name: 'Riga Fabric 1 Seater Sofa', price: '₹28,999', originalPrice: '₹65,000', discount: '76%', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80', category: 'Living Room' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Shop' }]} />
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">All Products</h1>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-accent text-white' : 'bg-white border border-gray-300'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-white border border-gray-300'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block">
            <FilterSidebar />
          </aside>

          <div className="lg:col-span-3">
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
