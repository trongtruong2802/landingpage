"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { SafeImage } from "@/components/ui/SafeImage";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

const STORY_FALLBACK = "/images/story/story-placeholder.svg";

// ── Component ─────────────────────────────────────────────────────────────────

export type LoveStorySectionProps = { className?: string };

export function LoveStorySection({ className }: LoveStorySectionProps) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    if (headerRef.current) io.observe(headerRef.current);
    return () => io.disconnect();
  }, []);

  const entries = weddingData.loveStory;

  return (
    <section
      className={cn("relative py-16 sm:py-20 lg:py-28 overflow-hidden", className)}
      id="love-story"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(188,138,148,0.07),transparent_70%)] blur-3xl" />
        <div className="absolute -right-20 bottom-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(199,165,109,0.07),transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(252,244,238,0.6),transparent_70%)] blur-3xl" />
      </div>

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
            Love Story
          </p>
          <h2 className="mt-3 font-script text-[3rem] leading-tight text-[color:var(--foreground)] sm:text-[3.8rem]">
            Hành trình của chúng mình
          </h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Từng khoảnh khắc nhỏ dẫn đến ngày hôm nay — một câu chuyện tình yêu được viết bằng thời gian.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-14 lg:mt-20">

          {/* Center spine — desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 lg:block"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(199,165,109,0.35) 8%, rgba(199,165,109,0.5) 50%, rgba(188,138,148,0.35) 92%, transparent 100%)"
            }}
          />

          {/* Left spine — mobile/tablet */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-5 top-0 w-px sm:left-7 lg:hidden"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(199,165,109,0.4) 6%, rgba(199,165,109,0.5) 50%, rgba(188,138,148,0.3) 94%, transparent 100%)"
            }}
          />

          <div className="space-y-10 sm:space-y-12 lg:space-y-0">
            {entries.map((item, index) => (
              <TimelineEntry key={`${item.date}-${index}`} item={item} index={index} total={entries.length} />
            ))}
          </div>
        </div>

        {/* End marker */}
        <div className="mt-12 flex flex-col items-center gap-3 lg:mt-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(199,165,109,0.36)] bg-[linear-gradient(145deg,rgba(255,252,247,0.96),rgba(248,231,223,0.96))] shadow-[0_16px_40px_rgba(125,87,79,0.14)]">
            <HeartIcon className="h-5 w-5 text-[color:var(--accent-rose-deep)]" />
          </div>
          <p className="font-script text-[1.5rem] text-[color:var(--accent-rose-deep)]">
            và mãi mãi...
          </p>
        </div>
      </Container>
    </section>
  );
}

// ── Timeline Entry ────────────────────────────────────────────────────────────

type TimelineEntryProps = {
  item: (typeof weddingData.loveStory)[number];
  index: number;
  total: number;
};

function TimelineEntry({ item, index, total }: TimelineEntryProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isRight = index % 2 === 1; // desktop: alternate sides
  const isLast = index === total - 1;

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        "relative",
        // Mobile: left-padded to make room for spine + dot
        "pl-14 sm:pl-20",
        // Desktop: grid with spine in center, alternate content sides
        "lg:grid lg:grid-cols-2 lg:pl-0",
        // Desktop spacing
        "lg:py-10",
        !isLast && "lg:pb-16"
      )}
    >
      {/* ── Center / left dot ─────────────────────────────────── */}
      {/* Mobile dot — left spine */}
      <div className="absolute left-5 top-8 -translate-x-1/2 sm:left-7 lg:hidden">
        <TimelineDot index={index} />
      </div>

      {/* Desktop dot — center spine */}
      <div className="absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 hidden lg:flex">
        <TimelineDot index={index} />
      </div>

      {/* ── Card placement ────────────────────────────────────── */}
      {/* Desktop: empty half for opposite side */}
      {isRight && <div className="hidden lg:block" />}

      {/* Card */}
      <div
        className={cn(
          "transition-all duration-700 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          // Desktop padding away from spine
          isRight ? "lg:pl-14 lg:pr-2" : "lg:pr-14 lg:pl-2"
        )}
        style={{ transitionDelay: `${index * 60}ms` }}
      >
        <StoryCard item={item} index={index} />
      </div>

      {/* Desktop: empty half for right-side cards */}
      {!isRight && <div className="hidden lg:block" />}
    </article>
  );
}

