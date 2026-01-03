import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4">Uflix</h3>
            <p className="text-gray-300 mb-4">
              Premium furniture for modern living. Quality craftsmanship, timeless design.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-300 hover:text-accent transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-accent transition-colors">Categories</Link></li>
              <li><Link href="/business" className="text-gray-300 hover:text-accent transition-colors">For Business</Link></li>
              <li><Link href="/shops" className="text-gray-300 hover:text-accent transition-colors">Our Stores</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-accent transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-300 hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-accent transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-accent transition-colors">Returns</Link></li>
              <li><Link href="/warranty" className="text-gray-300 hover:text-accent transition-colors">Warranty</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2026 Uflix. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
