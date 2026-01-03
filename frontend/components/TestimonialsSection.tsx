import { TestimonialCard, TestimonialAuthor } from './TestimonialCard';

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={`bg-white py-12 sm:py-16 md:py-20 px-0 ${className || ''}`}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 sm:gap-12 text-center">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="text-base max-w-2xl font-medium text-neutral-dark sm:text-lg">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 gap-4">
            <div className="flex shrink-0 justify-around gap-4 animate-marquee group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-white sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-white sm:block" />
        </div>
      </div>
    </section>
  );
}
