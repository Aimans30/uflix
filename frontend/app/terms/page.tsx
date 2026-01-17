'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-sm text-neutral-dark mb-8">Last Updated: 15-01-2026</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            Welcome to UFLIX. By using our website and purchasing products from us, you agree to the policies mentioned below.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Terms & Conditions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>UFLIX sells products through its official website.</li>
                <li>Users must be 13 years or older.</li>
                <li className="ml-6">If under 18 years, purchases must be made with parent or guardian consent.</li>
                <li>All prices are displayed in INR and may include applicable taxes.</li>
                <li>Payments are processed securely through Razorpay.</li>
                <li>Orders are confirmed only after successful payment.</li>
                <li>UFLIX may cancel or refuse orders due to stock issues, pricing errors, or misuse.</li>
                <li>All content, images, logos, and materials on this website belong to UFLIX and cannot be copied or used without permission.</li>
                <li>Continued use of the website means you accept any updates to this policy.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Privacy Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We collect basic information such as name, email, phone number, and delivery address to process orders.</li>
                <li>Payments are securely handled by Razorpay.</li>
                <li className="ml-6">UFLIX does not store card or bank details.</li>
                <li>Your information is used only to:
                  <ul className="list-circle pl-6 mt-2">
                    <li>Process and deliver orders</li>
                    <li>Communicate order updates</li>
                    <li>Improve our services</li>
                  </ul>
                </li>
                <li>We do not sell or misuse your personal data.</li>
                <li>Information is shared only with payment and delivery partners when required.</li>
                <li>We take reasonable measures to protect your personal information.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Return & Refund Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Returns are accepted only if the product is damaged, defective, or incorrect.</li>
                <li>Return requests must be raised within 7 days of delivery.</li>
                <li>Products must be unused, in original condition, and with original packaging.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Refunds</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Once approved, refunds will be processed to the original payment method via Razorpay.</li>
                <li>Refunds are usually completed within 5–7 business days.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Non-Returnable Items</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Products damaged due to misuse</li>
                <li>Items returned after 7 days</li>
                <li>Products marked as non-returnable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Contact Information</h2>
              <div className="space-y-2">
                <p><strong>📧 Email:</strong> ebusiness@uflix.co.in</p>
                <p><strong>📞 Office:</strong> 0120 491 1871</p>
                <p><strong>📱 Mobile:</strong> +91 730 383 6300</p>
                <p><strong>📍 Address:</strong> B-71, Sector - 80, Gautam Budh Nagar, 201306, India</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
