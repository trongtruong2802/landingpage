"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import type { SampleWish } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

// ── Avatar color palette (romantic tones) ─────────────────────────────────────
const AVATAR_PALETTES = [
  { bg: "rgba(188,138,148,0.18)", text: "#a66b78" },  // rose
  { bg: "rgba(199,165,109,0.18)", text: "#ae8754" },  // gold
  { bg: "rgba(125,87,79,0.12)",   text: "#7d574f" },  // brown
  { bg: "rgba(166,107,120,0.15)", text: "#9b5c6a" },  // deep rose
  { bg: "rgba(155,140,110,0.16)", text: "#7a6a4a" },  // warm olive
] as const;

function getPalette(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ── Types ─────────────────────────────────────────────────────────────────────
type WishItem = SampleWish & { id: string; isNew?: boolean };

function createId() {
  return `wish-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export type WishesSectionProps = { className?: string };

export function WishesSection({ className }: WishesSectionProps) {
  const [wishes, setWishes] = useState<WishItem[]>(() =>
    weddingData.sampleWishes.map((w, i) => ({ ...w, id: `sample-${i}` }))
  );
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ author?: string; message?: string }>({});
  const [justSent, setJustSent] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [bubblesVisible, setBubblesVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const listBottomRef = useRef<HTMLDivElement>(null);

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === headerRef.current && e.isIntersecting) setHeaderVisible(true);
          if (e.target === bubblesRef.current && e.isIntersecting) setBubblesVisible(true);
        });
      },
      { threshold: 0.08 }
    );
    if (headerRef.current) io.observe(headerRef.current);
    if (bubblesRef.current) io.observe(bubblesRef.current);
    return () => io.disconnect();
  }, []);

  function validate() {
    const next: typeof errors = {};
    if (!author.trim()) next.author = "Vui lòng nhập tên.";
    if (!message.trim()) next.message = "Vui lòng nhập lời chúc.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const newWish: WishItem = {
      id: createId(),
      author: author.trim(),
      message: message.trim(),
      isNew: true,
    };
    setWishes((prev) => [newWish, ...prev]);
    setAuthor("");
    setMessage("");
    setErrors({});
    setJustSent(true);
    setTimeout(() => setJustSent(false), 3000);
    // Scroll danh sách lên để thấy lời chúc mới
    setTimeout(() => listBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
  }

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="wishes-section">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(188,138,148,0.09),transparent_70%)] blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(199,165,109,0.09),transparent_70%)] blur-3xl" />
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
            Sweet Wishes
          </p>
          <h2 className="mt-3 font-script text-[3rem] leading-tight text-[color:var(--foreground)] sm:text-[3.8rem]">
            Lời chúc yêu thương
          </h2>
          <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
            Gửi lời chúc đến cô dâu &amp; chú rể — xuất hiện ngay bên dưới!
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">

          {/* ── Bubble feed ───────────────────────────────────────── */}
          <div
            ref={bubblesRef}
            className="flex flex-col gap-4"
          >
            <div ref={listBottomRef} />
            {wishes.map((wish, index) => {
              const palette = getPalette(wish.author);
              const initials = getInitials(wish.author);
              // Alternate sides: even = left (từ khách), odd = right (style reply)
              const isRight = index % 2 === 1;
              const delay = Math.min(index * 80, 480);
              const isVisible = bubblesVisible || wish.isNew;

              return (
                <div
                  key={wish.id}
                  className={cn(
                    "flex items-end gap-3 transition-all duration-500 ease-out",
                    isRight && "flex-row-reverse",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5",
                    wish.isNew && "duration-300"
                  )}
                  style={{ transitionDelay: wish.isNew ? "0ms" : `${delay}ms` }}
                >
                  {/* Avatar */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                    style={{ background: palette.bg, color: palette.text }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>

                  {/* Bubble */}
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-4 py-3 shadow-[0_4px_20px_rgba(125,87,79,0.08)]",
                      isRight
                        ? "rounded-br-sm bg-[linear-gradient(135deg,rgba(199,165,109,0.14),rgba(188,138,148,0.10))] border border-[rgba(199,165,109,0.24)]"
                        : "rounded-bl-sm bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(252,244,239,0.94))] border border-[color:var(--border)]"
                    )}
                  >
                    <p className="text-sm leading-relaxed text-[color:var(--foreground)]">
                      {wish.message}
                    </p>
                    <p
                      className="mt-1.5 text-[0.65rem] uppercase tracking-[0.28em]"
                      style={{ color: palette.text }}
                    >
                      {wish.author}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Decorative end-of-feed */}
            {wishes.length > 0 && (
              <div className="flex items-center gap-3 py-2 opacity-40">
                <div className="h-px flex-1 bg-[color:var(--border)]" />
                <span className="font-script text-lg text-[color:var(--accent-rose-deep)]">♡</span>
                <div className="h-px flex-1 bg-[color:var(--border)]" />
              </div>
            )}
          </div>

          {/* ── Form ─────────────────────────────────────────────── */}
          <div
            className={cn(
              "sticky top-28 overflow-hidden rounded-[1.75rem] border border-[rgba(199,165,109,0.28)] bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(252,244,239,0.96))] p-6 shadow-[0_24px_60px_rgba(125,87,79,0.11)] transition-all duration-700 ease-out sm:p-7",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "120ms" }}
          >
            {/* Top shimmer */}
            <div className="mb-5 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.6),transparent)]" />

            <p className="font-script text-[1.8rem] leading-tight text-[color:var(--foreground)]">
              Gửi lời chúc
            </p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">
              Lời chúc sẽ xuất hiện ngay lập tức
            </p>

            <div className="mt-5 space-y-4">
              <WishField label="Tên của bạn" htmlFor="wish-name" error={errors.author}>
                <input
                  id="wish-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nguyễn Thị Hoa"
                  value={author}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setAuthor(e.target.value);
                    setErrors((p) => ({ ...p, author: undefined }));
                  }}
                  className={fieldCls(!!errors.author)}
                />
              </WishField>

              <WishField label="Lời chúc" htmlFor="wish-message" error={errors.message}>
                <textarea
                  id="wish-message"
                  rows={4}
                  placeholder="Chúc hai bạn trăm năm hạnh phúc…"
                  value={message}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setMessage(e.target.value);
                    setErrors((p) => ({ ...p, message: undefined }));
                  }}
                  className={cn(fieldCls(!!errors.message), "resize-none")}
                />
              </WishField>
            </div>

            {/* Submit */}
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="wedding-button-primary inline-flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold tracking-[0.1em] transition hover:-translate-y-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" />
                </svg>
                Gửi lời chúc
              </button>
            </div>

            {/* Success toast */}
            <div
              aria-live="polite"
              className={cn(
                "mt-3 flex items-center gap-2 rounded-xl border border-[rgba(199,165,109,0.22)] bg-[rgba(199,165,109,0.08)] px-4 py-2.5 text-xs text-[color:var(--primary-strong)] transition-all duration-300",
                justSent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
              )}
              role="status"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12.5l5.5 5.5L20 7" />
              </svg>
              Lời chúc đã được gửi! Cảm ơn bạn ♡
            </div>

            {/* Wish count */}
            <p className="mt-4 text-center text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              {wishes.length} lời chúc đã gửi đến cô dâu &amp; chú rể
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function WishField({
  children,
  error,
  htmlFor,
  label,
}: {
  children: ReactNode;
  error?: string;
  htmlFor: string;
  label: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--primary)]"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#a14b3b]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function fieldCls(hasError: boolean) {
  return cn(
    "w-full rounded-[1rem] border bg-[rgba(255,252,247,0.9)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition",
    "placeholder:text-[color:var(--muted)]/55",
    "focus:border-[color:var(--accent-rose)] focus:ring-2 focus:ring-[rgba(188,138,148,0.14)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
    hasError ? "border-[#c0614f]" : "border-[rgba(199,165,109,0.20)]"
  );
}
