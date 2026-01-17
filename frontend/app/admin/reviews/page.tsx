'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllReviews, approveReview } from '@/services/adminService';
import { deleteReview } from '@/services/reviewService';
import { getCurrentUser } from '@/services/authService';

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

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
      fetchReviews();
    } catch (error) {
      console.error('Error checking admin access:', error);
      router.push('/sign-in');
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();
      setReviews(data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: string) => {
    try {
      await approveReview(reviewId);
      alert('Review approved successfully!');
      fetchReviews();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to approve review');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await deleteReview(reviewId);
      alert('Review deleted successfully!');
      fetchReviews();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to delete review');
    }
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const filteredReviews = reviews.filter(review => {
    if (filterStatus === 'approved') return review.approved;
    if (filterStatus === 'pending') return !review.approved;
    return true;
  });

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Reviews Management</h1>
          <p className="text-neutral-dark mt-2">Moderate customer reviews</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg border border-border p-4 mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg border border-border p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-yellow-500 text-lg">
                      {getRatingStars(review.rating)}
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      review.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    By {review.user?.name} on {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Product: {review.product?.name}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {review.images.map((img: any, idx: number) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt="Review"
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {!review.approved && (
                    <button
                      onClick={() => handleApprove(review._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-semibold"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500 mt-2">
                Helpful: {review.helpfulCount || 0} users found this helpful
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-border">
            <p className="text-neutral-dark">No reviews found</p>
          </div>
        )}

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="text-sm text-neutral-dark mb-1">Total Reviews</div>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="text-sm text-neutral-dark mb-1">Approved</div>
            <div className="text-2xl font-bold text-green-600">
              {reviews.filter(r => r.approved).length}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="text-sm text-neutral-dark mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {reviews.filter(r => !r.approved).length}
            </div>
          </div>
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
