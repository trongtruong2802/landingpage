"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";

import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

// ── Config ────────────────────────────────────────────────────────────────────
const WISHES_API_URL = "https://script.google.com/macros/s/AKfycbzhgC-cuuM2A01DUc3aYtkEhZcdcLTgrIw3HpARsPG7Z7exWVsoTwge-iiYSOJo-uHTkQ/exec"; // << Dán URL Apps Script vào đây
const FEED_HEIGHT_DESKTOP = "520px";
const FEED_HEIGHT_MOBILE  = "360px";

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
  return p.length === 1
    ? p[0].slice(0, 2).toUpperCase()
    : (p[0][0] + p[p.length - 1][0]).toUpperCase();
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Wish = { id: string; author: string; message: string; isNew?: boolean };
type FetchState = "idle" | "loading" | "ok" | "error";

function makeId() {
  return `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export type WishesSectionProps = { className?: string };

export function WishesSection({ className }: WishesSectionProps) {
  const sampleWishes = useMemo(() => {
    return weddingData.sampleWishes.map((w, i) => ({
      id: `sample-${i}`,
      author: w.author,
      message: w.message
    }));
  }, []);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>(
    WISHES_API_URL ? "loading" : "idle"
  );
  const [author, setAuthor]   = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors]   = useState<{ author?: string; message?: string }>({});
  const [sending, setSending] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [visible, setVisible]   = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  // Ref tới top của feed để scroll lên khi có lời chúc mới
  const feedTopRef = useRef<HTMLDivElement>(null);
  // Ref tới scroll container
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  // ── Scroll reveal ───────────────────────────────────────────────────────────
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.07 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // ── Fetch từ Google Sheets ──────────────────────────────────────────────────
  const fetchWishes = useCallback(async () => {
    if (!WISHES_API_URL) {
      setWishes(sampleWishes);
      setFetchState("ok");
      return;
    }
    setFetchState("loading");
    try {
      const res  = await fetch(`${WISHES_API_URL}?action=getWishes`);
      const data = await res.json() as { wishes: Array<{ author: string; message: string }> };
      if (data.wishes?.length) {
        setWishes(data.wishes.map((w, i) => ({ ...w, id: `remote-${i}` })));
      } else {
        setWishes(sampleWishes);
      }
      setFetchState("ok");
    } catch {
      setWishes(sampleWishes);
      setFetchState("error");
    }
  }, [sampleWishes]);

  useEffect(() => { fetchWishes(); }, [fetchWishes]);

  // ── Validate ────────────────────────────────────────────────────────────────
  function validate() {
    const e: typeof errors = {};
    if (!author.trim())  e.author  = "Vui lòng nhập tên.";
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

    // Optimistic — hiện ngay, scroll feed lên đầu để thấy lời chúc mới
    setWishes((prev) => [newWish, ...prev]);
    setAuthor("");
    setMessage("");
    setErrors({});

    // Scroll feed box về đầu
    setTimeout(() => {
      scrollBoxRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 80);

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
        setTimeout(fetchWishes, 1500);
      }
    } catch {
      // Optimistic update vẫn giữ
    } finally {
      setSending(false);
      setJustSent(true);
      setTimeout(() => setJustSent(false), 3000);
    }
  }

  return (
    <section
      ref={sectionRef}
      className={cn("relative py-16 sm:py-20 lg:py-24", className)}
      id="wishes-section"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(188,138,148,0.09),transparent_70%)] blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(199,165,109,0.09),transparent_70%)] blur-3xl" />
      </div>

      <Container>
        {/* Header */}
        <div
          className={cn(
            "mx-auto max-w-xl text-center transition-all duration-700 ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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

        {/* Body: feed + form */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">

          {/* ── Scroll feed ─────────────────────────────────────────── */}
          <div
            className={cn(
              "transition-all duration-700 ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "60ms" }}
          >
            {/* Feed header */}
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[color:var(--muted)]">
                {wishes.length} lời chúc
              </p>
              {fetchState === "loading" && (
                <span className="flex items-center gap-1.5 text-[0.68rem] text-[color:var(--muted)]">
                  <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  Đang tải…
                </span>
              )}
              {fetchState === "error" && (
                <span className="text-[0.68rem] text-[#a14b3b]">Không tải được, hiển thị mẫu</span>
              )}
            </div>

            {/* Scroll box */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(199,165,109,0.26)] bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(252,244,239,0.95))] shadow-[0_20px_56px_rgba(125,87,79,0.10)]">
              {/* Top fade — gợi ý còn nội dung phía trên */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-[linear-gradient(180deg,rgba(255,252,248,0.95),transparent)] rounded-t-[1.75rem]" />
              {/* Bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-[linear-gradient(0deg,rgba(252,244,239,0.95),transparent)] rounded-b-[1.75rem]" />

              {/* Scrollable area */}
              <div
                ref={scrollBoxRef}
                className="flex flex-col gap-4 overflow-y-auto px-5 py-5 sm:px-6"
                style={{
                  height: FEED_HEIGHT_MOBILE,
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(199,165,109,0.25) transparent",
                }}
              >
                <div ref={feedTopRef} />

                {wishes.map((wish, index) => {
                  const palette = getPalette(wish.author);
                  const isRight = index % 2 === 1;

                  return (
                    <div
                      key={wish.id}
                      className={cn(
                        "flex items-end gap-3",
                        isRight && "flex-row-reverse",
                        wish.isNew
                          ? "animate-[wishPop_0.35s_ease-out_both]"
                          : "opacity-100"
                      )}
                    >
                      {/* Avatar */}
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold"
                        style={{ background: palette.bg, color: palette.text }}
                        aria-hidden="true"
                      >
                        {getInitials(wish.author)}
                      </div>

                      {/* Bubble */}
                      <div
                        className={cn(
                          "max-w-[78%] rounded-2xl px-4 py-3",
                          "shadow-[0_2px_12px_rgba(125,87,79,0.07)]",
                          isRight
                            ? "rounded-br-sm bg-[linear-gradient(135deg,rgba(199,165,109,0.13),rgba(188,138,148,0.09))] border border-[rgba(199,165,109,0.22)]"
                            : "rounded-bl-sm bg-white/80 border border-[rgba(199,165,109,0.14)]"
                        )}
                      >
                        <p className="text-sm leading-relaxed text-[color:var(--foreground)]">
                          {wish.message}
                        </p>
                        <p
                          className="mt-1.5 text-[0.63rem] uppercase tracking-[0.24em]"
                          style={{ color: palette.text }}
                        >
                          {wish.author}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* End marker */}
                <div className="flex items-center gap-3 py-1 opacity-30">
                  <div className="h-px flex-1 bg-[color:var(--border)]" />
                  <span className="font-script text-base text-[color:var(--accent-rose-deep)]">♡</span>
                  <div className="h-px flex-1 bg-[color:var(--border)]" />
                </div>
              </div>

              {/* Scroll hint — chỉ hiện lần đầu nếu đủ nhiều lời chúc */}
              {wishes.length > 4 && (
                <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1 rounded-full border border-[rgba(199,165,109,0.20)] bg-white/80 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-[color:var(--muted)] backdrop-blur-sm">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                  cuộn để xem thêm
                </div>
              )}
            </div>
          </div>

          {/* ── Form ────────────────────────────────────────────────── */}
          <div
            className={cn(
              "sticky top-28 overflow-hidden rounded-[1.75rem] border border-[rgba(199,165,109,0.28)]",
              "bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(252,244,239,0.96))]",
              "p-6 shadow-[0_24px_60px_rgba(125,87,79,0.11)] sm:p-7",
              "transition-all duration-700 ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
          </div>
        </div>
      </Container>

      {/* Animation keyframe cho bubble mới */}
      <style>{`
        @keyframes wishPop {
          from { opacity: 0; transform: translateY(-10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
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


