import Image from 'next/image';

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div';
  
  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`flex flex-col rounded-lg border border-border bg-gradient-to-b from-neutral-light/50 to-white p-4 sm:p-6 text-start hover:from-neutral-light hover:shadow-md max-w-[320px] transition-all duration-300 ${className || ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <Image 
            src={author.avatar} 
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-base font-semibold leading-none">
            {author.name}
          </h3>
          <p className="text-sm text-neutral-dark">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm sm:text-base text-neutral-dark">
        {text}
      </p>
    </Card>
  );
}
