import { Container } from "@/components/ui/container";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/cn";

export type HeroSectionProps = {
  backgroundImage: {
    alt: string;
    src: string;
  };
  brideName: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
  groomName: string;
  invitationText?: string;
  weddingDate: string;
};

const DEFAULT_INVITATION_TEXT =
  "\u0054\u0072\u00e2\u006e\u0020\u0074\u0072\u1ecd\u006e\u0067\u0020\u006b\u00ed\u006e\u0068\u0020\u006d\u1eddi";
const DEFAULT_CTA_LABEL =
  "\u004d\u1edf\u0020\u0074\u0068\u0069\u1ec7\u0070\u0020\u0063\u01b0\u1edb\u0069";
const HERO_FALLBACK_IMAGE = "/images/cover/wedding-cover.svg";

export function HeroSection({
  backgroundImage,
  brideName,
  ctaHref = "#countdown",
  ctaLabel = DEFAULT_CTA_LABEL,
  className,
  groomName,
  invitationText = DEFAULT_INVITATION_TEXT,
  weddingDate
}: HeroSectionProps) {
  return (
    <section
      aria-label={backgroundImage.alt}
      className={cn("relative isolate min-h-svh overflow-hidden", className)}
    >
      <SafeImage
        alt={backgroundImage.alt}
        className="scale-[1.04] object-cover object-center"
        fallbackSrc={HERO_FALLBACK_IMAGE}
        fill
        priority
        sizes="100vw"
        src={backgroundImage.src}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(60,37,33,0.16)_0%,rgba(78,48,42,0.34)_42%,rgba(56,31,29,0.78)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_32%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(188,138,148,0.22),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(199,165,109,0.24),transparent_28%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,0.08),transparent_24%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-[1rem] rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] sm:inset-[1.5rem] sm:rounded-[2.2rem]"
      />

      <Container className="relative z-10 flex min-h-svh items-center justify-center py-24 sm:py-28">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center text-white">
          <div className="wedding-fade-in wedding-fade-in-delay-1 inline-flex max-w-full items-center gap-3 rounded-full border border-white/22 bg-[rgba(255,255,255,0.1)] px-4 py-2.5 text-white/90 shadow-[0_18px_44px_rgba(32,18,15,0.14)] backdrop-blur-md sm:px-6">
            <span className="h-px w-7 bg-[color:var(--primary)] sm:w-10" />
            <p className="text-[0.7rem] uppercase tracking-[0.3em] sm:text-sm sm:tracking-[0.42em]">
              {invitationText}
            </p>
            <span className="h-px w-7 bg-[color:var(--accent-rose)] sm:w-10" />
          </div>

          <h1 className="wedding-fade-in wedding-fade-in-delay-2 mt-7 max-w-[18rem] font-script text-[clamp(3.75rem,18vw,9rem)] leading-[0.8] tracking-[0.01em] text-[#fffaf7] drop-shadow-[0_16px_40px_rgba(38,20,18,0.34)] sm:max-w-[26rem] lg:max-w-[44rem]">
            <span className="block">{brideName}</span>
            <span className="mt-4 block font-display text-[1.3rem] font-normal uppercase tracking-[0.34em] text-[color:var(--primary)] sm:text-[1.7rem] lg:text-[2rem]">
              &
            </span>
            <span className="mt-3 block">{groomName}</span>
          </h1>

          <div className="wedding-fade-in wedding-fade-in-delay-3 mt-8 inline-flex max-w-full rounded-full border border-white/20 bg-[rgba(255,255,255,0.14)] px-5 py-3 shadow-[0_20px_54px_rgba(38,20,18,0.18)] backdrop-blur-xl sm:px-6 sm:py-3.5">
            <p className="text-sm font-medium tracking-[0.14em] text-white/95 sm:text-base sm:tracking-[0.18em]">
              {weddingDate}
            </p>
          </div>

          <div className="wedding-fade-in wedding-fade-in-delay-3 mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row">
            <a
              className="wedding-button-primary inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold tracking-[0.12em] shadow-[0_18px_40px_rgba(174,135,84,0.26)] transition sm:min-h-14 sm:px-9 sm:text-base"
              href={ctaHref}
            >
              {ctaLabel}
            </a>

            <span className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-white/72 sm:text-[0.76rem]">
              <span className="h-px w-8 bg-white/30" />
              Wedding Invitation
              <span className="h-px w-8 bg-white/30" />
            </span>
          </div>

          <a
            aria-label={ctaLabel}
            className="wedding-fade-in wedding-fade-in-delay-3 absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition hover:text-white sm:bottom-10"
            href={ctaHref}
          >
            <span className="text-[0.68rem] uppercase tracking-[0.32em]">Scroll</span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-[rgba(255,255,255,0.08)] text-lg backdrop-blur-md">
              {"\u2193"}
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
