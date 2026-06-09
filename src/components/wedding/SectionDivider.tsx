import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export type SectionDividerProps = {
  className?: string;
};

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative py-2 sm:py-3", className)}
    >
      <Container>
        <div className="mx-auto flex max-w-3xl items-center gap-3 sm:gap-5">
          <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.48))]" />

          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-[rgba(211,176,146,0.18)] blur-xl" />
            <svg
              className="relative h-8 w-24 text-[color:var(--primary)] sm:h-10 sm:w-28"
              fill="none"
              viewBox="0 0 160 44"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 22C28 22 32 10 48 10C64 10 68 22 80 22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeOpacity="0.72"
                strokeWidth="1.5"
              />
              <path
                d="M154 22C132 22 128 10 112 10C96 10 92 22 80 22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeOpacity="0.72"
                strokeWidth="1.5"
              />
              <path
                d="M6 22C28 22 32 34 48 34C64 34 68 22 80 22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeOpacity="0.38"
                strokeWidth="1.2"
              />
              <path
                d="M154 22C132 22 128 34 112 34C96 34 92 22 80 22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeOpacity="0.38"
                strokeWidth="1.2"
              />
              <path
                d="M80 12C84.2 15.8 84.2 20.5 80 24C75.8 20.5 75.8 15.8 80 12Z"
                fill="currentColor"
                fillOpacity="0.78"
              />
              <path
                d="M70 22C73.4 17.7 77.4 17 80 22C77.4 27 73.4 26.3 70 22Z"
                fill="currentColor"
                fillOpacity="0.48"
              />
              <path
                d="M90 22C86.6 17.7 82.6 17 80 22C82.6 27 86.6 26.3 90 22Z"
                fill="currentColor"
                fillOpacity="0.48"
              />
            </svg>
          </div>

          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(199,165,109,0.48),transparent)]" />
        </div>
      </Container>
    </div>
  );
}
