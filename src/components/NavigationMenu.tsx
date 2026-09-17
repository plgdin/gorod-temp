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
  { num: '02', label: 'ABOUT COMPANY', align: 'left', preview: '/images/menu-about.jpg', href: '#about' },
  { num: '03', label: 'OUR CASES', align: 'right', preview: '/images/menu-cases.jpg', href: '#cases' },
  { num: '04', label: 'TEAM', align: 'left', preview: '/images/menu-team.jpg', href: '#team' },
  { num: '05', label: 'ANALYTICAL REPORTS', align: 'right', preview: '/images/menu-reports.jpg', href: '#reports' },
  { num: '06', label: 'STARK RESEARCH', align: 'left', preview: '/images/menu-research.jpg', href: '#research' },
  { num: '07', label: 'STARK PORTAL', align: 'right', preview: '/images/menu-portal.jpg', href: '#portal' },
  { num: '08', label: 'NEPTUNE LINES', align: 'left', preview: '/images/menu-neptune.jpg', href: '#partners' },
  { num: '09', label: 'CONTACT INFORMATION', align: 'right', preview: '/images/menu-contact.jpg', href: '#footer' },
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
