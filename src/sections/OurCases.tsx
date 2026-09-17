import React from 'react';

const cases = [
  {
    title: 'Neptune Odyssey under was discharged with the record speed',
    img: '/images/case-1.jpg',
    href: '#cases',
  },
  {
    title: 'Bon voyage Zhen Hua 33',
    img: '/images/case-2.jpg',
    href: '#cases',
  },
  {
    title: 'Neptune Lines Shipping and Managing Enterprises S.A.',
    img: '/images/case-3.jpg',
    href: '#cases',
  },
  {
    title: 'Grand opening ceremony!',
    img: '/images/case-4.jpg',
    href: '#cases',
  },
  {
    title: 'Kherson port, Ukraine',
    img: '/images/case-5.jpg',
    href: '#cases',
  },
  {
    title: 'Nika-Tera terminal',
    img: '/images/case-6.jpg',
    href: '#cases',
  },
  {
    title: 'The first shipment of meal to China ever',
    img: '/images/case-7.jpg',
    href: '#cases',
  },
  {
    title: 'Neptune terminal (Pivdennyi port)',
    img: '/images/case-8.jpg',
    href: '#cases',
  },
];

export const OurCases: React.FC = () => {
  return (
    <section id="cases" className="our-cases">
      <div className="fw-container">
        <h2 className="our-cases__title">OUR CASES</h2>

        <div className="our-cases__grid">
          {cases.map((item, idx) => (
            <a key={idx} href={item.href} className="our-cases__card">
              <span className="our-cases__photo">
                <img src={item.img} alt={item.title} loading="lazy" />
              </span>
              <span className="our-cases__label">{item.title}</span>
            </a>
          ))}
        </div>

        <div className="our-cases__desc-wrap">
          <p className="our-cases__desc">
            Company is fast growing Port Agency In Ukraine, established in 2014
            and focused on new standards of performance and providing of unique
            information. Own offices located in main Ukrainian sea and river
            ports. Company is a leader in providing of Market analytics
            research and export/import statistics for clients.
          </p>
        </div>
      </div>
    </section>
  );
};
