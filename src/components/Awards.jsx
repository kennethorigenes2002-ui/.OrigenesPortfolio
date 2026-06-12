import React from 'react';
import { Trophy } from 'lucide-react';
import './Awards.css';

const awards = [
    {
        id: 1,
        title: '1st Place - National Hackathon',
        category: 'Innovation in Agriculture',
        year: '2025'
    },
    {
        id: 2,
        title: 'Top 10 Finalist - AI Challenge',
        category: 'Computer Vision',
        year: '2025'
    },
    {
        id: 3,
        title: 'Best Developer Award',
        category: 'University Tech Expo',
        year: '2024'
    }
];

const AwardCard = ({ award }) => (
    <div className="award-card glass-panel box-glow">
        <div className="award-image-container">
            <img src={`https://via.placeholder.com/400x300/0a192f/64ffda?text=Certificate+Preview`} alt={`${award.title} Certificate`} className="award-image" />
        </div>
        <div className="award-icon-wrapper">
            <Trophy size={40} color="#64ffda" />
        </div>
        <h3 className="award-title text-glow">{award.title}</h3>
        <p className="award-category">{award.category}</p>
        <span className="award-year">{award.year}</span>
    </div>
);

const Awards = () => {
    return (
        <section id="awards" className="awards-section">
            <h2 className="section-title text-glow">Competitions & Awards</h2>
            <div className="awards-marquee">
                <div className="awards-track">
                    {awards.map((award) => (
                        <AwardCard key={`primary-${award.id}`} award={award} />
                    ))}
                    {awards.map((award) => (
                        <AwardCard key={`secondary-${award.id}`} award={award} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
