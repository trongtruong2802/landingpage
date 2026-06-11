"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

// ── Cấu hình Google Sheets ────────────────────────────────────────────────────
// Hướng dẫn kết nối Google Sheets:
// 1. Tạo Google Sheet mới
// 2. Vào Extensions > Apps Script
// 3. Dán script từ /docs/google-apps-script.js
// 4. Deploy > New deployment > Web app > Execute as Me > Anyone
// 5. Copy URL và dán vào GOOGLE_SHEET_URL bên dưới
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzcljrDAnfLkM0JCc4iRao4tjSpai0_O-14ezgP-HaB-_3agycjx8Lau3Dvdo-ktlt_/exec"; // << Dán URL Apps Script vào đây

// ── Types ─────────────────────────────────────────────────────────────────────

type AttendanceValue = "yes" | "no";

type Step1Values = {
  fullName: string;
  phone: string;
  attendance: AttendanceValue;
};

type Step2Values = {
  guestCount: number;
  event: "bride" | "groom" | "both";
  message: string;
};

type FormErrors = Partial<Record<keyof Step1Values, string>>;

// ── Component ─────────────────────────────────────────────────────────────────

export type RSVPSectionProps = { className?: string };

export function RSVPSection({ className }: RSVPSectionProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [step1, setStep1] = useState<Step1Values>({
    fullName: "",
    phone: "",
    attendance: "yes",
  });

  const [step2, setStep2] = useState<Step2Values>({
    guestCount: 1,
    event: "both",
    message: "",
  });

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Validate bước 1
  function validateStep1(): boolean {
    const next: FormErrors = {};
    if (!step1.fullName.trim()) next.fullName = "Vui lòng nhập họ tên.";
    const phoneRaw = step1.phone.replace(/\s/g, "");
    if (!phoneRaw) {
      next.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^(0|\+84)[3-9]\d{8}$/.test(phoneRaw)) {
      next.phone = "Số điện thoại VN chưa đúng định dạng.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (validateStep1()) setStep(2);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    const payload = {
      timestamp: new Date().toISOString(),
      fullName: step1.fullName.trim(),
      phone: step1.phone.trim(),
      attendance: step1.attendance === "yes" ? "Có mặt" : "Vắng mặt",
      guestCount: step1.attendance === "yes" ? step2.guestCount : 0,
      event: step1.attendance === "yes"
        ? ({ bride: "Nhà gái", groom: "Nhà trai", both: "Cả hai" }[step2.event])
        : "—",
      message: step2.message.trim(),
    };

    try {
      if (GOOGLE_SHEET_URL) {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Dev mode: log to console
        console.log("📋 RSVP payload:", payload);
        await new Promise((r) => setTimeout(r, 800)); // simulate delay
      }
      setIsDone(true);
    } catch {
      setIsDone(true); // vẫn hiện success vì no-cors không throw lỗi thật
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className={cn("relative py-16 sm:py-20 lg:py-24", className)}
      id="rsvp-section"
      ref={sectionRef}
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(188,138,148,0.10),transparent_70%)] blur-3xl" />
        <div className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(199,165,109,0.10),transparent_70%)] blur-3xl" />
      </div>

      <Container>
        <div
          className={cn(
            "transition-all duration-700 ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Header */}
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[0.66rem] uppercase tracking-[0.44em] text-[color:var(--accent-rose-deep)]">
              RSVP
            </p>
            <h2 className="mt-3 font-script text-[3rem] leading-tight text-[color:var(--foreground)] sm:text-[3.8rem]">
              Xác nhận tham dự
            </h2>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              Sự hiện diện của bạn là món quà quý giá nhất với chúng mình.
            </p>
          </div>

          {/* Card */}
          <div className="mx-auto mt-10 max-w-lg overflow-hidden rounded-[2rem] border border-[rgba(199,165,109,0.30)] bg-[linear-gradient(160deg,rgba(255,255,255,0.99),rgba(252,243,237,0.97))] shadow-[0_32px_80px_rgba(125,87,79,0.13)]">
            {/* Top shimmer line */}
            <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.7),transparent)]" />

            {isDone ? (
              <SuccessScreen name={step1.fullName} />
            ) : (
              <>
                {/* Step indicator */}
                <div className="flex items-center gap-3 px-7 pt-7">
                  <StepDot active={step >= 1} done={step > 1} label="1" />
                  <div className="h-px flex-1 bg-[color:var(--border)]" />
                  <StepDot active={step >= 2} done={false} label="2" />
                </div>

                <div className="p-7 sm:p-8">
                  {step === 1 ? (
                    <Step1
                      values={step1}
                      errors={errors}
                      onChange={(field, val) => {
                        setStep1((prev) => ({ ...prev, [field]: val }));
                        setErrors((prev) => ({ ...prev, [field]: undefined }));
                      }}
                      onNext={handleNext}
                    />
                  ) : (
                    <Step2
                      values={step2}
                      attendance={step1.attendance}
                      isSubmitting={isSubmitting}
                      onChange={(field, val) =>
                        setStep2((prev) => ({ ...prev, [field]: val }))
                      }
                      onBack={() => setStep(1)}
                      onSubmit={handleSubmit}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Step 1: Thông tin cơ bản ──────────────────────────────────────────────────

function Step1({
  values,
  errors,
  onChange,
  onNext,
}: {
  values: Step1Values;
  errors: FormErrors;
  onChange: (field: keyof Step1Values, val: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="font-display text-[1.4rem] text-[color:var(--foreground)]">Thông tin của bạn</p>
        <p className="mt-1 text-sm text-[color:var(--muted)]">Bước 1 / 2 — Điền thông tin cơ bản</p>
      </div>

      <FormField label="Họ và tên" htmlFor="rsvp-name" error={errors.fullName}>
        <input
          id="rsvp-name"
          type="text"
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          value={values.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          className={inputCls(errors.fullName)}
        />
      </FormField>

      <FormField label="Số điện thoại" htmlFor="rsvp-phone" error={errors.phone}>
        <input
          id="rsvp-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="09xxxxxxxx"
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className={inputCls(errors.phone)}
        />
      </FormField>

      {/* Attendance toggle */}
      <div>
        <p className="mb-3 text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--primary)]">
          Bạn có tham dự không?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(["yes", "no"] as const).map((val) => (
            <label
              key={val}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[1.2rem] border p-4 transition-all duration-200",
                values.attendance === val
                  ? "border-[color:var(--primary)] bg-[rgba(199,165,109,0.08)] shadow-[0_8px_24px_rgba(199,165,109,0.14)]"
                  : "border-[color:var(--border)] bg-white/60 hover:border-[rgba(199,165,109,0.5)]"
              )}
            >
              <input
                type="radio"
                name="attendance"
                value={val}
                checked={values.attendance === val}
                onChange={(e) => onChange("attendance", e.target.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  values.attendance === val
                    ? "border-[color:var(--primary)] bg-[color:var(--primary)]"
                    : "border-[color:var(--border)]"
                )}
              >
                {values.attendance === val && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
              <span className="text-sm font-medium text-[color:var(--foreground)]">
                {val === "yes" ? "✓  Có mặt" : "✗  Vắng mặt"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="wedding-button-primary inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold tracking-[0.12em] transition hover:-translate-y-0.5"
      >
        Tiếp theo
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

// ── Step 2: Chi tiết ──────────────────────────────────────────────────────────

function Step2({
  values,
  attendance,
  isSubmitting,
  onChange,
  onBack,
  onSubmit,
}: {
  values: Step2Values;
  attendance: AttendanceValue;
  isSubmitting: boolean;
  onChange: (field: keyof Step2Values, val: number | string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const attending = attendance === "yes";

  return (
    <div className="space-y-5">
      <div>
        <p className="font-display text-[1.4rem] text-[color:var(--foreground)]">
          {attending ? "Chi tiết tham dự" : "Lời nhắn"}
        </p>
        <p className="mt-1 text-sm text-[color:var(--muted)]">Bước 2 / 2 — Gần xong rồi!</p>
      </div>

      {attending && (
        <>
          {/* Guest count */}
          <div>
            <p className="mb-3 text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Số người tham dự
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onChange("guestCount", Math.max(1, values.guestCount - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-lg text-[color:var(--foreground)] transition hover:border-[color:var(--primary)] hover:bg-[rgba(199,165,109,0.06)]"
                aria-label="Giảm"
              >−</button>
              <span className="min-w-[2rem] text-center font-display text-[1.6rem] text-[color:var(--foreground)]">
                {values.guestCount}
              </span>
              <button
                type="button"
                onClick={() => onChange("guestCount", Math.min(10, values.guestCount + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-lg text-[color:var(--foreground)] transition hover:border-[color:var(--primary)] hover:bg-[rgba(199,165,109,0.06)]"
                aria-label="Tăng"
              >+</button>
              <span className="text-sm text-[color:var(--muted)]">người (kể cả bạn)</span>
            </div>
          </div>

          {/* Event selection */}
          <div>
            <p className="mb-3 text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Tham dự tiệc nào?
            </p>
            <div className="grid gap-2">
              {([
                { val: "bride", label: "🌸  Tiệc nhà gái — 21.12.2026 · 11:00" },
                { val: "groom", label: "🕯  Tiệc nhà trai — 21.12.2026 · 18:00" },
                { val: "both",  label: "✨  Cả hai tiệc" },
              ] as const).map(({ val, label }) => (
                <label
                  key={val}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-[1.1rem] border px-4 py-3 text-sm transition-all duration-200",
                    values.event === val
                      ? "border-[color:var(--primary)] bg-[rgba(199,165,109,0.07)] font-medium text-[color:var(--foreground)]"
                      : "border-[color:var(--border)] bg-white/60 text-[color:var(--muted)] hover:border-[rgba(199,165,109,0.5)]"
                  )}
                >
                  <input
                    type="radio"
                    name="event-pick"
                    value={val}
                    checked={values.event === val}
                    onChange={() => onChange("event", val)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      values.event === val ? "border-[color:var(--primary)] bg-[color:var(--primary)]" : "border-[color:var(--border)]"
                    )}
                  >
                    {values.event === val && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  {label}
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Message */}
      <FormField label="Lời chúc (tùy chọn)" htmlFor="rsvp-message">
        <textarea
          id="rsvp-message"
          rows={3}
          placeholder={attending ? "Gửi một lời chúc đến cô dâu và chú rể…" : "Rất tiếc khi không thể đến, chúc hai bạn…"}
          value={values.message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange("message", e.target.value)}
          className={cn(inputCls(), "resize-none")}
        />
      </FormField>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="wedding-button-secondary inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border text-sm font-medium transition hover:-translate-y-0.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Quay lại
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="wedding-button-primary inline-flex h-12 flex-[2] items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-[0.1em] transition hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
              </svg>
              Đang gửi…
            </>
          ) : (
            <>
              Gửi xác nhận
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center py-10 px-8 text-center">
      {/* Animated checkmark */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[color:var(--primary)] bg-[rgba(199,165,109,0.08)]">
        <svg className="h-9 w-9 text-[color:var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12.5l5.5 5.5L20 7" />
        </svg>
        <div className="absolute -inset-2 animate-ping rounded-full border border-[rgba(199,165,109,0.3)]" />
      </div>

      <h3 className="mt-6 font-script text-[2.2rem] leading-tight text-[color:var(--foreground)]">
        Cảm ơn, {name.split(" ").pop()}!
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-7 text-[color:var(--muted)]">
        Chúng mình đã nhận được xác nhận của bạn. Hẹn gặp bạn trong ngày vui!
      </p>
      <p className="mt-6 font-script text-[1.4rem] text-[color:var(--accent-rose-deep)]">
        Trân trọng kính mời ♡
      </p>
    </div>
  );
}

// ── UI helpers ────────────────────────────────────────────────────────────────

function StepDot({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300",
        done
          ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
          : active
          ? "border-[color:var(--primary)] bg-white text-[color:var(--primary)]"
          : "border-[color:var(--border)] bg-white text-[color:var(--muted)]"
      )}
    >
      {done ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12.5l5.5 5.5L20 7" />
        </svg>
      ) : label}
    </div>
  );
}

function FormField({
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
        className="block text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--primary)]"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#a14b3b]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(error?: string) {
  return cn(
    "w-full rounded-[1.2rem] border bg-[rgba(255,252,247,0.9)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted)]/60",
    "focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[rgba(199,165,109,0.16)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
    error ? "border-[#c0614f]" : "border-[rgba(199,165,109,0.22)]"
  );
}
