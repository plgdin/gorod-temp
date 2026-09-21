import React from 'react';

interface MenuItem {
  num: string;
  label: string;
  align: 'left' | 'right';
  preview: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { num: '01', label: 'HOME PAGE', align: 'right', preview: '/images/menu-home.jpg', href: '#' },
  { num: '02', label: 'ABOUT US', align: 'left', preview: '/images/menu-about.jpg', href: '#about' },
  { num: '03', label: 'OUR SERVICES', align: 'right', preview: '/images/menu-cases.jpg', href: '#services' },
  { num: '04', label: 'CONTACT US', align: 'left', preview: '/images/menu-contact.jpg', href: '#contact' },
];

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`nav-overlay ${isOpen ? '--open' : ''}`}>
      <ul className="nav-overlay__list">
        {menuItems.map((item) => (
          <li
            key={item.num}
            className={`nav-overlay__item ${item.align === 'right' ? '--right' : '--left'}`}
          >
            {item.align === 'left' && <span className="nav-overlay__num">{item.num}</span>}
            <a
              href={item.href}
              className="nav-overlay__link"
              onClick={() => onClose()}
            >
              {item.label}
              <div className="nav-overlay__preview">
                <img src={item.preview} alt={item.label} />
              </div>
            </a>
            {item.align === 'right' && <span className="nav-overlay__num">{item.num}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
