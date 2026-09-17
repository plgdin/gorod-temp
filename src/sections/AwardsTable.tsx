import React from 'react';
import { RoundButton } from '../components/RoundButton';

const awards = [
  { year: '2017', award: 'National Maritime Rating' },
  { year: '2018', award: 'Ship agent 2018 in Ukraine' },
  { year: '2019', award: 'National Maritime Rating' },
  { year: '2020', award: 'Industry Leader 2020' },
  { year: '2021', award: 'Agent of the Year' },
];

export const AwardsTable: React.FC = () => {
  return (
    <section id="about" className="simple-table-section">
      <div className="simple-table">
        <div className="simple-table__row --header">
          <div>Year</div>
          <div>Award</div>
        </div>
        <div className="simple-table__row-line" />

        {awards.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="simple-table__row">
              <div>{item.year}</div>
              <div>{item.award}</div>
            </div>
            <div className="simple-table__row-line" />
          </React.Fragment>
        ))}

        <div className="simple-table__btn-wrap">
          <RoundButton label="About" href="#about" />
        </div>
      </div>
    </section>
  );
};
