'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/services/authService';
import api from '@/services/api';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
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
      const user = await getCurrentUser();
      if (!user.data || user.data.role !== 'admin') {
        router.push('/');
        return;
      }
      setAuthorized(true);
      fetchCategories();
      fetchProduct();
    } catch (error) {
      console.error('Error checking admin access:', error);
      router.push('/sign-in');
    }
  };

  const fetchCategories = () => {
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
      { _id: 'decor', name: 'Decor' },
      { _id: 'accessories', name: 'Accessories' }
    ];
    setCategories(categories);
  };

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      const product = response.data.data;
      
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        discountPrice: product.discountPrice?.toString() || '',
        category: product.category?._id || product.category || '',
        material: product.material || '',
        dimensions: {
          length: product.dimensions?.length?.toString() || '',
          width: product.dimensions?.width?.toString() || '',
          height: product.dimensions?.height?.toString() || '',
          unit: product.dimensions?.unit || 'cm'
        },
        weight: product.weight?.value?.toString() || '',
        colors: product.colors?.join(', ') || '',
        features: product.specifications?.map((spec: any) => `${spec.key}: ${spec.value}`).join('\n') || '',
        warranty: product.warranty || '',
        isActive: product.isActive !== undefined ? product.isActive : true,
        isFeatured: product.isFeatured || false
      });
      
      setExistingImages(product.images || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product');
      router.push('/admin/products');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const currentTotal = existingImages.length + selectedFiles.length;
    const totalFiles = currentTotal + newFiles.length;
    
    if (totalFiles > 6) {
      alert(`Maximum 6 images allowed. You currently have ${currentTotal} images and tried to add ${newFiles.length} more.`);
      return;
    }
    
    const allFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(allFiles);
    
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newUrls]);
  };

  const removeNewImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const removeExistingImage = (index: number) => {
    const newImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }

    if (existingImages.length === 0 && selectedFiles.length === 0) {
      alert('At least one product image is required');
      return;
    }

    setLoading(true);

    try {
      let allImages = [...existingImages];
      
      // Upload new images if any
      if (selectedFiles.length > 0) {
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
        
        const newImages = uploadResponse.data.data.map((img: any) => ({
          url: img.url,
          alt: formData.name
        }));
        
        allImages = [...allImages, ...newImages];
      }

      const productData = {
        name: formData.name,
        description: formData.description || undefined,
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
        color: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
        tags: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
        images: allImages,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured
      };

      await api.put(`/products/${productId}`, productData);
      alert('Product updated successfully!');
      router.push('/admin/products');
    } catch (error: any) {
      console.error('Error updating product:', error);
      alert(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-6">
          {/* Product Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Product Images *</label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Images:</p>
                <div className="grid grid-cols-4 gap-4">
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.url}
                        alt={img.alt || 'Product'}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-accent transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
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
                <p className="text-sm text-gray-600 mb-1">Click to upload more images</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB (Max 6 images total)</p>
              </label>
            </div>
            
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`New ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  required
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

              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
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

          {/* Dimensions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Dimensions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Length</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.dimensions.length}
                  onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, length: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Width</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.dimensions.width}
                  onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, width: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.dimensions.height}
                  onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, height: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Unit</label>
                <select
                  value={formData.dimensions.unit}
                  onChange={(e) => setFormData({ ...formData, dimensions: { ...formData.dimensions, unit: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="cm">cm</option>
                  <option value="in">inches</option>
                  <option value="m">meters</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm font-medium mb-2">Colors (comma separated)</label>
                <input
                  type="text"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  placeholder="Red, Blue, Green"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={4}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Warranty</label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  placeholder="1 Year Manufacturer Warranty"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="ml-2 text-sm">Active (visible to customers)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="ml-2 text-sm">Featured on Homepage</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 bg-accent hover:bg-secondary text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading Images...' : loading ? 'Updating...' : 'Update Product'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
