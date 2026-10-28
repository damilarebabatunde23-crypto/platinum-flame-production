import React, { useRef, useEffect, useState } from 'react';

/**
 * CinematicVideo – A reusable full-coverage video background component.
 * Falls back gracefully to a static image if the video fails to load.
 *
 * Props:
 *  src          – video URL (mp4 or webm)
 *  fallbackSrc  – image URL shown while video loads or on error
 *  overlay      – Tailwind gradient className for the overlay div (optional)
 *  className    – extra classes applied to the root wrapper
 *  muted        – defaults true
 *  loop         – defaults true
 *  autoPlay     – defaults true
 *  brightness   – CSS filter brightness string, e.g. "0.3" (optional)
 *  children     – overlaid content
 */
export default function CinematicVideo({
  src,
  fallbackSrc,
  overlay = 'bg-gradient-to-t from-[#07080a] via-[#07080a]/60 to-black/70',
  className = '',
  muted = true,
  loop = true,
  autoPlay = true,
  brightness = '0.32',
  children,
}) {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    // Attempt play in case browser defers autoplay
    vid.play().catch(() => setVideoError(true));
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* ---- Video layer ---- */}
      {!videoError && (
        <video
          ref={videoRef}
          src={src}
          muted={muted}
          loop={loop}
          autoPlay={autoPlay}
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            filter: `brightness(${brightness})`,
            opacity: videoReady ? 1 : 0,
          }}
        />
      )}

      {/* ---- Fallback image (shown while video loads OR on error) ---- */}
      {fallbackSrc && (
        <img
          src={fallbackSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            filter: `brightness(${brightness})`,
            opacity: videoReady && !videoError ? 0 : 1,
          }}
        />
      )}

      {/* ---- Cinematic overlay gradient ---- */}
      <div className={`absolute inset-0 ${overlay} pointer-events-none`} />

      {/* ---- Content slot ---- */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
