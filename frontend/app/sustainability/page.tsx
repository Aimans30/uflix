import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="relative h-[500px] bg-gradient-to-r from-accent to-secondary overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80"
            alt="Sustainability"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Sustainability & Responsible Manufacturing</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Committed to eco-friendly practices, sustainable materials, and minimizing environmental impact</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Sustainability Commitment</h2>
              <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
                UFLIX recognizes the responsibility we have toward the environment and future generations. We integrate sustainable practices across our entire value chain—from material sourcing to manufacturing processes and waste management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
                  alt="Sustainable Materials"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6">Sustainable Material Sourcing</h3>
                <p className="text-lg text-neutral-dark mb-6 leading-relaxed">
                  We prioritize responsibly sourced materials that minimize environmental impact while maintaining the highest quality standards. Our supplier partnerships are built on shared values of sustainability and ethical practices.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold mb-1">Certified Wood Sources</h4>
                      <p className="text-neutral-dark">FSC-certified and sustainably harvested timber from responsible forestry operations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold mb-1">Recycled Metal Content</h4>
                      <p className="text-neutral-dark">Use of recycled steel and aluminum in metal fabrication wherever possible</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold mb-1">Low-VOC Materials</h4>
                      <p className="text-neutral-dark">Eco-friendly adhesives, laminates, and finishes with minimal volatile organic compounds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-bold mb-6">Energy-Efficient Manufacturing</h3>
                <p className="text-lg text-neutral-dark mb-6 leading-relaxed">
                  Our production facilities incorporate energy-efficient machinery, LED lighting, and optimized workflows to reduce energy consumption and carbon footprint.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold mb-1">Modern CNC Equipment</h4>
                      <p className="text-neutral-dark">Energy-efficient machinery with optimized power consumption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold mb-1">Solar Power Integration</h4>
                      <p className="text-neutral-dark">Renewable energy sources supplementing grid power</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold mb-1">Waste Heat Recovery</h4>
                      <p className="text-neutral-dark">Capturing and reusing heat from manufacturing processes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
                  alt="Energy Efficiency"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Waste Reduction & Recycling</h2>
              <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
                Comprehensive waste management programs to minimize landfill waste and maximize material recovery
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Material Recycling</h3>
                <p className="text-neutral-dark mb-4">Wood offcuts, metal scraps, and packaging materials are segregated and recycled through certified partners</p>
                <div className="text-3xl font-bold text-accent">85%</div>
                <p className="text-sm text-neutral-dark">Waste recycling rate</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Optimized Cutting</h3>
                <p className="text-neutral-dark mb-4">Advanced nesting software minimizes material waste during CNC cutting and panel processing</p>
                <div className="text-3xl font-bold text-accent">92%</div>
                <p className="text-sm text-neutral-dark">Material utilization rate</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Packaging Reduction</h3>
                <p className="text-neutral-dark mb-4">Reusable packaging materials and optimized packaging design to reduce waste</p>
                <div className="text-3xl font-bold text-accent">60%</div>
                <p className="text-sm text-neutral-dark">Reduction in packaging waste</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Product Lifecycle & Durability</h2>
              <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
                Designing for longevity reduces environmental impact by extending product life and minimizing replacement frequency
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-neutral-light to-white p-8 rounded-2xl border border-border shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Built to Last</h3>
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  UFLIX furniture is engineered for commercial-grade durability, with robust construction and quality materials that ensure decades of reliable service. This longevity significantly reduces the environmental burden of frequent replacements.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-dark">15+ year expected product lifespan for commercial furniture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-dark">Replaceable components extend furniture life beyond initial warranty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-dark">Timeless designs that remain functional and aesthetically relevant</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-neutral-light to-white p-8 rounded-2xl border border-border shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Repair & Refurbishment</h3>
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  We support product longevity through comprehensive repair services, spare parts availability, and refurbishment programs that give furniture a second life instead of ending up in landfills.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-dark">Spare parts inventory for long-term product support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-dark">Professional refurbishment services for aging furniture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-dark">Modular designs allowing component replacement instead of full replacement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Environmental Initiatives</h2>
              <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
                Ongoing programs to reduce our environmental footprint and contribute to a sustainable future
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Carbon Footprint Reduction</h4>
                <p className="text-neutral-dark text-sm">Measuring and actively reducing greenhouse gas emissions across operations</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Water Conservation</h4>
                <p className="text-neutral-dark text-sm">Closed-loop water systems and rainwater harvesting for facility operations</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Employee Training</h4>
                <p className="text-neutral-dark text-sm">Sustainability awareness programs and best practices training for all staff</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Supplier Audits</h4>
                <p className="text-neutral-dark text-sm">Regular assessment of supplier environmental and social responsibility practices</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Sustainability Goals</h2>
              <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
                Our commitment to continuous improvement in environmental performance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-neutral-light to-white p-8 rounded-2xl border-2 border-accent shadow-lg">
                <div className="text-4xl font-bold text-accent mb-3">2025</div>
                <h3 className="text-xl font-bold mb-4">Near-Term Goals</h3>
                <ul className="space-y-2 text-neutral-dark">
                  <li>• 30% renewable energy usage</li>
                  <li>• 90% waste recycling rate</li>
                  <li>• Zero liquid discharge facility</li>
                  <li>• ISO 14001 certification</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-neutral-light to-white p-8 rounded-2xl border-2 border-accent shadow-lg">
                <div className="text-4xl font-bold text-accent mb-3">2030</div>
                <h3 className="text-xl font-bold mb-4">Medium-Term Goals</h3>
                <ul className="space-y-2 text-neutral-dark">
                  <li>• 50% reduction in carbon emissions</li>
                  <li>• 100% FSC-certified wood</li>
                  <li>• Circular economy initiatives</li>
                  <li>• Green building certification</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-neutral-light to-white p-8 rounded-2xl border-2 border-accent shadow-lg">
                <div className="text-4xl font-bold text-accent mb-3">2040</div>
                <h3 className="text-xl font-bold mb-4">Long-Term Vision</h3>
                <ul className="space-y-2 text-neutral-dark">
                  <li>• Carbon neutral operations</li>
                  <li>• 100% renewable energy</li>
                  <li>• Zero waste to landfill</li>
                  <li>• Closed-loop manufacturing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-accent to-secondary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Partner with a Sustainable Manufacturer</h2>
            <p className="text-xl mb-10 opacity-90">Choose UFLIX for furniture solutions that align with your organization's sustainability goals</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-block bg-white text-accent hover:bg-neutral-light px-10 py-4 rounded-lg font-bold transition-colors shadow-xl text-lg">
                Discuss Your Project
              </Link>
              <Link href="/about" className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-accent px-10 py-4 rounded-lg font-bold transition-colors text-lg">
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
