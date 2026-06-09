import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

const THANK_YOU_MESSAGE =
  "\u0043\u1ea3\u006d\u0020\u01a1\u006e\u0020\u0062\u1ea1\u006e\u0020\u0111\u00e3\u0020\u0064\u00e0\u006e\u0068\u0020\u0074\u0068\u1eddi\u0020\u0067\u0069\u0061\u006e\u0020\u0111\u1ed3\u006e\u0067\u0020\u0068\u00e0\u006e\u0068\u0020\u0076\u00e0\u0020\u0063\u0068\u0075\u006e\u0067\u0020\u0076\u0075\u0069\u0020\u0063\u00f9\u006e\u0067\u0020\u0063\u0068\u00fa\u006e\u0067\u0020\u006d\u00ec\u006e\u0068\u0020\u0074\u0072\u006f\u006e\u0067\u0020\u006e\u0067\u00e0\u0079\u0020\u0111\u1eb7\u0063\u0020\u0062\u0069\u1ec7\u0074\u002e";
const MADE_WITH_LOVE =
  "\u004d\u0061\u0064\u0065\u0020\u0077\u0069\u0074\u0068\u0020\u006c\u006f\u0076\u0065";

export type FooterSectionProps = {
  className?: string;
  thankYouMessage?: string;
};

export function FooterSection({
  className,
  thankYouMessage = THANK_YOU_MESSAGE
}: FooterSectionProps) {
  const coupleNames = `${weddingData.bride.fullName} & ${weddingData.groom.fullName}`;

  return (
    <footer className={cn("relative overflow-hidden py-12 sm:py-16 lg:py-20", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(199,165,109,0.18),transparent_70%)]"
      />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto h-px w-28 bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.82),transparent)] sm:w-36" />

          <p className="mt-6 text-[0.68rem] uppercase tracking-[0.42em] text-[color:var(--accent-rose-deep)]">
            {MADE_WITH_LOVE}
          </p>

          <h2 className="mt-5 font-script text-[3.2rem] leading-[0.84] text-balance text-[color:var(--foreground)] sm:text-[4.5rem] lg:text-[5.6rem]">
            {coupleNames}
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.72),transparent)]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {thankYouMessage}
          </p>

          <p className="mt-6 font-display text-lg tracking-[0.08em] text-[color:var(--foreground)] sm:text-xl">
            {weddingData.weddingDate.display}
          </p>

          <p className="mt-4 text-sm italic text-[color:var(--primary)]/88">
            {MADE_WITH_LOVE}
          </p>
        </div>
      </Container>
    </footer>
  );
}
