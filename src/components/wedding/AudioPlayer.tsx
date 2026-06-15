"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const DEFAULT_MUSIC_URL = "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-293.mp3";

export type AudioPlayerProps = {
  className?: string;
  musicUrl?: string;
};

export function AudioPlayer({ className, musicUrl = DEFAULT_MUSIC_URL }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    // Auto-play on first user interaction because browsers block autoplay
    const handleGesture = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          cleanup();
        })
        .catch(() => {
          // Play failed (still blocked or loading)
        });
    };

    const cleanup = () => {
      document.removeEventListener("click", handleGesture);
      document.removeEventListener("touchstart", handleGesture);
    };

    document.addEventListener("click", handleGesture);
    document.addEventListener("touchstart", handleGesture);

    return () => {
      cleanup();
      audio.pause();
      audioRef.current = null;
    };
  }, [musicUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback failed:", err);
        });
    }
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-40", className)}>
      <button
        onClick={togglePlay}
        type="button"
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(199,165,109,0.38)] bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(250,242,233,0.96))] text-[color:var(--primary-strong)] shadow-[0_12px_32px_rgba(125,87,79,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-[1.08] hover:border-[color:var(--primary)] active:scale-95"
      >
        {isPlaying ? (
          /* Animated sound wave bars */
          <div className="flex items-end gap-[3px] h-4">
            <span className="w-[3px] rounded-full bg-[color:var(--primary)] animate-[audioBar_0.8s_ease-in-out_infinite]" />
            <span className="w-[3px] rounded-full bg-[color:var(--primary)] animate-[audioBar_0.5s_ease-in-out_infinite_0.15s] h-3.5" />
            <span className="w-[3px] rounded-full bg-[color:var(--primary)] animate-[audioBar_0.7s_ease-in-out_infinite_0.3s] h-2" />
            <span className="w-[3px] rounded-full bg-[color:var(--primary)] animate-[audioBar_0.6s_ease-in-out_infinite_0.45s] h-3" />
          </div>
        ) : (
          /* Static paused/muted icon */
          <svg
            className="h-5 w-5 transition-transform duration-300 group-hover:scale-[1.05]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        )}
      </button>

      {/* CSS Animations for audio bars */}
      <style>{`
        @keyframes audioBar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </div>
  );
}
