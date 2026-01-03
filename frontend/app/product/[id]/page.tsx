'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const productData: Record<string, any> = {
  '1': {
    name: 'Modern Velvet Sofa',
    price: '₹24,999',
    originalPrice: '₹32,999',
    rating: 4.5,
    reviews: 128,
    images: [
      'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80',
    ],
    description: 'Elevate your living space with our Modern Velvet Sofa. Crafted with premium velvet upholstery and solid wood frame, this sofa combines comfort with contemporary elegance. Perfect for both relaxation and entertaining guests.',
    features: [
      'Premium velvet upholstery',
      'Solid wood frame construction',
      'High-density foam cushions',
      'Easy assembly required',
      'Weight capacity: 300kg',
      '3-year warranty included',
    ],
    specifications: {
      'Dimensions': '220cm W x 90cm D x 85cm H',
      'Material': 'Velvet, Wood, Foam',
      'Color': 'Navy Blue',
      'Weight': '65kg',
      'Assembly': 'Required',
      'Warranty': '3 Years',
    },
    inStock: true,
    category: 'Living Room',
  },
};

const relatedProducts = [
  { id: 5, name: 'Alexa Half Leather Single Seater', price: '₹12,499', originalPrice: '₹48,000', discount: '73%', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80' },
  { id: 7, name: 'Garcia Fabric Three Seater Sofa', price: '₹31,900', originalPrice: '₹74,900', discount: '58%', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 13, name: 'TV Entertainment Unit', price: '₹18,999', originalPrice: '₹35,000', discount: '46%', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80' },
  { id: 14, name: 'Paddington Fabric Single Seater', price: '₹15,999', originalPrice: '₹38,000', discount: '62%', image: 'https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=600&q=80' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = productData[id] || productData['1'];
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: parseInt(id),
        name: product.name,
        price: product.price,
        image: product.images[0],
        originalPrice: product.originalPrice,
      });
    }
  };

  const handleWishlistToggle = () => {
    const productId = parseInt(id);
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        originalPrice: product.originalPrice,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: 'Shop', href: '/shop' },
          { label: product.category, href: `/category/${product.category.toLowerCase().replace(' ', '-')}` },
          { label: product.name }
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="relative h-96 md:h-[500px] bg-white rounded-2xl overflow-hidden mb-4 border border-gray-200">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-accent' : 'border-gray-200'
                  }`}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-neutral-dark">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-accent">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-dark line-through">{product.originalPrice}</span>
              )}
            </div>

            <p className="text-neutral-dark mb-6 leading-relaxed">{product.description}</p>

            <div className="bg-neutral-light rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              {product.inStock ? (
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            <div className="flex gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-accent hover:bg-secondary text-white py-4 rounded-lg font-semibold transition-colors"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleWishlistToggle}
                className={`px-6 py-4 border-2 rounded-lg transition-colors ${
                  isInWishlist(parseInt(id))
                    ? 'bg-accent border-accent text-white'
                    : 'border-accent text-accent hover:bg-accent hover:text-white'
                }`}
              >
                <svg className="w-6 h-6" fill={isInWishlist(parseInt(id)) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Free shipping on orders above ₹15,000</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>{product.specifications.Warranty} warranty</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              {(['description', 'specifications', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-neutral-dark hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-neutral-dark leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between p-4 bg-neutral-light rounded-lg">
                  <span className="font-medium">{key}</span>
                  <span className="text-neutral-dark">{value as string}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <p className="text-neutral-dark">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
