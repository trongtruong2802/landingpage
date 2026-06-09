"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { SafeImage } from "@/components/ui/SafeImage";
import { weddingData } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

const SECTION_EYEBROW = "Wedding Gift";
const SECTION_TITLE =
  "\u004d\u1eeb\u006e\u0067\u0020\u0063\u01b0\u1edb\u0069\u0020\u0071\u0075\u0061\u0020\u006e\u0067\u00e2\u006e\u0020\u0068\u00e0\u006e\u0067";
const SECTION_SUBTITLE =
  "\u0051\u0075\u00e9\u0074\u0020\u0051\u0052\u0020\u0068\u006f\u1eb7\u0063\u0020\u0073\u1eed\u0020\u0064\u1ee5\u006e\u0067\u0020\u0074\u0068\u00f4\u006e\u0067\u0020\u0074\u0069\u006e\u0020\u0074\u00e0\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e\u0020\u0062\u00ea\u006e\u0020\u0064\u01b0\u1edb\u0069\u0020\u0111\u1ec3\u0020\u0067\u1eed\u0069\u0020\u006c\u1eddi\u0020\u0063\u0068\u00fa\u0063\u0020\u0111\u1ebf\u006e\u0020\u0063\u00f4\u0020\u0064\u00e2\u0075\u0020\u0076\u00e0\u0020\u0063\u0068\u00fa\u0020\u0072\u1ec3\u002e";
const COPY_LABEL =
  "\u0043\u006f\u0070\u0079\u0020\u0073\u1ed1\u0020\u0074\u00e0\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e";
const COPIED_MESSAGE =
  "\u0110\u00e3\u0020\u0063\u006f\u0070\u0079\u0020\u0073\u1ed1\u0020\u0074\u00e0\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e";
const ACCOUNT_NUMBER_LABEL =
  "\u0053\u1ed1\u0020\u0074\u00e0\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e";
const BANK_NAME_LABEL =
  "\u004e\u0067\u00e2\u006e\u0020\u0068\u00e0\u006e\u0067";
const ACCOUNT_NAME_LABEL =
  "\u0043\u0068\u1ee7\u0020\u0074\u00e0\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e";
const QR_FALLBACK_IMAGE = "/images/qr/bank-qr.svg";

export type BankSectionProps = {
  className?: string;
};

export function BankSection({ className }: BankSectionProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false);
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCopied]);

  const handleCopy = async () => {
    const accountNumber = weddingData.bankQr.accountNumber;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(accountNumber);
      } else {
        fallbackCopyText(accountNumber);
      }

      setIsCopied(true);
    } catch {
      fallbackCopyText(accountNumber);
      setIsCopied(true);
    }
  };

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="bank-section">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(199,165,109,0.34)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(250,242,233,0.96))] shadow-[0_30px_80px_rgba(137,107,82,0.12)]">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.72),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-12 h-32 w-32 rounded-full bg-[rgba(211,176,146,0.13)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-[rgba(199,165,109,0.12)] blur-3xl"
          />

          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative border-b border-[rgba(199,165,109,0.18)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-r-[rgba(199,165,109,0.18)] lg:p-10">
              <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
                {SECTION_EYEBROW}
              </p>
              <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
                {SECTION_TITLE}
              </h2>
              <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 max-w-lg text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                {SECTION_SUBTITLE}
              </p>

              <div className="relative mt-8 rounded-[1.9rem] border border-[rgba(199,165,109,0.22)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(252,245,239,0.88))] p-4 shadow-[0_24px_50px_rgba(154,121,98,0.08)] sm:p-5">
                <div className="rounded-[1.55rem] border border-[rgba(199,165,109,0.18)] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(247,238,230,0.92))] p-4 sm:p-5">
                  <div className="mx-auto max-w-[18rem]">
                    <div className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-[rgba(199,165,109,0.2)] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5">
                      <div className="relative h-full w-full overflow-hidden rounded-[1rem]">
                        <SafeImage
                          alt={weddingData.bankQr.qrImage.alt}
                          className="object-contain"
                          fallbackSrc={QR_FALLBACK_IMAGE}
                          fill
                          sizes="(min-width: 1024px) 19rem, (min-width: 640px) 16rem, 72vw"
                          src={weddingData.bankQr.qrImage.src}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <span className="rounded-full border border-[rgba(199,165,109,0.18)] bg-white/70 px-4 py-2 text-[0.72rem] uppercase tracking-[0.26em] text-[color:var(--primary)]">
                    QR Wedding Gift
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailCard label={BANK_NAME_LABEL} value={weddingData.bankQr.bankName} />
                <DetailCard label={ACCOUNT_NAME_LABEL} value={weddingData.bankQr.accountName} />
              </div>

              <div className="relative mt-4 overflow-hidden rounded-[1.9rem] border border-[rgba(199,165,109,0.22)] bg-[linear-gradient(180deg,rgba(255,252,247,0.92),rgba(255,255,255,0.82))] p-5 shadow-[0_20px_44px_rgba(154,121,98,0.08)] sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.78),transparent)]"
                />
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--primary)]">
                  {ACCOUNT_NUMBER_LABEL}
                </p>
                <p className="mt-4 break-all font-display text-[2rem] leading-tight text-[color:var(--foreground)] sm:text-[2.75rem] lg:text-[3.4rem]">
                  {weddingData.bankQr.accountNumber}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className="wedding-button-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] shadow-[0_18px_32px_rgba(171,137,89,0.24)] transition hover:-translate-y-0.5 sm:min-h-12"
                    onClick={handleCopy}
                    type="button"
                  >
                    <CopyIcon />
                    {COPY_LABEL}
                  </button>

                  <p
                    aria-live="polite"
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm transition sm:min-h-12",
                      isCopied
                        ? "border-[rgba(199,165,109,0.24)] bg-white/80 text-[color:var(--foreground)] opacity-100"
                        : "border-transparent bg-transparent text-[color:var(--muted)] opacity-70"
                    )}
                    role="status"
                  >
                    {isCopied ? COPIED_MESSAGE : COPY_LABEL}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

type DetailCardProps = {
  label: string;
  value: string;
};

function DetailCard({ label, value }: DetailCardProps) {
  return (
    <div className="rounded-[1.55rem] border border-[rgba(199,165,109,0.18)] bg-[rgba(255,255,255,0.76)] p-5 shadow-[0_14px_30px_rgba(154,121,98,0.06)] backdrop-blur-sm sm:p-6">
      <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--primary)]">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)] sm:text-base">
        {value}
      </p>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 9.75C9 8.92157 9.67157 8.25 10.5 8.25H17.25C18.0784 8.25 18.75 8.92157 18.75 9.75V18C18.75 18.8284 18.0784 19.5 17.25 19.5H10.5C9.67157 19.5 9 18.8284 9 18V9.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M6.75 15.75H6C5.17157 15.75 4.5 15.0784 4.5 14.25V6C4.5 5.17157 5.17157 4.5 6 4.5H14.25C15.0784 4.5 15.75 5.17157 15.75 6V6.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function fallbackCopyText(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
