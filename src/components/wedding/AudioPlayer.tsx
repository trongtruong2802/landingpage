"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const WEDDING_PLAYLIST = [
  {
    title: "Beautiful Dream (Ambient Piano)",
    artist: "Mixkit",
    url: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-293.mp3"
  },
  {
    title: "Forest Lullaby (Romantic Piano)",
    artist: "Mixkit",
    url: "https://assets.mixkit.co/music/preview/mixkit-forest-lullaby-1109.mp3"
  },
  {
    title: "Sun and Clouds (Acoustic Guitar)",
    artist: "Mixkit",
    url: "https://assets.mixkit.co/music/preview/mixkit-sun-and-clouds-244.mp3"
  }
];

export type AudioPlayerProps = {
  className?: string;
};

export function AudioPlayer({ className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and play track on track index or component mount
  useEffect(() => {
    const activeTrack = WEDDING_PLAYLIST[currentTrackIndex];
    const audio = new Audio(activeTrack.url);
    audio.loop = true;
    audioRef.current = audio;

    // If already playing, start new track immediately
    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("Audio playback start failed:", err);
      });
    }

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
  }, [currentTrackIndex]);

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

  const playNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentTrackIndex + 1) % WEDDING_PLAYLIST.length;
    
    // Pause current audio before setting next index to prevent overlap
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const activeTrack = WEDDING_PLAYLIST[currentTrackIndex];

  return (
    <div className={cn("fixed bottom-6 right-6 z-40 flex items-center gap-2.5", className)}>
      {/* Tiny Track Info & Next Button (visible when playing) */}
      {isPlaying && (
        <div className="flex items-center gap-2.5 rounded-full border border-[rgba(199,165,109,0.34)] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(252,246,238,0.95))] px-3.5 py-1.5 shadow-[0_12px_28px_rgba(125,87,79,0.12)] backdrop-blur-md animate-[slideIn_0.3s_ease-out]">
          <div className="flex flex-col text-left">
            <span className="text-[0.56rem] uppercase tracking-[0.18em] text-[color:var(--primary)] font-semibold leading-none">Đang phát</span>
            <span className="mt-1.5 text-[0.7rem] font-medium text-[color:var(--foreground)] truncate max-w-[120px] leading-none">
              {activeTrack.title.split(" (")[0]}
            </span>
          </div>
          <button
            onClick={playNext}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--primary-strong)]/10 hover:bg-[color:var(--primary-strong)]/20 text-[color:var(--primary-strong)] transition duration-200 active:scale-90 cursor-pointer"
            title="Bài tiếp theo"
            aria-label="Bài tiếp theo"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 4 15 12 5 20 5 4" fill="currentColor" />
              <line x1="19" y1="5" x2="19" y2="19" strokeWidth="3" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Play/Pause Button */}
      <button
        onClick={togglePlay}
        type="button"
        aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(199,165,109,0.38)] bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(250,242,233,0.96))] text-[color:var(--primary-strong)] shadow-[0_12px_32px_rgba(125,87,79,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-[1.08] hover:border-[color:var(--primary)] active:scale-95 cursor-pointer"
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

      {/* CSS Animations for audio bars and slide-in panel */}
      <style>{`
        @keyframes audioBar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(16px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
