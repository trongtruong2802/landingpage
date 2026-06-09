"use client";

import type { ComponentProps } from "react";
import Image from "next/image";
import { useEffect, useEffectEvent, useState } from "react";

import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

export type GallerySectionProps = {
  className?: string;
  eyebrow?: string;
  subtitle?: string;
  title?: string;
};

const DEFAULT_EYEBROW = "Wedding Gallery";
const DEFAULT_TITLE = "Nhung khoanh khac duoc sap dat thanh mot bo suu tap thanh lich";
const DEFAULT_SUBTITLE =
  "Album anh cuoi duoc hien thi theo phong cach editorial wedding album, giu duoc nhip lon nho xen ke tren desktop va van gon gang, de doc tren mobile.";
const FALLBACK_ALBUM_SRC = "/images/album/album-placeholder.svg";

const editorialLayouts = [
  {
    card: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
    frame: "aspect-[4/5] sm:aspect-[16/10] lg:h-full lg:min-h-[36rem]",
    titleClass: "sm:max-w-lg"
  },
  {
    card: "lg:col-span-2 lg:row-span-1",
    frame: "aspect-[4/5] sm:aspect-[4/5] lg:h-full lg:min-h-[17rem]",
    titleClass: "sm:max-w-xs"
  },
  {
    card: "lg:col-span-2 lg:row-span-1",
    frame: "aspect-[4/5] sm:aspect-[4/5] lg:h-full lg:min-h-[17rem]",
    titleClass: "sm:max-w-xs"
  },
  {
    card: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
    frame: "aspect-[4/5] sm:aspect-[16/10] lg:h-full lg:min-h-[32rem]",
    titleClass: "sm:max-w-lg"
  }
] as const;

