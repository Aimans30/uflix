export default function ClientCarousel() {
  const clients = [
    'IKEA', 'West Elm', 'Crate & Barrel', 'Pottery Barn',
    'CB2', 'Article', 'Wayfair', 'Ashley Furniture'
  ];

  return (
    <section className="py-12 bg-neutral-light border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-neutral-dark mb-6 uppercase tracking-wide font-medium">
          Trusted by Leading Brands
        </p>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee gap-16">
            {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[150px] text-xl font-bold text-neutral-dark opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
