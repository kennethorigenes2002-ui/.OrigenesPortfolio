import React, { useRef } from 'react';
import './Hero.css';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Github, Linkedin, Instagram, User } from 'lucide-react';
// Simulating the TikTok custom icon if not available in lucide
const TikTokIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const Hero = () => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 3D Tilt calculations
    const rotateX = useTransform(y, [-100, 100], [8, -8]);
    const rotateY = useTransform(x, [-100, 100], [-8, 8]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="hero" className="hero-section">
            <div className="hero-container">

                {/* Left Column: Text & Content */}
                <div className="hero-left">
                    <motion.div
                        className="hero-subtitle-top"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        HELLO, I AM
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Kenneth <br />
                        Origenes
                    </motion.h1>

                    <motion.div
                        className="hero-socials"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <a href="#"><Github size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><TikTokIcon /></a>
                    </motion.div>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        I'm a developer specializing in building exceptional, high-quality digital experiences. Currently focused on crafting modern, dashboard-grade web applications.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <a href="#projects" className="btn-primary">View Projects <span className="arrow">↗</span></a>
                        <a href="#contact" className="btn-secondary">Contact Me</a>
                    </motion.div>
                </div>

                {/* Right Column: 3D Interactive Card */}
                <div className="hero-right">
                    <motion.div
                        ref={cardRef}
                        className="hero-3d-card"
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="card-inner" style={{ transform: "translateZ(30px)" }}>
                            {/* Fake image with realistic styling from reference */}
                            <div className="card-image-wrapper">
                                <img src="/profile.jpg" alt="Developer Portrait" className="card-portrait" />
                            </div>

                            <div className="card-top-text" style={{ transform: "translateZ(40px)" }}>
                                <h3>Kenneth Origenes</h3>
                            </div>

                            <div className="card-bottom-widget" style={{ transform: "translateZ(50px)" }}>
                                <div className="widget-avatar">
                                    <User size={24} color="#64ffda" />
                                </div>
                                <div className="widget-info">
                                    <span className="widget-handle">@origenes.dev</span>
                                    <span className="widget-status"><span className="status-dot"></span> Online</span>
                                </div>
                                <button className="widget-btn">Contact Me</button>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
