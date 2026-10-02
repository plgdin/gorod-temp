import React, { useRef, useEffect } from 'react';

interface SeamlessVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SeamlessVideo: React.FC<SeamlessVideoProps> = ({ src, className, style }) => {
  const vid1Ref = useRef<HTMLVideoElement>(null);
  const vid2Ref = useRef<HTMLVideoElement>(null);
  const activeVidRef = useRef<1 | 2>(1);
  const transitioningRef = useRef<boolean>(false);

  useEffect(() => {
    const v1 = vid1Ref.current;
    const v2 = vid2Ref.current;
    if (!v1 || !v2) return;

    const crossfadeDuration = 1.2; // seconds of smooth crossfade overlap
    activeVidRef.current = 1;
    transitioningRef.current = false;

    v1.style.opacity = '1';
    v2.style.opacity = '0';
    v1.currentTime = 0;
    v1.play().catch(() => {});

    const handleTimeUpdate = (e: Event) => {
      const currentVid = e.target as HTMLVideoElement;
      if (!currentVid.duration || isNaN(currentVid.duration)) return;

      const timeLeft = currentVid.duration - currentVid.currentTime;

      if (timeLeft <= crossfadeDuration && !transitioningRef.current) {
        transitioningRef.current = true;
        const nextVid = activeVidRef.current === 1 ? v2 : v1;

        nextVid.currentTime = 0;
        nextVid.play().then(() => {
          currentVid.style.transition = `opacity ${crossfadeDuration}s ease-in-out`;
          nextVid.style.transition = `opacity ${crossfadeDuration}s ease-in-out`;
          currentVid.style.opacity = '0';
          nextVid.style.opacity = '1';

          setTimeout(() => {
            currentVid.pause();
            currentVid.currentTime = 0;
            currentVid.style.transition = 'none';
            nextVid.style.transition = 'none';
            activeVidRef.current = activeVidRef.current === 1 ? 2 : 1;
            transitioningRef.current = false;
          }, crossfadeDuration * 1000);
        }).catch(() => {
          transitioningRef.current = false;
        });
      }
    };

    v1.addEventListener('timeupdate', handleTimeUpdate);
    v2.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      v1.removeEventListener('timeupdate', handleTimeUpdate);
      v2.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [src]);

  return (
    <div className={className} style={style}>
      <video
        ref={vid1Ref}
        muted
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
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={vid2Ref}
        muted
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
          opacity: 0,
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};
