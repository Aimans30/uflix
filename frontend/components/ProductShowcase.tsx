import ProductCard from './ProductCard';
import Link from 'next/link';

export default function ProductShowcase() {
  const products = [
    {
      id: 1,
      name: 'Genova Leatherette Sofa in Tan Color',
      price: '₹24,900',
      originalPrice: '₹103,000',
      discount: '76%',
      image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&q=80',
    },
    {
      id: 2,
      name: 'Garcia Fabric Two Seater Sofa',
      price: '₹23,900',
      originalPrice: '₹59,900',
      discount: '60%',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    },
    {
      id: 3,
      name: 'Bradford Fabric Two Seater Sofa in Beige Colour',
      price: '₹29,900',
      originalPrice: '₹97,900',
      discount: '69%',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80',
    },
    {
      id: 4,
      name: 'Hazel Fabric 3 Seater Sofa Beige',
      price: '₹58,000',
      image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80',
    },
    {
      id: 5,
      name: 'Alexa Half Leather Single Seater',
      price: '₹12,499',
      originalPrice: '₹48,000',
      discount: '73%',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
    },
    {
      id: 6,
      name: 'Paddington Fabric Single Seater',
      price: '₹15,999',
      originalPrice: '₹38,000',
      discount: '62%',
      image: 'https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=600&q=80',
    },
    {
      id: 7,
      name: 'Garcia Fabric Three Seater Sofa',
      price: '₹31,900',
      originalPrice: '₹74,900',
      discount: '58%',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    },
    {
      id: 8,
      name: 'Riga Fabric 1 Seater Sofa in Beige Colour',
      price: '₹28,999',
      originalPrice: '₹65,000',
      discount: '76%',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Sellers</h2>
          <p className="text-lg text-neutral-dark max-w-2xl mx-auto">
            Our most loved pieces, chosen by customers like you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="inline-block bg-accent hover:bg-secondary text-white px-8 py-3 rounded-md font-semibold transition-colors shadow-md">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
