'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';

const categoryData: Record<string, { name: string; description: string; banner: string }> = {
  'living-room': {
    name: 'Living Room',
    description: 'Transform your living space with our curated collection of sofas, coffee tables, and entertainment units',
    banner: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80',
  },
  'bedroom': {
    name: 'Bedroom',
    description: 'Create your perfect sanctuary with our range of beds, wardrobes, and bedroom essentials',
    banner: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1920&q=80',
  },
  'dining': {
    name: 'Dining',
    description: 'Gather in style with our elegant dining tables, chairs, and storage solutions',
    banner: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80',
  },
  'office': {
    name: 'Office',
    description: 'Boost productivity with our ergonomic desks, chairs, and office furniture',
    banner: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1920&q=80',
  },
  'outdoor': {
    name: 'Outdoor',
    description: 'Extend your living space outdoors with our weather-resistant patio furniture',
    banner: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80',
  },
  'storage': {
    name: 'Storage',
    description: 'Organize your space with our versatile shelving units, cabinets, and storage solutions',
    banner: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1920&q=80',
  },
};

const categoryProducts: Record<string, any[]> = {};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [sortBy, setSortBy] = useState('featured');
  
  const category = categoryData[slug] || { name: 'Category', description: '', banner: '' };
  const products = categoryProducts[slug] || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <div className="relative h-64 bg-foreground">
          <div className="absolute inset-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
              <Breadcrumb items={[{ label: 'Categories', href: '/categories' }, { label: category.name }]} />
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
              <p className="text-lg text-white/90 max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-neutral-dark">{products.length} products</p>
            
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
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="hidden lg:block">
              <FilterSidebar />
            </aside>

            <div className="lg:col-span-3">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">
                    📦
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Available</h3>
                  <p className="text-gray-500">No products found in {category.name} category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
