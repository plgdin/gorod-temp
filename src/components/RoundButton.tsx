import React from 'react';

interface RoundButtonProps {
  label: string;
  href?: string;
  dark?: boolean;
  className?: string;
  onClick?: () => void;
}

export const RoundButton: React.FC<RoundButtonProps> = ({
  label,
  href = '#',
  dark = false,
  className = '',
  onClick,
}) => {
  return (
    <a
      href={href}
      className={`round-btn ${dark ? '--dark' : ''} ${className}`}
      onClick={onClick}
    >
      <span className="round-btn__outer">
        <span className="round-btn__inner">
          <span className="round-btn__label">{label}</span>
          <span className="round-btn__label">{label}</span>
        </span>
      </span>
    </a>
  );
};
