'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/services/authService';
import api from '@/services/api';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    material: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'cm'
    },
    weight: '',
    colors: '',
    features: '',
    warranty: '',
    isActive: true,
    isFeatured: false
  });

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
      fetchCategories();
    } catch (error) {
      console.error('Error checking admin access:', error);
      router.push('/sign-in');
    }
  };

  const fetchCategories = () => {
    // Hardcoded categories - no API call needed
    const categories = [
      { _id: 'living-room', name: 'Living Room' },
      { _id: 'bedroom', name: 'Bedroom' },
      { _id: 'dining-room', name: 'Dining Room' },
      { _id: 'office', name: 'Office' },
      { _id: 'storage', name: 'Storage' },
      { _id: 'outdoor', name: 'Outdoor' },
      { _id: 'sofas-seating', name: 'Sofas & Seating' },
      { _id: 'tables', name: 'Tables' },
      { _id: 'lighting', name: 'Lighting' },
      { _id: 'decor', name: 'Decor' }
    ];
    setCategories(categories);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const currentFiles = selectedFiles;
    const totalFiles = currentFiles.length + newFiles.length;
    
    if (totalFiles > 6) {
      alert(`Maximum 6 images allowed. You currently have ${currentFiles.length} images and tried to add ${newFiles.length} more.`);
      return;
    }
    
    const allFiles = [...currentFiles, ...newFiles];
    setSelectedFiles(allFiles);
    
    // Create preview URLs for new files only
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newUrls]);
  };

  const removeImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }
    
    if (selectedFiles.length === 0) {
      alert('At least one product image is required');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload images to Cloudinary
      setUploading(true);
      const categoryFolder = formData.category || 'uncategorized';
      const uploadFormData = new FormData();
      selectedFiles.forEach((file) => {
        uploadFormData.append('images', file);
      });

      const uploadResponse = await api.post(`/upload/images?folder=products/${categoryFolder}`, uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploading(false);
      
      const images = uploadResponse.data.data.map((img: any) => ({
        url: img.url,
        alt: formData.name
      }));

      // Step 2: Create product with uploaded image URLs
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price ? parseFloat(formData.price) : 0,
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        category: formData.category || undefined,
        material: formData.material || undefined,
        weight: formData.weight ? { value: parseFloat(formData.weight), unit: 'kg' } : undefined,
        dimensions: {
          length: formData.dimensions.length ? parseFloat(formData.dimensions.length) : undefined,
          width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : undefined,
          height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : undefined,
          unit: formData.dimensions.unit
        },
        colors: formData.colors ? formData.colors.split(',').map(c => c.trim()).filter(c => c) : [],
        specifications: formData.features ? formData.features.split('\n').map(f => {
          const [key, value] = f.split(':').map(s => s.trim());
          return key && value ? { key, value } : null;
        }).filter(s => s) : [],
        images: images,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured
      };

      await api.post('/products', productData);
      alert('Product created successfully!');
      router.push('/admin/products');
    } catch (error: any) {
      console.error('Error creating product:', error);
      alert(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-neutral-dark hover:text-accent transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-neutral-dark mt-2">Fill in the product details below</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-6">
          {/* Image Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Product Images *</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-600 mb-1">Click to upload product images</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB (Max 6 images)</p>
              </label>
            </div>
            
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                
                {/* Quick Fill Buttons */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {['living-room', 'bedroom', 'office', 'outdoor', 'accessories'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        formData.category === cat
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
                
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Pricing</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Discount Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.discountPrice}
                  onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Dimensions</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Length</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.dimensions.length}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dimensions: { ...formData.dimensions, length: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Width</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.dimensions.width}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dimensions: { ...formData.dimensions, width: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.dimensions.height}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dimensions: { ...formData.dimensions, height: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Unit</label>
                <select
                  value={formData.dimensions.unit}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dimensions: { ...formData.dimensions, unit: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="cm">cm</option>
                  <option value="inch">inch</option>
                  <option value="m">m</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Additional Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Colors (comma separated)</label>
                <input
                  type="text"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  placeholder="e.g., Black, White, Brown"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Warranty</label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  placeholder="e.g., 1 year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={4}
                  placeholder="Enter each feature on a new line"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Active (visible to customers)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">⭐ Featured on Homepage</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="px-6 py-3 bg-accent text-white rounded-md hover:bg-secondary transition-colors font-semibold disabled:opacity-50"
            >
              {uploading ? 'Uploading Images...' : loading ? 'Creating Product...' : 'Create Product'}
            </button>
            <Link
              href="/admin/products"
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
