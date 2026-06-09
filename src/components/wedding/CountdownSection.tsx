"use client";

import { useEffect, useEffectEvent, useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const CELEBRATION_TEXT =
  "\u004e\u0067\u00e0\u0079\u0020\u0068\u1ea1\u006e\u0068\u0020\u0070\u0068\u00fa\u0063\u0020\u0111\u00e3\u0020\u0111\u1ebf\u006e";
const DEFAULT_TITLE =
  "\u0110\u1ebf\u006d\u0020\u006e\u0067\u01b0\u1ee3\u0063\u0020\u0111\u1ebf\u006e\u0020\u006e\u0067\u00e0\u0079\u0020\u0074\u0068\u00e0\u006e\u0068\u0020\u0068\u00f4\u006e";
const DEFAULT_SUBTITLE =
  "\u004d\u1ed7\u0069\u0020\u006b\u0068\u006f\u1ea3\u006e\u0068\u0020\u006b\u0068\u1eaf\u0063\u0020\u0111\u1ec1\u0075\u0020\u0111\u0061\u006e\u0067\u0020\u0111\u01b0\u0061\u0020\u0063\u1ea3\u0020\u0068\u0061\u0069\u0020\u0111\u1ebf\u006e\u0020\u0067\u1ea7\u006e\u0020\u0068\u01a1\u006e\u0020\u0076\u1edb\u0069\u0020\u006e\u0067\u00e0\u0079\u0020\u0111\u1eb7\u0063\u0020\u0062\u0069\u1ec7\u0074\u002e";

const countdownLabels = {
  days: "\u004e\u0067\u00e0\u0079",
  hours: "\u0047\u0069\u1edd",
  minutes: "\u0050\u0068\u00fa\u0074",
  seconds: "\u0047\u0069\u00e2\u0079"
} as const;

type CountdownState = {
  days: number;
  hasElapsed: boolean;
  hours: number;
  minutes: number;
  seconds: number;
};

export type CountdownSectionProps = {
  celebrationText?: string;
  className?: string;
  targetDate: string;
  targetDateLabel?: string;
  title?: string;
  subtitle?: string;
};

const emptyCountdown: CountdownState = {
  days: 0,
  hasElapsed: false,
  hours: 0,
  minutes: 0,
  seconds: 0
};

export function CountdownSection({
  celebrationText = CELEBRATION_TEXT,
  className,
  targetDate,
  targetDateLabel,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE
}: CountdownSectionProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>(emptyCountdown);

  const updateCountdown = useEffectEvent(() => {
    setCountdown(getCountdownState(targetDate));
    setHasMounted(true);
  });

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      updateCountdown();
    });

    const intervalId = window.setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearInterval(intervalId);
    };
  }, [targetDate]);

  const displayUnits = [
    {
      label: countdownLabels.days,
      value: hasMounted ? formatUnit(countdown.days) : "00"
    },
    {
      label: countdownLabels.hours,
      value: hasMounted ? formatUnit(countdown.hours) : "00"
    },
    {
      label: countdownLabels.minutes,
      value: hasMounted ? formatUnit(countdown.minutes) : "00"
    },
    {
      label: countdownLabels.seconds,
      value: hasMounted ? formatUnit(countdown.seconds) : "00"
    }
  ];

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="countdown">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,_rgba(255,255,255,0.92),_rgba(246,236,216,0.95))] p-5 shadow-[0_30px_90px_rgba(86,66,32,0.08)] sm:rounded-[2.25rem] sm:p-8 lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(205,176,105,0.18),_transparent_48%)]" />
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.45),_transparent_66%)] blur-2xl" />

          <div className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
                Countdown
              </p>
              <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
                {title}
              </h2>
              <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                {subtitle}
              </p>
              {targetDateLabel ? (
                <p className="mt-5 text-[0.72rem] uppercase tracking-[0.3em] text-[color:var(--foreground)]/75">
                  {targetDateLabel}
                </p>
              ) : null}
            </div>

            {hasMounted && countdown.hasElapsed ? (
              <div className="wedding-fade-in wedding-fade-in-delay-3 mt-8 rounded-[1.5rem] border border-[color:var(--border)] bg-white/75 px-5 py-10 text-center backdrop-blur-sm sm:px-8">
                <p className="font-display text-[2rem] text-[color:var(--foreground)] sm:text-5xl">
                  {celebrationText}
                </p>
              </div>
            ) : (
              <div
                aria-live="polite"
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4"
                role="timer"
              >
                {displayUnits.map((unit, index) => (
                  <div
                    className={cn(
                      "wedding-fade-in rounded-[1.35rem] border border-[color:var(--border)] bg-white/78 px-3 py-5 text-center backdrop-blur-sm sm:rounded-[1.6rem] sm:px-5 sm:py-8",
                      index === 0 ? "wedding-fade-in-delay-1" : "",
                      index === 1 ? "wedding-fade-in-delay-2" : "",
                      index >= 2 ? "wedding-fade-in-delay-3" : ""
                    )}
                    key={unit.label}
                  >
                    <p className="font-display text-4xl leading-none text-[color:var(--foreground)] sm:text-6xl">
                      {unit.value}
                    </p>
                    <p className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--primary)] sm:mt-3 sm:tracking-[0.35em]">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function formatUnit(value: number) {
  return value.toString().padStart(2, "0");
}

function getCountdownState(targetDate: string): CountdownState {
  const targetTime = new Date(targetDate).getTime();

  if (!Number.isFinite(targetTime)) {
    return {
      ...emptyCountdown,
      hasElapsed: true
    };
  }

  const difference = targetTime - Date.now();

  if (difference <= 0) {
    return {
      ...emptyCountdown,
      hasElapsed: true
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / (60 * 60 * 24)),
    hasElapsed: false,
    hours: Math.floor(totalSeconds / (60 * 60)) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60
  };
}
