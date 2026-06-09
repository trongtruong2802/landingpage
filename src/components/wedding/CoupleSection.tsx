import Image from "next/image";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export type CouplePerson = {
  description: string;
  image: {
    alt: string;
    src: string;
  };
  name: string;
  role: string;
};

export type CoupleSectionProps = {
  bride: CouplePerson;
  className?: string;
  groom: CouplePerson;
  eyebrow?: string;
  subtitle?: string;
  title?: string;
};

const DEFAULT_EYEBROW = "The Couple";
const DEFAULT_TITLE = "Hai nguoi, mot cau chuyen, mot ngay dac biet";
const DEFAULT_SUBTITLE =
  "Section nay duoc thiet ke nhe nhang va thanh lich de ton len hinh anh, ten goi va vai dong gioi thieu ngan gon cua co dau va chu re.";

export function CoupleSection({
  bride,
  className,
  groom,
  eyebrow = DEFAULT_EYEBROW,
  subtitle = DEFAULT_SUBTITLE,
  title = DEFAULT_TITLE
}: CoupleSectionProps) {
  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="couple">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
            {eyebrow}
          </p>
          <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
            {title}
          </h2>
          <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <PersonCard person={bride} />
          <PersonCard person={groom} className="lg:translate-y-6" />
        </div>
      </Container>
    </section>
  );
}

type PersonCardProps = {
  className?: string;
  person: CouplePerson;
};

function PersonCard({ className, person }: PersonCardProps) {
  return (
    <article
      className={cn(
        "wedding-fade-in overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,_rgba(255,255,255,0.9),_rgba(248,241,229,0.92))] shadow-[0_24px_80px_rgba(86,66,32,0.08)]",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          alt={person.image.alt}
          className="object-cover object-center"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          src={person.image.src}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,18,11,0.08)_0%,rgba(26,18,11,0)_48%,rgba(26,18,11,0.32)_100%)]" />
      </div>

      <div className="p-5 sm:p-8">
        <p className="text-[0.68rem] uppercase tracking-[0.38em] text-[color:var(--primary)]">
          {person.role}
        </p>
        <h3 className="mt-4 font-display text-[2rem] text-[color:var(--foreground)] sm:text-5xl">
          {person.name}
        </h3>
        <p className="mt-5 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
          {person.description}
        </p>
      </div>
    </article>
  );
}
