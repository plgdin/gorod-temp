import React from 'react';
import { Anchor, ShieldCheck, Clock, Award } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const stats = [
    { label: 'Years of Service', value: '12+', icon: Award, desc: 'Proven operational pedigree' },
    { label: 'Vessels Attended', value: '2,500+', icon: Anchor, desc: 'Tankers, bulkers & container carriers' },
    { label: 'Ports Covered', value: '14+', icon: ShieldCheck, desc: 'Black Sea & Danube deep-water ports' },
    { label: 'Dispatch Desk', value: '24/7', icon: Clock, desc: 'Real-time port call monitoring' },
  ];

  return (
    <section id="about" className="section-about">
      <div className="section-about__inner">
        <div className="section-about__header">
          <h2 className="section-title">
            Representing Business Across Cities & Around the Globe
          </h2>
        </div>

        <div className="section-about__grid">
          <div className="section-about__story">
            <p className="section-lead">
              Gorod International Agency Pvt Ltd is a representation-oriented company for overseas business clients and is a fully multimodal-logistics agency service.
            </p>
            <p className="section-text">
              We offer a wide range of services specific to all our customers’ needs. Our dedicated team of experienced professionals aims to provide our customers with cost-effective solutions and timely delivery of goods. The mission is to provide reliable transportation and supply chain solution of the highest quality within a reasonable budget, safely, and on time.
            </p>

            <div className="section-about__vision-block" style={{ marginTop: '24px', padding: '20px 24px', background: '#f4f8f9', borderLeft: '4px solid #006873', borderRadius: '4px' }}>
              <h4 style={{ margin: '0 0 8px', color: '#006873', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Our Vision &bull; The New Gateway to a New India
              </h4>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#334155' }}>
                Our Vision is to act as an indispensable partner to companies worldwide and provide earth’s most customer-centric solutions to our clients. We achieve this by taking pride in representing any company worldwide that has an interest in Aviation services, Shipping Agency services, Import and Export Services, logistics services as well as NGO and United Nation RELIEF. Gorod is at your fingertips to perform these services with utmost dedication and Integrity in our homecity and Pan India.
              </p>
            </div>
          </div>

          <div className="section-about__stats">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="stat-card">
                  <div className="stat-card__icon-wrap">
                    <Icon size={24} className="stat-card__icon" />
                  </div>
                  <div className="stat-card__value">{stat.value}</div>
                  <div className="stat-card__label">{stat.label}</div>
                  <div className="stat-card__desc">{stat.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
