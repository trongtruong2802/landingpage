import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type PetalSize = "lg" | "md" | "sm";

type FloatingPetal = {
  delay: string;
  drift: string;
  duration: string;
  left: string;
  mobileVisible: boolean;
  opacity: number;
  rotate: string;
  scale: number;
  size: PetalSize;
};

const petals: FloatingPetal[] = [
  {
    left: "5%",
    duration: "17s",
    delay: "-2s",
    drift: "22px",
    rotate: "180deg",
    scale: 0.9,
    opacity: 0.44,
    size: "sm",
    mobileVisible: true
  },
  {
    left: "12%",
    duration: "19s",
    delay: "-6s",
    drift: "30px",
    rotate: "220deg",
    scale: 1,
    opacity: 0.52,
    size: "md",
    mobileVisible: true
  },
  {
    left: "21%",
    duration: "21s",
    delay: "-9s",
    drift: "26px",
    rotate: "260deg",
    scale: 1.08,
    opacity: 0.4,
    size: "lg",
    mobileVisible: false
  },
  {
    left: "31%",
    duration: "18s",
    delay: "-4s",
    drift: "18px",
    rotate: "160deg",
    scale: 0.92,
    opacity: 0.46,
    size: "sm",
    mobileVisible: true
  },
  {
    left: "39%",
    duration: "22s",
    delay: "-12s",
    drift: "34px",
    rotate: "280deg",
    scale: 1.12,
    opacity: 0.54,
    size: "lg",
    mobileVisible: false
  },
  {
    left: "47%",
    duration: "20s",
    delay: "-1s",
    drift: "24px",
    rotate: "200deg",
    scale: 0.94,
    opacity: 0.48,
    size: "md",
    mobileVisible: true
  },
  {
    left: "58%",
    duration: "23s",
    delay: "-8s",
    drift: "28px",
    rotate: "320deg",
    scale: 1.04,
    opacity: 0.5,
    size: "md",
    mobileVisible: false
  },
  {
    left: "66%",
    duration: "17s",
    delay: "-10s",
    drift: "20px",
    rotate: "190deg",
    scale: 0.88,
    opacity: 0.42,
    size: "sm",
    mobileVisible: true
  },
  {
    left: "74%",
    duration: "19s",
    delay: "-5s",
    drift: "30px",
    rotate: "260deg",
    scale: 1.1,
    opacity: 0.52,
    size: "lg",
    mobileVisible: false
  },
  {
    left: "83%",
    duration: "21s",
    delay: "-14s",
    drift: "26px",
    rotate: "210deg",
    scale: 0.96,
    opacity: 0.45,
    size: "md",
    mobileVisible: true
  },
  {
    left: "91%",
    duration: "18s",
    delay: "-3s",
    drift: "18px",
    rotate: "170deg",
    scale: 0.86,
    opacity: 0.38,
    size: "sm",
    mobileVisible: true
  },
  {
    left: "96%",
    duration: "24s",
    delay: "-11s",
    drift: "34px",
    rotate: "300deg",
    scale: 1.15,
    opacity: 0.5,
    size: "lg",
    mobileVisible: false
  }
];

const petalSizeClasses: Record<PetalSize, string> = {
  sm: "h-4 w-3",
  md: "h-5 w-4",
  lg: "h-6 w-5"
};

type FloatingPetalsProps = {
  className?: string;
};

export function FloatingPetals({ className }: FloatingPetalsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 z-[1] overflow-hidden motion-reduce:hidden", className)}
    >
      {petals.map((petal, index) => {
        const style = {
          left: petal.left,
          animationDelay: petal.delay,
          animationDuration: petal.duration,
          "--petal-drift": petal.drift,
          "--petal-opacity": petal.opacity.toString(),
          "--petal-rotate": petal.rotate,
          "--petal-scale": petal.scale.toString()
        } as CSSProperties;

        return (
          <div
            className={cn("petal-fall absolute top-0", petal.mobileVisible ? "" : "hidden sm:block")}
            key={`${petal.left}-${index}`}
            style={style}
          >
            <div
              className={cn(
                "petal-sway rounded-[85%_0_85%_0] border border-white/24 bg-[linear-gradient(160deg,rgba(255,248,250,0.96)_0%,rgba(230,184,194,0.9)_58%,rgba(199,165,109,0.92)_100%)] shadow-[0_6px_18px_rgba(92,58,61,0.14)]",
                petalSizeClasses[petal.size]
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
