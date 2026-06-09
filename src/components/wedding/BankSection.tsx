"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
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
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,_rgba(255,255,255,0.92),_rgba(247,239,226,0.94))] shadow-[0_24px_80px_rgba(86,66,32,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="border-b border-[color:var(--border)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
                {SECTION_EYEBROW}
              </p>
              <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
                {SECTION_TITLE}
              </h2>
              <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                {SECTION_SUBTITLE}
              </p>

              <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-white/80 p-4 shadow-[0_18px_50px_rgba(86,66,32,0.06)] sm:rounded-[1.75rem] sm:p-6">
                <div className="relative mx-auto aspect-square max-w-[16rem] overflow-hidden rounded-[1.25rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(247,239,226,0.92))] p-4 sm:max-w-[18rem] sm:rounded-[1.5rem]">
                  <Image
                    alt={weddingData.bankQr.qrImage.alt}
                    className="object-contain"
                    fill
                    sizes="(min-width: 1024px) 22rem, 70vw"
                    src={weddingData.bankQr.qrImage.src}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailCard
                  label="\u004e\u0067\u00e2\u006e\u0020\u0068\u00e0\u006e\u0067"
                  value={weddingData.bankQr.bankName}
                />
                <DetailCard
                  label="\u0043\u0068\u1ee7\u0020\u0074\u00e0\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e"
                  value={weddingData.bankQr.accountName}
                />
              </div>

              <div className="mt-4 rounded-[1.75rem] border border-[color:var(--border)] bg-white/80 p-5 shadow-[0_18px_50px_rgba(86,66,32,0.06)] sm:p-6">
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--primary)]">
                  {"\u0053\u1ed1\u0020\u0074\u00e0\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e"}
                </p>
                <p className="mt-4 break-all font-display text-[2rem] leading-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
                  {weddingData.bankQr.accountNumber}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 py-3 text-sm font-medium text-[color:var(--primary-foreground)] transition hover:opacity-90 sm:min-h-12"
                    onClick={handleCopy}
                    type="button"
                  >
                    {COPY_LABEL}
                  </button>

                  <p
                    aria-live="polite"
                    className={cn(
                      "text-sm text-[color:var(--foreground)] transition",
                      isCopied ? "opacity-100" : "opacity-0"
                    )}
                    role="status"
                  >
                    {COPIED_MESSAGE}
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
    <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/80 p-5 shadow-[0_18px_50px_rgba(86,66,32,0.06)] sm:p-6">
      <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--primary)]">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)] sm:text-base">
        {value}
      </p>
    </div>
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
