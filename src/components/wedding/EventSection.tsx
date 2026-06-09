import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

const DEFAULT_EYEBROW = "Wedding Events";
const DEFAULT_TITLE = "Lich trinh nhung su kien quan trong trong ngay vui cua chung minh";
const DEFAULT_SUBTITLE =
  "Moi su kien duoc trinh bay thanh tung card rieng biet de de theo doi tren dien thoai, dong thoi van giu duoc cam giac sang trong va thanh lich tren man hinh lon.";
const VIEW_MAP_LABEL =
  "\u0043\u0068\u1ec9\u0020\u0111\u01b0\u1edd\u006e\u0067";

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
          <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--accent-rose-deep)]">
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
                "wedding-fade-in relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[rgba(199,165,109,0.38)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(252,243,237,0.96))] p-5 shadow-[0_28px_72px_rgba(125,87,79,0.12)] sm:rounded-[2rem] sm:p-8",
                index === 0 ? "wedding-fade-in-delay-1" : "",
                index === 1 ? "wedding-fade-in-delay-2" : "",
                index >= 2 ? "wedding-fade-in-delay-3" : ""
              )}
              key={`${event.title}-${event.time}`}
            >
              <div className="pointer-events-none absolute inset-[10px] rounded-[1.3rem] border border-[rgba(199,165,109,0.22)] sm:rounded-[1.6rem]" />
              <div className="pointer-events-none absolute left-6 top-0 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(188,138,148,0.12),transparent_70%)] blur-2xl" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(199,165,109,0.14),transparent_70%)] blur-2xl" />

              <div className="relative flex h-full flex-col">
                <div className="flex flex-col gap-4 border-b border-[rgba(199,165,109,0.2)] pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.38em] text-[color:var(--accent-rose-deep)]">
                      Invitation Card
                    </p>
                    <p className="mt-3 text-[0.68rem] uppercase tracking-[0.38em] text-[color:var(--primary)]">
                      {eventTypeLabels[event.type]}
                    </p>
                    <h3 className="mt-4 font-display text-[1.75rem] leading-tight text-[color:var(--foreground)] sm:text-[2.35rem]">
                      {event.title}
                    </h3>
                  </div>

                  <div className="inline-flex w-max items-center gap-2 rounded-full border border-[rgba(199,165,109,0.28)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(125,87,79,0.08)]">
                    <FlowerIcon className="h-3.5 w-3.5 text-[color:var(--accent-rose-deep)]" />
                    {event.time}
                  </div>
                </div>

                <dl className="mt-6 grid gap-3">
                  <DetailRow
                    icon={<CalendarIcon className="h-4.5 w-4.5 text-[color:var(--primary-strong)]" />}
                    label="Ngay"
                    value={event.date}
                  />
                  <DetailRow
                    icon={<ClockIcon className="h-4.5 w-4.5 text-[color:var(--primary-strong)]" />}
                    label="Gio"
                    value={event.time}
                  />
                  <DetailRow
                    icon={<PinIcon className="h-4.5 w-4.5 text-[color:var(--primary-strong)]" />}
                    label="Dia diem"
                    value={event.venue}
                  />
                  <DetailRow
                    icon={<PinIcon className="h-4.5 w-4.5 text-[color:var(--accent-rose-deep)]" />}
                    label="Dia chi"
                    value={event.address}
                  />
                </dl>

                {event.description ? (
                  <p className="mt-6 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                    {event.description}
                  </p>
                ) : null}

                <div className="mt-6 pt-2">
                  <a
                    className="wedding-button-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition sm:min-h-12"
                    href={event.mapUrl ?? buildGoogleMapsSearchUrl(event.venue, event.address)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <PinIcon className="h-4 w-4" />
                    {VIEW_MAP_LABEL}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

type DetailRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="rounded-[1.35rem] border border-[rgba(199,165,109,0.18)] bg-[rgba(255,255,255,0.72)] p-4 shadow-[0_12px_30px_rgba(125,87,79,0.08)] backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(199,165,109,0.12)]">
          {icon}
        </span>

        <div>
          <dt className="text-[0.68rem] uppercase tracking-[0.32em] text-[color:var(--primary)]">
            {label}
          </dt>
          <dd className="mt-2 text-sm leading-7 text-[color:var(--foreground)]">{value}</dd>
        </div>
      </div>
    </div>
  );
}

function buildGoogleMapsSearchUrl(venue: string, address: string) {
  const query = encodeURIComponent(`${venue}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

type IconProps = {
  className?: string;
};

function CalendarIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 3.75v2.5M17 3.75v2.5M4.75 8.25h14.5M6.5 5.75h11A1.75 1.75 0 0 1 19.25 7.5v10A1.75 1.75 0 0 1 17.5 19.25h-11A1.75 1.75 0 0 1 4.75 17.5v-10A1.75 1.75 0 0 1 6.5 5.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 6.75v5.25l3.25 1.95M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PinIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 20.25s6-5.04 6-10a6 6 0 1 0-12 0c0 4.96 6 10 6 10Zm0-7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FlowerIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 5.2c1.2-2.3 4.6-2.2 5.6.2 1 2.5-1 4.6-3.2 5.1 2.3.1 4.4 2.2 3.9 4.8-.6 2.7-3.8 3.7-5.7 1.9.7 2.2-.5 4.9-3 5.3-2.8.5-4.8-1.9-4.4-4.4-1.7 1.8-4.9 1.2-5.6-1.4-.8-2.8 1.4-5 4-5.4-2.2-.4-4-2.5-3.2-5 .8-2.5 4.2-2.8 5.6-.6.5-2.4 3.5-3.3 5-.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" fill="currentColor" r="1.8" />
    </svg>
  );
}
