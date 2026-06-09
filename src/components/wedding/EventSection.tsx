import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

const DEFAULT_EYEBROW = "Wedding Events";
const DEFAULT_TITLE = "Lich trinh nhung su kien quan trong trong ngay vui cua chung minh";
const DEFAULT_SUBTITLE =
  "Moi su kien duoc trinh bay thanh tung card rieng biet de de theo doi tren dien thoai, dong thoi van giu duoc cam giac sang trong va thanh lich tren man hinh lon.";
const VIEW_MAP_LABEL =
  "\u0058\u0065\u006d\u0020\u0062\u1ea3\u006e\u0020\u0111\u1ed3";

const eventTypeLabels = {
  ceremony: "Ceremony",
  reception: "Bride Side",
  "after-party": "Groom Side"
} as const;

export type EventSectionProps = {
  className?: string;
  eyebrow?: string;
  subtitle?: string;
  title?: string;
};

export function EventSection({
  className,
  eyebrow = DEFAULT_EYEBROW,
  subtitle = DEFAULT_SUBTITLE,
  title = DEFAULT_TITLE
}: EventSectionProps) {
  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="event-section">
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

        <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {weddingData.events.map((event, index) => (
            <article
              className={cn(
                "wedding-fade-in flex h-full flex-col rounded-[1.75rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,_rgba(255,255,255,0.92),_rgba(247,239,226,0.94))] p-5 shadow-[0_24px_80px_rgba(86,66,32,0.08)] sm:rounded-[2rem] sm:p-8",
                index === 0 ? "wedding-fade-in-delay-1" : "",
                index === 1 ? "wedding-fade-in-delay-2" : "",
                index >= 2 ? "wedding-fade-in-delay-3" : ""
              )}
              key={`${event.title}-${event.time}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.38em] text-[color:var(--primary)]">
                    {eventTypeLabels[event.type]}
                  </p>
                  <h3 className="mt-4 font-display text-[1.75rem] text-[color:var(--foreground)] sm:text-4xl">
                    {event.title}
                  </h3>
                </div>

                <div className="w-max rounded-full border border-[color:var(--border)] bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--foreground)]">
                  {event.time}
                </div>
              </div>

              <dl className="mt-6 grid gap-4">
                <DetailRow label="Ngay gio" value={`${event.date} - ${event.time}`} />
                <DetailRow label="Dia diem" value={event.venue} />
                <DetailRow label="Dia chi" value={event.address} />
              </dl>

              {event.description ? (
                <p className="mt-5 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                  {event.description}
                </p>
              ) : null}

              <div className="mt-6 pt-2">
                <a
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/85 px-5 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] sm:min-h-12"
                  href={event.mapUrl ?? buildGoogleMapsSearchUrl(event.venue, event.address)}
                  rel="noreferrer"
                  target="_blank"
                >
                  {VIEW_MAP_LABEL}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="rounded-[1.4rem] border border-[color:var(--border)] bg-white/75 p-4">
      <dt className="text-[0.68rem] uppercase tracking-[0.32em] text-[color:var(--primary)]">
        {label}
      </dt>
      <dd className="mt-3 text-sm leading-7 text-[color:var(--foreground)]">{value}</dd>
    </div>
  );
}

function buildGoogleMapsSearchUrl(venue: string, address: string) {
  const query = encodeURIComponent(`${venue}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
