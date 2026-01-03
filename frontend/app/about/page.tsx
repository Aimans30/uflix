import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="relative h-96 bg-gradient-to-r from-accent to-secondary">
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-4">About Uflix</h1>
              <p className="text-xl">Crafting beautiful spaces since 2009</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-neutral-dark mb-4 leading-relaxed">
                  Founded in 2009, Uflix began with a simple vision: to make premium furniture accessible to everyone. What started as a small showroom has grown into one of India's most trusted furniture brands.
                </p>
                <p className="text-lg text-neutral-dark mb-4 leading-relaxed">
                  We believe that furniture is more than just functional pieces. It's about creating spaces that inspire, comfort, and bring people together. Every piece we offer is carefully selected for its quality, design, and craftsmanship.
                </p>
                <p className="text-lg text-neutral-dark leading-relaxed">
                  Today, we serve over 50,000 happy customers across India, offering a curated collection of furniture that combines timeless design with modern functionality.
                </p>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-neutral-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality First</h3>
                <p className="text-neutral-dark">We never compromise on quality. Every piece is built to last.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Customer Focused</h3>
                <p className="text-neutral-dark">Your satisfaction is our top priority, always.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainable</h3>
                <p className="text-neutral-dark">Committed to eco-friendly practices and materials.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">By The Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">15+</div>
                <div className="text-neutral-dark">Years in Business</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">50K+</div>
                <div className="text-neutral-dark">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-neutral-dark">Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">20+</div>
                <div className="text-neutral-dark">Cities Served</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
