import Image from 'next/image';

export default function BrandStory() {
  return (
    <section className="py-16 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-neutral-dark mb-6 leading-relaxed">
              At Uflix, we believe that furniture is more than just functional pieces. 
              It's about creating spaces that inspire, comfort, and bring people together.
            </p>
            <p className="text-lg text-neutral-dark mb-8 leading-relaxed">
              Since our founding, we've been committed to offering premium quality furniture 
              that combines timeless design with modern craftsmanship.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-neutral-dark">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50K+</div>
                <div className="text-sm text-neutral-dark">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-neutral-dark">Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
