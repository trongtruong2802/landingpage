"use client";

import type { ComponentProps } from "react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

const FALLBACK_SRC = "/images/album/album-placeholder.svg";
const INITIAL_VISIBLE = 6;

// Uniform grid aspect ratio: standard portrait aspect ratio for wedding photo albums
const galleryAspectClass = "aspect-[3/4]";

export type GallerySectionProps = {
  className?: string;
};

export function GallerySection({ className }: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const photos = weddingData.album;
  const displayedPhotos = showAll ? photos : photos.slice(0, INITIAL_VISIBLE);
  const hasMore = photos.length > INITIAL_VISIBLE;

  // Scroll-reveal with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [displayedPhotos.length]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft")
        setSelectedIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i === null ? null : (i + 1) % photos.length));
    },
    [selectedIndex, photos.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, selectedIndex]);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="gallery">
      <Container>
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.68rem] uppercase tracking-[0.42em] text-[color:var(--accent-rose-deep)]">
            Wedding Album
          </p>
          <h2 className="mt-4 font-script text-[3rem] leading-tight text-[color:var(--foreground)] sm:text-[4rem]">
            Những khoảnh khắc
          </h2>
          <p className="mt-2 font-display text-base italic text-[color:var(--muted)] sm:text-lg">
            được lưu giữ mãi mãi
          </p>
        </div>

        {/* Uniform responsive photo Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedPhotos.map((photo, index) => {
            const isVisible = visibleItems.has(index);

            return (
              <div
                key={`${photo.src}-${index}`}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-index={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-[rgba(199,165,109,0.20)] cursor-pointer",
                  "shadow-[0_12px_32px_rgba(125,87,79,0.06)] transition-all duration-500 ease-out",
                  "hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(125,87,79,0.14)]",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                  "[transition:opacity_600ms_ease,transform_600ms_ease,box-shadow_300ms_ease]"
                )}
                style={{ transitionDelay: `${(index % 3) * 80}ms` }}
                onClick={() => setSelectedIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`Xem ảnh: ${photo.alt}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedIndex(index);
                }}
              >
                {/* Image */}
                <div className={cn("relative w-full overflow-hidden bg-[color:var(--background-soft)]", galleryAspectClass)}>
                  <SafeGalleryImage
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,25,22,0.72)] via-[rgba(45,25,22,0.12)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Hover caption */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {photo.caption && (
                      <p className="font-display text-[0.85rem] italic leading-snug text-white/95 sm:text-[0.95rem]">
                        {photo.caption}
                      </p>
                    )}
                    <p className="mt-1 text-[0.58rem] uppercase tracking-[0.3em] text-white/70 sm:text-[0.62rem]">
                      Nhấn để xem lớn hơn
                    </p>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[rgba(255,255,255,0.12)] opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more button */}
        {hasMore && !showAll && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="wedding-button-secondary inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-medium tracking-[0.1em] transition-all hover:-translate-y-0.5"
            >
              <span>Xem tất cả {photos.length} ảnh</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </Container>

      {/* ── Lightbox ── */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(18,10,9,0.92)] backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh"
        >
          {/* Inner content — stop propagation */}
          <div
            className="relative flex w-full max-w-5xl flex-col items-center gap-5 px-4 py-6 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex w-full items-center justify-between">
              <span className="font-display text-[0.68rem] uppercase tracking-[0.38em] text-white/50">
                {String((selectedIndex ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </span>
              {/* Dot navigation */}
              <div className="flex items-center gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    aria-label={`Ảnh ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === selectedIndex
                        ? "w-5 bg-[color:var(--primary)]"
                        : "w-1.5 bg-white/30 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>
              {/* Close */}
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Đóng"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white/80 transition hover:bg-white/16"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image frame */}
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,250,244,0.04)]">
              <div className="relative aspect-[3/4] w-full max-h-[68vh] sm:max-h-[75vh] mx-auto">
                <SafeGalleryImage
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                  key={selectedPhoto.src}
                />
              </div>

              {/* Prev / Next */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length))}
                    aria-label="Ảnh trước"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-[rgba(18,10,9,0.54)] text-white backdrop-blur-md transition hover:bg-[rgba(18,10,9,0.72)] sm:h-12 sm:w-12"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex((i) => (i === null ? 0 : (i + 1) % photos.length))}
                    aria-label="Ảnh tiếp theo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-[rgba(18,10,9,0.54)] text-white backdrop-blur-md transition hover:bg-[rgba(18,10,9,0.72)] sm:h-12 sm:w-12"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="text-center">
              {selectedPhoto.caption && (
                <p className="font-display text-base italic text-white/80 sm:text-lg">
                  {selectedPhoto.caption}
                </p>
              )}
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.3em] text-white/36">
                {selectedPhoto.alt}
              </p>
            </div>

            {/* Keyboard hint */}
            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/24">
              ← → để chuyển ảnh &nbsp;·&nbsp; Esc để đóng
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// Safe image with fallback
type SafeGalleryImageProps = Omit<ComponentProps<typeof Image>, "src"> & {
  src: string;
  alt: string;
};

function SafeGalleryImage({ src, alt, ...props }: SafeGalleryImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState(src.trim() || FALLBACK_SRC);
  return (
    <Image
      {...props}
      src={resolvedSrc}
      alt={alt}
      onError={() => {
        if (resolvedSrc !== FALLBACK_SRC) setResolvedSrc(FALLBACK_SRC);
      }}
    />
  );
}
