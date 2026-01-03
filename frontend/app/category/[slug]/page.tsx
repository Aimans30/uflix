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

const categoryProducts: Record<string, any[]> = {
  'living-room': [
    { id: 1, name: 'Genova Leatherette Sofa in Tan Color', price: '₹24,900', originalPrice: '₹103,000', discount: '76%', image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&q=80' },
    { id: 5, name: 'Alexa Half Leather Single Seater', price: '₹12,499', originalPrice: '₹48,000', discount: '73%', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80' },
    { id: 7, name: 'Garcia Fabric Three Seater Sofa', price: '₹31,900', originalPrice: '₹74,900', discount: '58%', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
    { id: 9, name: 'L-Shape Sectional Sofa', price: '₹45,999', originalPrice: '₹89,000', discount: '48%', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
    { id: 13, name: 'TV Entertainment Unit', price: '₹18,999', originalPrice: '₹35,000', discount: '46%', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80' },
    { id: 14, name: 'Paddington Fabric Single Seater', price: '₹15,999', originalPrice: '₹38,000', discount: '62%', image: 'https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=600&q=80' },
  ],
  'bedroom': [
    { id: 3, name: 'Bradford Fabric Two Seater Sofa in Beige Colour', price: '₹29,900', originalPrice: '₹97,900', discount: '69%', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80' },
    { id: 8, name: 'Riga Fabric 1 Seater Sofa in Beige Colour', price: '₹28,999', originalPrice: '₹65,000', discount: '76%', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80' },
    { id: 12, name: 'Queen Size Bed Frame', price: '₹27,999', originalPrice: '₹55,000', discount: '49%', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80' },
    { id: 15, name: 'Bedside Table Set', price: '₹8,999', originalPrice: '₹18,000', discount: '50%', image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80' },
    { id: 16, name: 'Dresser with Mirror', price: '₹19,999', originalPrice: '₹42,000', discount: '52%', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80' },
  ],
  'dining': [
    { id: 2, name: 'Wooden Dining Table Set', price: '₹45,999', originalPrice: '₹89,000', discount: '48%', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&q=80' },
    { id: 10, name: 'Dining Chair Set of 4', price: '₹16,999', originalPrice: '₹32,000', discount: '47%', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80' },
    { id: 17, name: 'Marble Top Dining Table', price: '₹34,999', originalPrice: '₹68,000', discount: '49%', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80' },
    { id: 18, name: 'Bar Cabinet', price: '₹21,999', originalPrice: '₹45,000', discount: '51%', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80' },
  ],
  'office': [
    { id: 4, name: 'Office Desk Chair', price: '₹8,999', originalPrice: '₹18,000', discount: '50%', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80' },
    { id: 11, name: 'Study Desk with Drawers', price: '₹13,999', originalPrice: '₹28,000', discount: '50%', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80' },
    { id: 19, name: 'Executive Office Chair', price: '₹15,999', originalPrice: '₹32,000', discount: '50%', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&q=80' },
    { id: 20, name: 'L-Shaped Office Desk', price: '₹24,999', originalPrice: '₹48,000', discount: '48%', image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&q=80' },
  ],
  'outdoor': [
    { id: 21, name: 'Patio Dining Set', price: '₹29,999', originalPrice: '₹58,000', discount: '48%', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80' },
    { id: 22, name: 'Garden Lounge Chair', price: '₹12,999', originalPrice: '₹25,000', discount: '48%', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80' },
    { id: 23, name: 'Outdoor Swing', price: '₹18,999', originalPrice: '₹38,000', discount: '50%', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80' },
  ],
  'storage': [
    { id: 6, name: 'Bookshelf Unit', price: '₹15,999', originalPrice: '₹32,000', discount: '50%', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80' },
    { id: 24, name: 'Storage Cabinet', price: '₹11,999', originalPrice: '₹24,000', discount: '50%', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80' },
    { id: 25, name: 'Floating Shelves Set', price: '₹5,999', originalPrice: '₹12,000', discount: '50%', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80' },
  ],
};

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
