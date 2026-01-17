'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Return & Refund Policy</h1>
        <p className="text-sm text-neutral-dark mb-8">Last Updated: 15-01-2026</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            At UFLIX, we want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Return Eligibility</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Returns are accepted only if the product is <strong>damaged, defective, or incorrect</strong>.</li>
                <li>Return requests must be raised <strong>within 7 days of delivery</strong>.</li>
                <li>Products must be <strong>unused, in original condition, and with original packaging</strong>.</li>
                <li>All tags, labels, and accessories must be intact.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">How to Request a Return</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact us within 7 days of receiving your order.</li>
                <li>Provide your order number and reason for return.</li>
                <li>Share photos of the damaged or defective product (if applicable).</li>
                <li>Our team will review your request and provide instructions.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Refund Process</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Once your return is approved, refunds will be processed to the <strong>original payment method via Razorpay</strong>.</li>
                <li>Refunds are usually completed within <strong>5–7 business days</strong>.</li>
                <li>You will receive a confirmation email once the refund is processed.</li>
                <li>Bank processing times may vary depending on your financial institution.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Non-Returnable Items</h2>
              <p className="mb-4">The following items cannot be returned:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Products damaged due to misuse or improper handling</li>
                <li>Items returned after 7 days of delivery</li>
                <li>Products marked as non-returnable at the time of purchase</li>
                <li>Items without original packaging or missing accessories</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
              <p>
                We currently do not offer direct exchanges. If you need a different product, please return the original item for a refund and place a new order.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Shipping Costs</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>If the product is damaged or defective, we will cover the return shipping costs.</li>
                <li>For other returns, shipping costs may be deducted from your refund.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">For return and refund inquiries, please contact us:</p>
              <div className="space-y-2">
                <p><strong>📧 Email:</strong> ebusiness@uflix.co.in</p>
                <p><strong>📞 Office:</strong> 0120 491 1871</p>
                <p><strong>📱 Mobile:</strong> +91 730 383 6300</p>
                <p><strong>📍 Address:</strong> B-71, Sector - 80, Gautam Budh Nagar, 201306, India</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm">
              For complete terms and conditions, please visit our{' '}
              <Link href="/terms" className="text-accent hover:underline">Terms & Conditions</Link> page.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
