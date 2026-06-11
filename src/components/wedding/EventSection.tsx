"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

// ── Labels ────────────────────────────────────────────────────────────────────

const eventConfig = {
  ceremony: {
    label: "Lễ gia tiên",
    badge: "Nghi lễ",
    accentClass: "bg-[rgba(166,107,120,0.12)] text-[color:var(--accent-rose-deep)] border-[rgba(166,107,120,0.28)]",
    dotClass: "bg-[color:var(--accent-rose-deep)]",
    lineClass: "from-[color:var(--accent-rose-deep)]",
    icon: <RingsIcon />,
  },
  reception: {
    label: "Tiệc cưới nhà gái",
    badge: "Nhà gái",
    accentClass: "bg-[rgba(199,165,109,0.12)] text-[color:var(--primary-strong)] border-[rgba(199,165,109,0.32)]",
    dotClass: "bg-[color:var(--primary)]",
    lineClass: "from-[color:var(--primary)]",
    icon: <FlowerIcon />,
  },
  "after-party": {
    label: "Tiệc cưới nhà trai",
    badge: "Nhà trai",
    accentClass: "bg-[rgba(125,87,79,0.1)] text-[color:var(--foreground)] border-[rgba(125,87,79,0.2)]",
    dotClass: "bg-[color:var(--foreground)]",
    lineClass: "from-[color:var(--foreground)]",
    icon: <CandleIcon />,
  },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────

export type EventSectionProps = {
  className?: string;
};

export function EventSection({ className }: EventSectionProps) {
  const events = weddingData.events;
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = (entry.target as HTMLElement).dataset.index;
            if (idx !== undefined) {
              setVisibleItems((prev) => new Set([...prev, Number(idx)]));
            }
            if (entry.target === headerRef.current) {
              setHeaderVisible(true);
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-28 overflow-hidden", className)} id="event-section">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(199,165,109,0.10),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(188,138,148,0.10),transparent_70%)] blur-3xl" />

      <Container>
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "mx-auto max-w-xl text-center transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <p className="text-[0.66rem] uppercase tracking-[0.44em] text-[color:var(--accent-rose-deep)]">
            Lịch trình
          </p>
          <h2 className="mt-3 font-script text-[3rem] leading-tight text-[color:var(--foreground)] sm:text-[3.8rem]">
            Ngày trọng đại
          </h2>
          <p className="mt-2 font-display text-sm italic text-[color:var(--muted)] sm:text-base">
            {weddingData.weddingDate.display}
          </p>
        </div>

        {/* ── Timeline ──────────────────────────────────────────────────── */}
        <div className="relative mt-14 lg:mt-20">

          {/* Horizontal connector line — desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 hidden lg:block"
            style={{ top: "2.75rem" }}>
            <div className="mx-auto flex items-center" style={{ maxWidth: "100%" }}>
              {events.map((event, i) => {
                const cfg = eventConfig[event.type];
                return (
                  <div key={i} className="flex flex-1 items-center">
                    {/* segment line */}
                    {i > 0 && (
                      <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--border)] to-[color:var(--border)]" />
                    )}
                    {/* dot */}
                    <div className={cn("h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[color:var(--background)] shadow-md", cfg.dotClass)} />
                    {i < events.length - 1 && (
                      <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--border)] to-[color:var(--border)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid gap-6 sm:gap-7 lg:grid-cols-3">
            {events.map((event, index) => {
              const cfg = eventConfig[event.type];
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={`${event.title}-${index}`}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  data-index={index}
                  className={cn(
                    "transition-all ease-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                    index === 0 && "duration-[600ms]",
                    index === 1 && "duration-[700ms] lg:delay-[120ms]",
                    index === 2 && "duration-[800ms] lg:delay-[240ms]"
                  )}
                >
                  {/* Step number — mobile/tablet */}
                  <div className="mb-4 flex items-center gap-3 lg:flex-col lg:items-center lg:gap-2 lg:mb-6">
                    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tracking-wider lg:hidden", cfg.accentClass)}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className={cn("h-px flex-1 lg:hidden", "bg-[color:var(--border)]")} />
                  </div>

                  {/* Card */}
                  <article className="group relative overflow-hidden rounded-[1.6rem] border border-[rgba(199,165,109,0.28)] bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(252,244,238,0.96))] p-6 shadow-[0_20px_60px_rgba(125,87,79,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(125,87,79,0.16)] sm:p-7">
                    {/* Decorative inner border */}
                    <div className="pointer-events-none absolute inset-[8px] rounded-[1.2rem] border border-[rgba(199,165,109,0.14)]" />

                    {/* Top: badge + icon */}
                    <div className="relative flex items-start justify-between gap-3">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.28em]", cfg.accentClass)}>
                        {cfg.badge}
                      </span>
                      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border", cfg.accentClass)}>
                        <span className="h-4.5 w-4.5">{cfg.icon}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="relative mt-5 font-display text-[1.5rem] leading-snug text-[color:var(--foreground)] sm:text-[1.75rem]">
                      {event.title}
                    </h3>

                    {/* Divider */}
                    <div className="relative mt-4 mb-5 h-px bg-gradient-to-r from-[rgba(199,165,109,0.3)] via-[rgba(199,165,109,0.12)] to-transparent" />

                    {/* Details */}
                    <dl className="relative space-y-3">
                      <EventDetail icon={<CalendarIcon />} value={event.date} />
                      <EventDetail icon={<ClockIcon />} value={event.time} />
                      <EventDetail icon={<VenueIcon />} value={event.venue} />
                      <EventDetail icon={<PinIcon />} value={event.address} muted />
                    </dl>

                    {/* Description */}
                    {event.description && (
                      <p className="relative mt-5 text-sm leading-relaxed text-[color:var(--muted)]">
                        {event.description}
                      </p>
                    )}

                    {/* CTA */}
                    <div className="relative mt-6">
                      <a
                        href={event.mapUrl ?? buildMapsUrl(event.venue, event.address)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,165,109,0.36)] bg-white/80 px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[color:var(--foreground)] shadow-[0_8px_24px_rgba(125,87,79,0.08)] transition-all hover:border-[color:var(--primary)] hover:bg-white hover:shadow-[0_12px_32px_rgba(125,87,79,0.14)]"
                      >
                        <PinIcon className="text-[color:var(--primary-strong)]" />
                        Chỉ đường
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </a>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lunar date note */}
        {weddingData.weddingDate.lunar && (
          <p className="mt-10 text-center text-[0.68rem] uppercase tracking-[0.32em] text-[color:var(--muted)]">
            ✦ Âm lịch: {weddingData.weddingDate.lunar} ✦
          </p>
        )}
      </Container>
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function EventDetail({
  icon,
  value,
  muted = false,
}: {
  icon: React.ReactNode;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[color:var(--primary-strong)]">
        {icon}
      </span>
      <dd className={cn("text-sm leading-snug", muted ? "text-[color:var(--muted)]" : "text-[color:var(--foreground)]")}>
        {value}
      </dd>
    </div>
  );
}

function buildMapsUrl(venue: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue}, ${address}`)}`;
}

// ── Icons ─────────────────────────────────────────────────────────────────────

type IconProps = { className?: string };

function CalendarIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24">
      <path d="M7 3.75v2.5M17 3.75v2.5M4.75 8.25h14.5M6.5 5.75h11A1.75 1.75 0 0 1 19.25 7.5v10A1.75 1.75 0 0 1 17.5 19.25h-11A1.75 1.75 0 0 1 4.75 17.5v-10A1.75 1.75 0 0 1 6.5 5.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24">
      <path d="M12 6.75v5.25l3.25 1.95M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function PinIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24">
      <path d="M12 20.25s6-5.04 6-10a6 6 0 1 0-12 0c0 4.96 6 10 6 10Zm0-7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function VenueIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24">
      <path d="M3 21h18M4.75 21V8.75l7.25-5 7.25 5V21M9.75 21v-6h4.5v6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function RingsIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle cx="8" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 5.2c1.2-2.3 4.6-2.2 5.6.2 1 2.5-1 4.6-3.2 5.1 2.3.1 4.4 2.2 3.9 4.8-.6 2.7-3.8 3.7-5.7 1.9.7 2.2-.5 4.9-3 5.3-2.8.5-4.8-1.9-4.4-4.4-1.7 1.8-4.9 1.2-5.6-1.4-.8-2.8 1.4-5 4-5.4-2.2-.4-4-2.5-3.2-5 .8-2.5 4.2-2.8 5.6-.6.5-2.4 3.5-3.3 5-.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <circle cx="12" cy="12" fill="currentColor" r="1.5" />
    </svg>
  );
}

function CandleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 3c0 0-2 2-2 3.5S11 9 12 9s2-1 2-2.5S12 3 12 3ZM9 10h6v11H9z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M7 21h10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}
