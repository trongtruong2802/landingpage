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
    <footer className={cn("relative py-12 sm:py-16 lg:py-20", className)}>
      <Container>
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,_rgba(255,255,255,0.92),_rgba(247,239,226,0.9))] px-6 py-10 text-center shadow-[0_20px_70px_rgba(86,66,32,0.08)] sm:px-10 sm:py-12">
          <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
            {MADE_WITH_LOVE}
          </p>

          <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
            {coupleNames}
          </h2>

          <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 mx-auto max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {thankYouMessage}
          </p>

          <div className="mt-8 inline-flex rounded-full border border-[color:var(--border)] bg-white/80 px-5 py-3 text-sm text-[color:var(--foreground)]">
            {weddingData.weddingDate.display}
          </div>
        </div>
      </Container>
    </footer>
  );
}
