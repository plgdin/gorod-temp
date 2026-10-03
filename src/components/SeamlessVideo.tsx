import React, { useRef, useEffect, useState } from 'react';

interface SeamlessVideoProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SeamlessVideo: React.FC<SeamlessVideoProps> = ({
  src,
  mobileSrc,
  poster = '/images/water-flow-poster.jpg',
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Responsive source selection: mobile video for small screens (< 768px)
  useEffect(() => {
    const pickSource = () => {
      const isMobile = window.innerWidth < 768;
      const target = isMobile && mobileSrc ? mobileSrc : src;
      setActiveSrc(target);
    };

    pickSource();
    window.addEventListener('resize', pickSource, { passive: true });
    return () => window.removeEventListener('resize', pickSource);
  }, [src, mobileSrc]);

  // Ensure muted is set on DOM property (React JSX muted alone can fail autoplay policy)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const tryPlay = () => {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsLoaded(true))
            .catch(() => {
              // Browser autoplay policy might require first user gesture
            });
        }
      }
    };

    tryPlay();

    // Interaction fallback for strict power-saving or browser autoplay restrictions
    const handleGesture = () => {
      tryPlay();
    };
    window.addEventListener('click', handleGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleGesture, { once: true, passive: true });

    // Battery & CPU optimization: pause when tab hidden, resume when visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        tryPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('scroll', handleGesture);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeSrc]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={activeSrc}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => {
          setIsLoaded(true);
          videoRef.current?.play().catch(() => {});
        }}
        onCanPlay={() => {
          videoRef.current?.play().catch(() => {});
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          pointerEvents: 'none',
          opacity: isLoaded ? 1 : 0.85,
          transition: 'opacity 0.6s ease-out',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
};


