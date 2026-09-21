import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
}

interface CustomDropdownProps {
  id?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`custom-dropdown ${isOpen ? '--open' : ''} ${className}`} id={id}>
      <button
        type="button"
        className="custom-dropdown__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`custom-dropdown__selected-text ${!selectedOption ? '--placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} className="custom-dropdown__chevron" />
      </button>

      <div className="custom-dropdown__menu-wrapper">
        <ul className="custom-dropdown__menu" role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`custom-dropdown__item ${isSelected ? '--selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                <span className="custom-dropdown__item-label">{opt.label}</span>
                {opt.badge && <span className="custom-dropdown__item-badge">{opt.badge}</span>}
                {isSelected && <Check size={16} className="custom-dropdown__item-check" />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomDropdown;