export function GallerySection({
  className,
  eyebrow = DEFAULT_EYEBROW,
  subtitle = DEFAULT_SUBTITLE,
  title = DEFAULT_TITLE
}: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const totalPhotos = weddingData.album.length;
  const selectedPhoto = selectedIndex !== null ? (weddingData.album[selectedIndex] ?? null) : null;

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    setSelectedIndex((current) =>
      current === null || totalPhotos === 0 ? current : (current - 1 + totalPhotos) % totalPhotos
    );
  };

  const goToNext = () => {
    setSelectedIndex((current) =>
      current === null || totalPhotos === 0 ? current : (current + 1) % totalPhotos
    );
  };

  const handleLightboxKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }

    if (event.key === "ArrowLeft") {
      goToPrevious();
    }

    if (event.key === "ArrowRight") {
      goToNext();
    }
  });

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      handleLightboxKeyDown(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="gallery">
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

        {totalPhotos > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-6 lg:gap-5">
            {weddingData.album.map((photo, index) => {
              const layout = editorialLayouts[index % editorialLayouts.length];

              return (
                <button
                  aria-label={`Xem anh lon: ${photo.alt}`}
                  className={cn(
                    "group wedding-fade-in relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.72)] text-left shadow-[0_24px_64px_rgba(125,87,79,0.1)] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-rose)]/30 sm:rounded-[2rem] lg:hover:-translate-y-1 lg:hover:shadow-[0_34px_88px_rgba(125,87,79,0.16)]",
                    layout.card,
                    index === 0 ? "wedding-fade-in-delay-1" : "",
                    index === 1 ? "wedding-fade-in-delay-2" : "",
                    index >= 2 ? "wedding-fade-in-delay-3" : ""
                  )}
                  key={`${photo.src}-${index}`}
                  onClick={() => setSelectedIndex(index)}
                  type="button"
                >
                  <div className={cn("relative overflow-hidden", layout.frame)}>
                    <SafeGalleryImage
                      alt={photo.alt}
                      className="object-cover object-center transition duration-700 ease-out lg:group-hover:scale-[1.06]"
                      fill
                      sizes="(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw"
                      src={photo.src}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,28,26,0.06)_0%,rgba(45,28,26,0)_42%,rgba(45,28,26,0.62)_100%)]" />

                    <div className="absolute left-4 top-4 rounded-full border border-white/28 bg-[rgba(255,255,255,0.16)] px-3 py-2 text-[0.64rem] uppercase tracking-[0.3em] text-white/92 backdrop-blur-md sm:left-5 sm:top-5">
                      Editorial {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
                      <div className="rounded-[1.3rem] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-4 shadow-[0_16px_38px_rgba(26,16,13,0.16)] backdrop-blur-md sm:rounded-[1.6rem] sm:p-5">
                        <p className="text-[0.64rem] uppercase tracking-[0.32em] text-white/72">
                          Wedding Album
                        </p>
                        <h3
                          className={cn(
                            "mt-3 font-display text-[1.3rem] leading-tight text-white sm:text-[1.65rem]",
                            layout.titleClass
                          )}
                        >
                          {photo.alt}
                        </h3>
                        {photo.caption ? (
                          <p className="mt-3 max-w-xl text-sm leading-7 text-white/84">
                            {photo.caption}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="wedding-panel-soft mt-12 rounded-[2rem] px-6 py-12 text-center">
            <p className="font-display text-[1.8rem] text-[color:var(--foreground)] sm:text-[2.4rem]">
              Album se duoc cap nhat som
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Hien tai gallery chua co anh hop le. Section nay van giu bo cuc an toan
              de khong lam vo trang.
            </p>
          </div>
        )}
      </Container>

      {selectedPhoto ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(22,14,12,0.84)] px-4 py-4 backdrop-blur-md sm:px-6 sm:py-6"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
        >
          <div
            className="relative flex w-full max-w-6xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 text-white/84">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/72">
                {String((selectedIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(totalPhotos).padStart(2, "0")}
              </p>

              <button
                aria-label="Dong xem anh"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-[rgba(255,255,255,0.08)] text-lg text-white transition hover:bg-[rgba(255,255,255,0.14)]"
                onClick={() => setSelectedIndex(null)}
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[rgba(255,250,244,0.08)] p-2 shadow-[0_32px_100px_rgba(0,0,0,0.22)] sm:p-3">
              <div className="relative min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[rgba(255,248,244,0.08)] sm:min-h-[22rem] lg:min-h-[34rem]">
                <SafeGalleryImage
                  alt={selectedPhoto.alt}
                  className="object-contain object-center"
                  fill
                  key={selectedPhoto.src}
                  sizes="100vw"
                  src={selectedPhoto.src}
                />

                {totalPhotos > 1 ? (
                  <>
                    <button
                      aria-label="Xem anh truoc"
                      className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-[rgba(255,255,255,0.1)] text-lg text-white backdrop-blur-md transition hover:bg-[rgba(255,255,255,0.18)] sm:left-5 sm:h-12 sm:w-12"
                      onClick={goToPrevious}
                      type="button"
                    >
                      <span aria-hidden="true">{"\u2039"}</span>
                    </button>

                    <button
                      aria-label="Xem anh tiep theo"
                      className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-[rgba(255,255,255,0.1)] text-lg text-white backdrop-blur-md transition hover:bg-[rgba(255,255,255,0.18)] sm:right-5 sm:h-12 sm:w-12"
                      onClick={goToNext}
                      type="button"
                    >
                      <span aria-hidden="true">{"\u203A"}</span>
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            <div className="mx-auto max-w-3xl text-center text-white">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-white/66">
                Editorial Wedding Album
              </p>
              <h3 className="mt-3 font-display text-[1.8rem] leading-tight sm:text-[2.6rem]">
                {selectedPhoto.alt}
              </h3>
              {selectedPhoto.caption ? (
                <p className="mt-3 text-sm leading-7 text-white/82 sm:text-base">
                  {selectedPhoto.caption}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

type SafeGalleryImageProps = Omit<ComponentProps<typeof Image>, "src"> & {
  alt: string;
  src: string;
};

function SafeGalleryImage({ src, ...props }: SafeGalleryImageProps) {
  const { alt, ...imageProps } = props;
  const [resolvedSrc, setResolvedSrc] = useState(getSafeImageSrc(src));

  return (
    <Image
      {...imageProps}
      alt={alt}
      onError={() => {
        if (resolvedSrc !== FALLBACK_ALBUM_SRC) {
          setResolvedSrc(FALLBACK_ALBUM_SRC);
        }
      }}
      src={resolvedSrc}
    />
  );
}

function getSafeImageSrc(src: string) {
  return src.trim() ? src : FALLBACK_ALBUM_SRC;
}
