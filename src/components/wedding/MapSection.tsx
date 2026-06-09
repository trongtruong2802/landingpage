import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

const DEFAULT_TITLE =
  "\u0110\u1ecba\u0020\u0111\u0069\u1ec3\u006d\u0020\u0074\u1ed5\u0020\u0063\u0068\u1ee9\u0063";
const DEFAULT_SUBTITLE =
  "\u0042\u1ea3\u006e\u0020\u0111\u1ed3\u0020\u0111\u01b0\u1ee3\u0063\u0020\u006e\u0068\u00fa\u006e\u0067\u0020\u0074\u0072\u1ef1\u0063\u0020\u0074\u0069\u1ebf\u0070\u0020\u0111\u1ec3\u0020\u006b\u0068\u00e1\u0063\u0068\u0020\u006d\u1eddi\u0020\u0064\u1ec5\u0020\u0078\u0065\u006d\u0020\u0074\u0072\u00ea\u006e\u0020\u0111\u0069\u1ec7\u006e\u0020\u0074\u0068\u006f\u1ea1\u0069\u0020\u0076\u00e0\u0020\u006d\u00e1\u0079\u0020\u0074\u00ed\u006e\u0068\u002e";
const DIRECTIONS_LABEL =
  "\u0043\u0068\u1ec9\u0020\u0111\u01b0\u1edd\u006e\u0067";

export type MapSectionProps = {
  className?: string;
  subtitle?: string;
  title?: string;
};

export function MapSection({
  className,
  subtitle = DEFAULT_SUBTITLE,
  title = DEFAULT_TITLE
}: MapSectionProps) {
  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="map-section">
      <Container>
        <div className="wedding-panel overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
                  Location
                </p>
                <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
                  {title}
                </h2>
                <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                  {subtitle}
                </p>
              </div>

              <div className="mt-8">
                <a
                  className="wedding-button-secondary inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition sm:min-h-12"
                  href={weddingData.mapsDirectionsUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {DIRECTIONS_LABEL}
                </a>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <div className="wedding-panel-soft overflow-hidden rounded-[1.6rem]">
                <iframe
                  className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[30rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={weddingData.mapsEmbedUrl}
                  title={title}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
