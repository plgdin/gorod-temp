import React from 'react';
import { RoundButton } from '../components/RoundButton';

const reports = [
  {
    date: '13.05.2022',
    title: 'Top shippers, charterers Meal/Cake from Ukraine in 2019-2020 marketing year',
    href: '#reports',
  },
  {
    date: '23.04.2022',
    title: 'Top grain terminals of Ukraine — market share, export dynamics in 2019-2020 marketing year',
    href: '#reports',
  },
  {
    date: '10.04.2022',
    title: 'Ship-to-ship transshipment of Ukrainian vegoil in 2019-2020 marketing year',
    href: '#reports',
  },
  {
    date: '30.03.2022',
    title: 'Monthly export data/export structure of grain Ukraine in 2019-2020 marketing year',
    href: '#reports',
  },
  {
    date: '10.03.2022',
    title: 'Monthly date and structure vegoil export from Ukraine in 2020-2021 marketing year',
    href: '#reports',
  },
];

export const Analytics: React.FC = () => {
  return (
    <section id="reports" className="analytics-section">
      <div className="fw-container">
        <h2 className="scale-title__title">ANALYTICS</h2>

        <div className="news__title">
          <div className="news__title-item">RECENT</div>
          <div className="news__title-item">ANALYTICAL</div>
          <div className="news__title-item">REPORTS</div>
        </div>

        <div className="news__reports">
          <div className="news__row-line" />
          {reports.map((item, idx) => (
            <React.Fragment key={idx}>
              <a href={item.href} className="news__row">
                <div className="news__date">{item.date}</div>
                <div className="news__text">{item.title}</div>
              </a>
              <div className="news__row-line" />
            </React.Fragment>
          ))}
        </div>

        <div className="news__btn-wrap">
          <RoundButton label="All reports" dark href="#reports" />
        </div>
      </div>
    </section>
  );
};
