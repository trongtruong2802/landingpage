import Image from "next/image";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export type HeroSectionProps = {
  backgroundImage: {
    alt: string;
    src: string;
  };
  brideName: string;
  className?: string;
  groomName: string;
  invitationText?: string;
  weddingDate: string;
};

const DEFAULT_INVITATION_TEXT =
  "\u0054\u0072\u00e2\u006e\u0020\u0074\u0072\u1ecd\u006e\u0067\u0020\u006b\u00ed\u006e\u0068\u0020\u006d\u1eddi";

export function HeroSection({
  backgroundImage,
  brideName,
  className,
  groomName,
  invitationText = DEFAULT_INVITATION_TEXT,
  weddingDate
}: HeroSectionProps) {
  return (
    <section
      aria-label={backgroundImage.alt}
      className={cn("relative isolate min-h-[34rem] min-h-svh overflow-hidden", className)}
    >
      <Image
        alt={backgroundImage.alt}
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src={backgroundImage.src}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,8,0.22)_0%,rgba(17,12,8,0.34)_45%,rgba(17,12,8,0.58)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%)]"
      />

      <Container className="relative z-10 flex min-h-[34rem] min-h-svh items-end pb-10 pt-24 sm:pb-16 sm:pt-32 lg:pb-20">
        <div className="max-w-2xl text-white lg:max-w-3xl">
          <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.7rem] uppercase tracking-[0.32em] text-white/85 sm:text-sm sm:tracking-[0.4em]">
            {invitationText}
          </p>

          <h1 className="wedding-fade-in wedding-fade-in-delay-2 mt-5 font-display text-[clamp(2.85rem,12vw,5.5rem)] leading-[0.92] text-balance sm:text-6xl lg:text-8xl">
            <span className="block">{brideName}</span>
            <span className="mt-2 block text-2xl font-normal text-[color:var(--primary)] sm:text-4xl lg:text-5xl">
              &
            </span>
            <span className="mt-2 block">{groomName}</span>
          </h1>

          <div className="wedding-fade-in wedding-fade-in-delay-3 mt-7 inline-flex max-w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm sm:px-5">
            <p className="text-sm font-medium tracking-[0.1em] text-white/95 sm:text-base sm:tracking-[0.16em]">
              {weddingDate}
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}
