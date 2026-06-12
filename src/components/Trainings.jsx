import React from 'react';
import { motion } from 'framer-motion';
import './Trainings.css';

const trainings = [
    {
        id: 1,
        title: 'Advanced React patterns and Performance',
        date: 'March 2026',
        organizer: 'Frontend Masters',
    },
    {
        id: 2,
        title: 'Web3 & Solidity Smart Contracts',
        date: 'January 2026',
        organizer: 'BuildSpace',
    },
    {
        id: 3,
        title: 'AI and Machine Learning with Python',
        date: 'November 2025',
        organizer: 'Google Developer Clubs',
    }
];

const Trainings = () => {
    return (
        <section id="trainings" className="trainings-section">
            <h2 className="section-title text-glow">Trainings & Seminars</h2>
            <div className="timeline">
                {trainings.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="timeline-content glass-panel box-glow">
                            <div className="timeline-image-container">
                                <img src={`https://via.placeholder.com/500x300/0a192f/8892b0?text=Seminar+Photo`} alt={item.title} className="timeline-image" />
                            </div>
                            <h3 className="timeline-title">{item.title}</h3>
                            <p className="timeline-org">{item.organizer}</p>
                            <span className="timeline-date">{item.date}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Trainings;