// ── Story Card ────────────────────────────────────────────────────────────────

function StoryCard({
  item,
  index,
}: {
  item: (typeof weddingData.loveStory)[number];
  index: number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-[rgba(199,165,109,0.26)] bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(252,244,239,0.96))] shadow-[0_20px_60px_rgba(125,87,79,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(125,87,79,0.15)]">
      {/* Top shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.55),transparent)]" />
      {/* Inner border */}
      <div className="pointer-events-none absolute inset-[7px] rounded-[1.35rem] border border-[rgba(199,165,109,0.10)]" />

      {/* Image */}
      {item.image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[1.7rem] sm:aspect-[2/1]">
          <SafeImage
            src={item.image.src}
            alt={item.image.alt}
            fallbackSrc={STORY_FALLBACK}
            fill
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 80vw, 90vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* Gradient over image */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,25,22,0.04)_0%,rgba(45,25,22,0)_40%,rgba(45,25,22,0.22)_100%)]" />

          {/* Date badge over image */}
          <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
            <DateBadge date={item.date} index={index} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative p-5 sm:p-6">
        {/* Date badge — no image variant */}
        {!item.image && (
          <div className="mb-4">
            <DateBadge date={item.date} index={index} />
          </div>
        )}

        {/* Chapter label */}
        <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[color:var(--accent-rose-deep)]">
          Chương {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="mt-2 font-display text-[1.45rem] leading-snug text-[color:var(--foreground)] sm:text-[1.7rem]">
          {item.title}
        </h3>

        {/* Divider */}
        <div className="my-4 h-px w-16 bg-[linear-gradient(90deg,rgba(199,165,109,0.6),transparent)]" />

        <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-[0.95rem]">
          {item.description}
        </p>

        {/* No-image: decorative quote mark */}
        {!item.image && (
          <div className="pointer-events-none absolute right-5 bottom-4 font-script text-[5rem] leading-none text-[rgba(199,165,109,0.08)] select-none">
            "
          </div>
        )}
      </div>
    </div>
  );
}

// ── Timeline Dot ──────────────────────────────────────────────────────────────

function TimelineDot({ index }: { index: number }) {
  // Alternate between rose and gold
  const isGold = index % 2 === 0;
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-[0_8px_24px_rgba(125,87,79,0.18)] z-10",
        isGold
          ? "bg-[linear-gradient(145deg,rgba(212,178,120,0.95),rgba(185,148,88,0.9))]"
          : "bg-[linear-gradient(145deg,rgba(200,152,164,0.95),rgba(172,112,128,0.9))]"
      )}
    >
      <HeartIcon className="h-4 w-4 text-white" />
      {/* Pulse ring */}
      <div className="absolute inset-0 animate-ping rounded-full opacity-20"
        style={{ background: isGold ? "rgba(199,165,109,0.5)" : "rgba(188,138,148,0.5)" }}
      />
    </div>
  );
}

// ── Date Badge ────────────────────────────────────────────────────────────────

function DateBadge({ date, index }: { date: string; index: number }) {
  const isGold = index % 2 === 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.63rem] font-medium uppercase tracking-[0.28em] backdrop-blur-sm",
        isGold
          ? "border-[rgba(199,165,109,0.40)] bg-[rgba(255,252,247,0.88)] text-[color:var(--primary-strong)]"
          : "border-[rgba(188,138,148,0.36)] bg-[rgba(255,248,250,0.88)] text-[color:var(--accent-rose-deep)]"
      )}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
      {date}
    </span>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.999 21.145a.75.75 0 0 1-.53-.22l-7.2-7.2a4.92 4.92 0 0 1 6.96-6.96L12 7.537l.771-.772a4.92 4.92 0 1 1 6.96 6.96l-7.2 7.2a.75.75 0 0 1-.532.22Z" />
    </svg>
  );
}
