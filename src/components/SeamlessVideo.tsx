import React, { useRef, useEffect, useState } from 'react';

export interface SeamlessVideoProps {
  src?: string;
  mobileSrc?: string;
  webpSrc?: string;
  webpMobileSrc?: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  preferAnimatedWebp?: boolean;
}

export const SeamlessVideo: React.FC<SeamlessVideoProps> = ({
  src = '/images/water-flow.mp4',
  mobileSrc = '/images/water-flow-mobile.mp4',
  webpSrc = '/images/water-flow.webp',
  webpMobileSrc = '/images/water-flow-mobile.webp',
  poster = '/images/water-flow-poster.jpg',
  className,
  style,
  preferAnimatedWebp = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Responsive video source selection if using video fallback mode
  useEffect(() => {
    if (preferAnimatedWebp) return;

    const pickSource = () => {
      const isMobile = window.innerWidth < 768;
      const target = isMobile && mobileSrc ? mobileSrc : src;
      setActiveSrc(target);
    };

    pickSource();
    window.addEventListener('resize', pickSource, { passive: true });
    return () => window.removeEventListener('resize', pickSource);
  }, [src, mobileSrc, preferAnimatedWebp]);

  // Autoplay video safety if in video fallback mode
  useEffect(() => {
    if (preferAnimatedWebp) return;
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
            .catch(() => {});
        }
      }
    };

    tryPlay();

    const handleGesture = () => {
      tryPlay();
    };
    window.addEventListener('click', handleGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleGesture, { once: true, passive: true });

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
  }, [activeSrc, preferAnimatedWebp]);

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
      {preferAnimatedWebp ? (
        <picture
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        >
          {webpMobileSrc && (
            <source
              media="(max-width: 768px)"
              srcSet={webpMobileSrc}
              type="image/webp"
            />
          )}
          <img
            src={webpSrc}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className={className}
            onLoad={() => setIsLoaded(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              pointerEvents: 'none',
              opacity: isLoaded ? 1 : 0.9,
              transition: 'opacity 0.6s ease-out',
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />
        </picture>
      ) : (
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
      )}
    </div>
  );
};



