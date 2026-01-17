'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-neutral-dark mb-8">Last Updated: 15-01-2026</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            At UFLIX, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="mb-4">We collect basic information such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Delivery address</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Payment Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments are securely handled by Razorpay.</li>
                <li><strong>UFLIX does not store card or bank details.</strong></li>
                <li>All payment transactions are encrypted and secure.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="mb-4">Your information is used only to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and deliver orders</li>
                <li>Communicate order updates</li>
                <li>Improve our services</li>
                <li>Provide customer support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not sell or misuse your personal data.</li>
                <li>Information is shared only with payment and delivery partners when required.</li>
                <li>We take reasonable measures to protect your personal information.</li>
                <li>Your data is stored securely and accessed only by authorized personnel.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have the right to access your personal information.</li>
                <li>You can request correction or deletion of your data.</li>
                <li>You can opt out of marketing communications at any time.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">If you have any questions about our Privacy Policy, please contact us:</p>
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
