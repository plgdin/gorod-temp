import React from 'react';

interface PreloaderProps {
  isDone?: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isDone = false }) => {
  return (
    <div className={`main-screen__preloader ${isDone ? '--done' : ''}`}>
      <div className="main-screen__preloader-center">
        <img
          width="119"
          height="119"
          src="/icons/star-img.svg"
          alt="Star symbol"
          className="lazyloaded"
        />
      </div>
      <div className="main-screen__preloader-dots">
        <img
          width="608"
          height="608"
          src="/icons/dots-img.svg"
          alt="Dots pattern"
          className="lazyloaded"
        />
      </div>
    </div>
  );
};
