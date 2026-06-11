"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

// ── Cấu hình ─────────────────────────────────────────────────────────────────
// Dùng chung Apps Script URL với RSVP (cùng 1 Google Sheet, khác sheet tab)
// Hoặc tạo Script riêng cho Wishes — xem file google-apps-script-wishes.js
const WISHES_API_URL = "https://script.google.com/macros/s/AKfycbzhgC-cuuM2A01DUc3aYtkEhZcdcLTgrIw3HpARsPG7Z7exWVsoTwge-iiYSOJo-uHTkQ/exec"; // << Dán URL Apps Script vào đây

// ── Avatar helpers ────────────────────────────────────────────────────────────
const PALETTES = [
  { bg: "rgba(188,138,148,0.18)", text: "#a66b78" },
  { bg: "rgba(199,165,109,0.18)", text: "#ae8754" },
  { bg: "rgba(125,87,79,0.12)",   text: "#7d574f" },
  { bg: "rgba(166,107,120,0.15)", text: "#9b5c6a" },
  { bg: "rgba(155,140,110,0.16)", text: "#7a6a4a" },
] as const;

function getPalette(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return PALETTES[Math.abs(h) % PALETTES.length];
}

function getInitials(name: string) {
  const p = name.trim().split(/\s+/);
  return p.length === 1 ? p[0].slice(0, 2).toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Wish = { id: string; author: string; message: string; isNew?: boolean };

function makeId() {
  return `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

type FetchState = "idle" | "loading" | "ok" | "error";

// ── Component ─────────────────────────────────────────────────────────────────
export type WishesSectionProps = { className?: string };

export function WishesSection({ className }: WishesSectionProps) {
  // Seed với sample wishes từ data
  const [wishes, setWishes] = useState<Wish[]>(() =>
    weddingData.sampleWishes.map((w, i) => ({ ...w, id: `seed-${i}` }))
  );
  const [fetchState, setFetchState] = useState<FetchState>(WISHES_API_URL ? "loading" : "idle");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ author?: string; message?: string }>({});
  const [sending, setSending] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [feedVisible, setFeedVisible] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const feedTopRef = useRef<HTMLDivElement>(null);

  // ── Scroll reveal ───────────────────────────────────────────────────────────
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === headerRef.current && e.isIntersecting) setHeaderVisible(true);
          if (e.target === feedRef.current && e.isIntersecting) setFeedVisible(true);
        });
      },
      { threshold: 0.07 }
    );
    if (headerRef.current) io.observe(headerRef.current);
    if (feedRef.current) io.observe(feedRef.current);
    return () => io.disconnect();
  }, []);

  // ── Fetch wishes từ Google Sheets ───────────────────────────────────────────
  const fetchWishes = useCallback(async () => {
    if (!WISHES_API_URL) return;
    setFetchState("loading");
    try {
      const res = await fetch(`${WISHES_API_URL}?action=getWishes`);
      const data = await res.json() as { wishes: Array<{ author: string; message: string }> };
      if (data.wishes?.length) {
        setWishes(data.wishes.map((w, i) => ({ ...w, id: `remote-${i}` })));
      }
      setFetchState("ok");
    } catch {
      setFetchState("error");
    }
  }, []);

  useEffect(() => { fetchWishes(); }, [fetchWishes]);

  // ── Validate ────────────────────────────────────────────────────────────────
  function validate() {
    const e: typeof errors = {};
    if (!author.trim()) e.author = "Vui lòng nhập tên.";
    if (!message.trim()) e.message = "Vui lòng nhập lời chúc.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!validate()) return;
    setSending(true);

    const newWish: Wish = {
      id: makeId(),
      author: author.trim(),
      message: message.trim(),
      isNew: true,
    };

    // Optimistic update — hiện ngay lập tức
    setWishes((prev) => [newWish, ...prev]);
    setAuthor("");
    setMessage("");
    setErrors({});

    try {
      if (WISHES_API_URL) {
        await fetch(WISHES_API_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "addWish",
            author: newWish.author,
            message: newWish.message,
            timestamp: new Date().toISOString(),
          }),
        });
        // Refetch sau 1.5s để đồng bộ với Sheet
        setTimeout(fetchWishes, 1500);
      }
    } catch {
      // Optimistic update vẫn giữ nguyên dù lỗi mạng
    } finally {
      setSending(false);
      setJustSent(true);
      setTimeout(() => setJustSent(false), 3000);
      // Scroll lên đầu feed để thấy lời chúc mới
      setTimeout(() => feedTopRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    }
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
            Gửi lời chúc đến cô dâu &amp; chú rể — lưu lại và hiển thị ngay trên trang!
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">

          {/* ── Bubble feed ─────────────────────────────────────── */}
          <div ref={feedRef} className="flex flex-col gap-4">
            <div ref={feedTopRef} />

            {/* Loading state */}
            {fetchState === "loading" && (
              <div className="flex items-center justify-center gap-2 py-8 text-sm text-[color:var(--muted)]">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                </svg>
                Đang tải lời chúc…
              </div>
            )}

            {/* Error state */}
            {fetchState === "error" && (
              <div className="rounded-2xl border border-[rgba(192,97,79,0.2)] bg-[rgba(192,97,79,0.05)] px-5 py-4 text-sm text-[#a14b3b]">
                Không tải được lời chúc. Hiển thị dữ liệu mẫu.
              </div>
            )}

            {/* Bubbles */}
            {wishes.map((wish, index) => {
              const palette = getPalette(wish.author);
              const isRight = index % 2 === 1;
              const isVisible = feedVisible || wish.isNew;

              return (
                <div
                  key={wish.id}
                  className={cn(
                    "flex items-end gap-3 transition-all ease-out",
                    isRight && "flex-row-reverse",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
                    wish.isNew ? "duration-300" : "duration-500"
                  )}
                  style={{ transitionDelay: wish.isNew ? "0ms" : `${Math.min(index * 75, 450)}ms` }}
                >
                  {/* Avatar */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                    style={{ background: palette.bg, color: palette.text }}
                    aria-hidden="true"
                  >
                    {getInitials(wish.author)}
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
                    <p className="mt-1.5 text-[0.65rem] uppercase tracking-[0.28em]" style={{ color: palette.text }}>
                      {wish.author}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* End of feed */}
            {wishes.length > 0 && (
              <div className="flex items-center gap-3 py-2 opacity-40">
                <div className="h-px flex-1 bg-[color:var(--border)]" />
                <span className="font-script text-lg text-[color:var(--accent-rose-deep)]">♡</span>
                <div className="h-px flex-1 bg-[color:var(--border)]" />
              </div>
            )}
          </div>

          {/* ── Form ────────────────────────────────────────────── */}
          <div
            className={cn(
              "sticky top-28 overflow-hidden rounded-[1.75rem] border border-[rgba(199,165,109,0.28)]",
              "bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(252,244,239,0.96))]",
              "p-6 shadow-[0_24px_60px_rgba(125,87,79,0.11)] sm:p-7",
              "transition-all duration-700 ease-out",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="mb-5 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.6),transparent)]" />

            <p className="font-script text-[1.8rem] leading-tight text-[color:var(--foreground)]">
              Gửi lời chúc
            </p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">
              {WISHES_API_URL
                ? "Lời chúc được lưu lại và hiển thị cho mọi người"
                : "Lời chúc hiển thị ngay — kết nối Google Sheets để lưu lại"}
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

            <button
              type="button"
              onClick={handleSubmit}
              disabled={sending}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold tracking-[0.1em] transition hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed wedding-button-primary"
            >
              {sending ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  Đang gửi…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" />
                  </svg>
                  Gửi lời chúc
                </>
              )}
            </button>

            {/* Toast */}
            <div
              aria-live="polite"
              role="status"
              className={cn(
                "mt-3 flex items-center gap-2 rounded-xl border border-[rgba(199,165,109,0.22)] bg-[rgba(199,165,109,0.08)] px-4 py-2.5 text-xs text-[color:var(--primary-strong)] transition-all duration-300",
                justSent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
              )}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12.5l5.5 5.5L20 7" />
              </svg>
              {WISHES_API_URL ? "Đã lưu lời chúc! Cảm ơn bạn ♡" : "Lời chúc đã xuất hiện! ♡"}
            </div>

            {/* Wish count */}
            <p className="mt-4 text-center text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              {wishes.length} lời chúc gửi đến cô dâu &amp; chú rể
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function WishField({ children, error, htmlFor, label }: {
  children: ReactNode; error?: string; htmlFor: string; label: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--primary)]">
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
