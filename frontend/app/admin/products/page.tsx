'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProducts, deleteProduct } from '@/services/productService';
import { getCurrentUser } from '@/services/authService';

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const userData = await getCurrentUser();
      if (userData.data?.role !== 'admin') {
        router.push('/');
        return;
      }
      setAuthorized(true);
      fetchProducts();
    } catch (error) {
      console.error('Error checking admin access:', error);
      router.push('/sign-in');
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts({ limit: 100 });
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    const confirmMessage = `⚠️ WARNING: This action cannot be undone!\n\nAre you sure you want to delete "${productName}"?\n\nThis will:\n- Delete the product from the database\n- Delete all product images from Cloudinary\n- Remove all associated data\n\nClick OK to proceed with deletion.`;
    
    if (!confirm(confirmMessage)) return;

    try {
      await deleteProduct(productId);
      alert('✅ Product and all images deleted successfully!');
      fetchProducts();
    } catch (error: any) {
      alert('❌ ' + (error.response?.data?.message || 'Failed to delete product'));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category?._id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products Management</h1>
            <p className="text-neutral-dark mt-2">Manage your product catalog</p>
          </div>
          <Link
            href="/admin/products/new"
            className="px-6 py-3 bg-accent text-white rounded-md hover:bg-secondary transition-colors font-semibold"
          >
            + Add New Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-border p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">All Categories</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          {product.images && product.images[0] ? (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-md bg-gray-200"></div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{product.price.toLocaleString()}</div>
                      {product.discountPrice && (
                        <div className="text-sm text-green-600">₹{product.discountPrice.toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-700">
                        {product.stock || 0} units
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="text-accent hover:text-secondary"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-dark">No products found</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link href="/admin" className="text-accent hover:text-secondary">
            ← Back to Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
