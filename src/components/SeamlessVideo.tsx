import React, { useRef, useEffect, useState } from 'react';

export interface SeamlessVideoProps {
  src?: string;
  mobileSrc?: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SeamlessVideo: React.FC<SeamlessVideoProps> = ({
  src = '/images/water-flow.mp4',
  mobileSrc = '/images/water-flow-mobile.mp4',
  poster = '/images/water-flow-poster.jpg',
  className,
  style,
}) => {
  const [activeSrc, setActiveSrc] = useState<string>(src);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const isTransitioningRef = useRef<boolean>(false);

  // Responsive video source selection
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

  // Handle autoplay initialization & tab visibility
  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    vA.defaultMuted = true;
    vA.muted = true;
    vB.defaultMuted = true;
    vB.muted = true;

    const startPlay = async () => {
      try {
        await vA.play();
        setIsLoaded(true);
      } catch {
        // Autoplay policy fallback
      }
    };
    startPlay();

    const handleGesture = () => {
      if (vA.paused && vB.paused) {
        startPlay();
      }
    };
    window.addEventListener('click', handleGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleGesture, { once: true, passive: true });
    window.addEventListener('scroll', handleGesture, { once: true, passive: true });

    const handleVisibility = () => {
      if (document.hidden) {
        vA.pause();
        vB.pause();
      } else {
        if (activeSlot === 'A') {
          vA.play().catch(() => {});
        } else {
          vB.play().catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('scroll', handleGesture);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [activeSrc]);

  // Seamless crossfade loop controller via requestAnimationFrame
  useEffect(() => {
    let animFrame: number;

    const checkLoop = () => {
      const vA = videoARef.current;
      const vB = videoBRef.current;
      if (!vA || !vB) {
        animFrame = requestAnimationFrame(checkLoop);
        return;
      }

      const currentVideo = activeSlot === 'A' ? vA : vB;
      const nextVideo = activeSlot === 'A' ? vB : vA;

      // Trigger crossfade 1.2s before the video reaches its end
      if (
        !isTransitioningRef.current &&
        currentVideo.duration &&
        currentVideo.duration > 2 &&
        currentVideo.currentTime >= currentVideo.duration - 1.2
      ) {
        isTransitioningRef.current = true;
        const nextSlot = activeSlot === 'A' ? 'B' : 'A';

        nextVideo.currentTime = 0;
        nextVideo.play().then(() => {
          setActiveSlot(nextSlot);

          // Once next video has crossfaded into view (1.0s), pause previous video and reset flag
          setTimeout(() => {
            currentVideo.pause();
            currentVideo.currentTime = 0;
            isTransitioningRef.current = false;
          }, 1100);
        }).catch(() => {
          isTransitioningRef.current = false;
        });
      }

      animFrame = requestAnimationFrame(checkLoop);
    };

    animFrame = requestAnimationFrame(checkLoop);
    return () => cancelAnimationFrame(animFrame);
  }, [activeSlot]);

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
      {/* Video A */}
      <video
        ref={videoARef}
        src={activeSrc}
        className={className}
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => setIsLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          pointerEvents: 'none',
          opacity: isLoaded ? (activeSlot === 'A' ? 1 : 0) : 0,
          transition: 'opacity 1.0s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
          zIndex: activeSlot === 'A' ? 2 : 1,
        }}
      />

      {/* Video B (Buffered Dual Player for 100% Zero-Cut Seamless Loop) */}
      <video
        ref={videoBRef}
        src={activeSrc}
        className={className}
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          pointerEvents: 'none',
          opacity: isLoaded ? (activeSlot === 'B' ? 1 : 0) : 0,
          transition: 'opacity 1.0s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
          zIndex: activeSlot === 'B' ? 2 : 1,
        }}
      />
    </div>
  );
};





