import React from 'react';

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  return (
    <div className={`preloader ${!isLoading ? '--hidden' : ''}`}>
      <div className="preloader__center">
        <img
          src="/icons/dots-img.svg"
          alt=""
          className="preloader__dots"
        />
        <img
          src="/icons/star-img.svg"
          alt=""
          className="preloader__star"
        />
      </div>
    </div>
  );
};
