"use client";

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
  "Album anh cuoi duoc hien thi theo dang grid toi gian, sang va de cham tren mobile. Tren desktop, bo cuc mo rong thanh 3 cot de tao nhip thi giac sang trong hon.";

export function GallerySection({
  className,
  eyebrow = DEFAULT_EYEBROW,
  subtitle = DEFAULT_SUBTITLE,
  title = DEFAULT_TITLE
}: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto = selectedIndex !== null ? weddingData.album[selectedIndex] : null;

  const handleEscapeClose = useEffectEvent(() => {
    setSelectedIndex(null);
  });

  const closeModal = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleEscapeClose();
      }
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

        <div className="mt-10 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3">
          {weddingData.album.map((photo, index) => (
            <button
              aria-label={`Xem anh lon: ${photo.alt}`}
              className="group wedding-fade-in overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,_rgba(255,255,255,0.9),_rgba(248,241,229,0.92))] text-left shadow-[0_20px_60px_rgba(86,66,32,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(86,66,32,0.12)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/35 sm:rounded-[1.75rem]"
              key={photo.src}
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              <div className="relative aspect-[4/5] overflow-hidden min-[520px]:aspect-[4/4.7]">
                <Image
                  alt={photo.alt}
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 520px) 50vw, 100vw"
                  src={photo.src}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,18,11,0.02)_0%,rgba(26,18,11,0)_38%,rgba(26,18,11,0.4)_100%)]" />
              </div>

              <div className="p-4 sm:p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.35em] text-[color:var(--primary)]">
                  Album {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl leading-tight text-[color:var(--foreground)] sm:text-2xl">
                  {photo.alt}
                </h3>
                {photo.caption ? (
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {photo.caption}
                  </p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </Container>

      {selectedPhoto ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,15,10,0.72)] px-4 py-4 backdrop-blur-md sm:py-6"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-[rgba(255,251,244,0.96)] shadow-[0_30px_100px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Dong xem anh"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[rgba(45,37,26,0.72)] text-lg text-white transition hover:bg-[rgba(45,37,26,0.9)]"
              onClick={closeModal}
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative aspect-[4/5] min-h-[16rem] bg-[rgba(239,231,216,0.55)] sm:min-h-[22rem]">
                <Image
                  alt={selectedPhoto.alt}
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  src={selectedPhoto.src}
                />
              </div>

              <div className="flex flex-col justify-end p-6 sm:p-8">
                <p className="text-[0.68rem] uppercase tracking-[0.38em] text-[color:var(--primary)]">
                  Preview
                </p>
                <h3 className="mt-4 font-display text-[2rem] leading-tight text-[color:var(--foreground)] sm:text-4xl">
                  {selectedPhoto.alt}
                </h3>
                {selectedPhoto.caption ? (
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                    {selectedPhoto.caption}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
