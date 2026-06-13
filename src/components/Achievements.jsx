import React, { useState, useRef } from 'react';
import { Trophy, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Achievements.css';

const initialAchievements = [
    {
        id: 1,
        title: 'Certificate of Completion - OJT',
        category: 'On-The-Job Training',
        color: '#fbbf24',
        details: 'Completed 486 hours of On-The-Job Training at Nehemiah Solutions Corporation under the Software Research and Development Department.',
        mediaUrl: '/cer1.jpg',
        mediaType: 'image'
    },
    {
        id: 2,
        title: 'Certificate of Participation',
        category: 'Capstone Project Exhibit',
        color: '#a78bfa',
        details: 'Presented the capstone project entitled "AGRICHAIN: A Blockchain-Based Farming Assistance Distribution and Monitoring System for the Municipality of Kapalong".',
        mediaUrl: '/cer2.jpg',
        mediaType: 'image'
    },
    {
        id: 3,
        title: 'Cybersecurity Essentials',
        category: 'Course Completion',
        color: '#34d399',
        details: 'Successfully completed the Cybersecurity Essentials course offered by Davao del Norte State College through the Cisco Networking Academy program.',
        mediaUrl: '/cer3.png',
        mediaType: 'image'
    }
];

const AchievementCard = ({ achievement, onClick, index }) => {
    return (
        <motion.div
            className="achievement-card"
            onClick={() => onClick(achievement)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            style={{ "--accent": achievement.color }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="ach-thumbnail-container">
                {achievement.mediaType === 'video' ? (
                    <video src={achievement.mediaUrl} className="ach-media" muted loop playsInline />
                ) : (
                    <img src={achievement.mediaUrl} alt={achievement.title} className="ach-media" />
                )}
                <div className="ach-thumbnail-overlay">
                    <Trophy size={24} color={achievement.color} />
                    <span>View Details</span>
                </div>
            </div>

            <div className="ach-content">
                <h3 className="ach-title">{achievement.title}</h3>
                <p className="ach-desc">{achievement.details}</p>
            </div>

            <div className="ach-footer">
                <div className="ach-link">
                    <span className="icon-external">🏆</span>
                </div>
                <div className="ach-action">
                    <span>Details <span className="arrow">→</span></span>
                </div>
            </div>
        </motion.div>
    );
};

const Achievements = () => {
    const [achievements, setAchievements] = useState(() => {
        try {
            const saved = localStorage.getItem('portfolio_achievements_media');
            if (saved) {
                const parsed = JSON.parse(saved);
                return initialAchievements.map(ach => ({
                    ...ach,
                    ...(parsed[ach.id] || {})
                }));
            }
        } catch (e) {
            console.error(e);
        }
        return initialAchievements;
    });

    const [selectedAch, setSelectedAch] = useState(null);
    const [uploadingId, setUploadingId] = useState(null);
    const fileInputRef = useRef(null);

    const openModal = (ach) => {
        setSelectedAch(ach);
    };

    const closeModal = () => setSelectedAch(null);

    const handleUploadClick = (id) => {
        setUploadingId(id);
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const fileUrl = reader.result;
            const fileType = file.type.startsWith('video/') ? 'video' : 'image';

            let updatedItem = null;
            setAchievements(prev => {
                const newAchs = prev.map(ach => {
                    if (ach.id === uploadingId) {
                        updatedItem = { ...ach, mediaType: fileType, mediaUrl: fileUrl };
                        return updatedItem;
                    }
                    return ach;
                });

                try {
                    const saved = localStorage.getItem('portfolio_achievements_media') || "{}";
                    const parsed = JSON.parse(saved);
                    parsed[uploadingId] = { mediaType: fileType, mediaUrl: fileUrl };
                    localStorage.setItem('portfolio_achievements_media', JSON.stringify(parsed));
                } catch (error) {
                    console.error("Local storage quota exceeded", error);
                    alert("File is too large to permanently save. It will reset on reload.");
                }

                return newAchs;
            });

            if (updatedItem && selectedAch?.id === uploadingId) {
                setSelectedAch(updatedItem);
            }
        };
        reader.readAsDataURL(file);

        e.target.value = '';
    };

    return (
        <section id="certificates" className="achievements-section">
            <div className="section-header">
                <h2 className="text-glow">Certificates</h2>
                <div className="gradient-line"></div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*,video/*"
                onChange={handleFileChange}
            />

            <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                    <AchievementCard key={achievement.id} achievement={achievement} onClick={openModal} index={index} />
                ))}
            </div>

            <AnimatePresence>
                {selectedAch && (
                    <motion.div
                        className="ach-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="ach-modal-content"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            style={{ "--accent": selectedAch.color }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="ach-modal-close" onClick={closeModal}>
                                <X size={24} />
                            </button>

                            <div className="ach-modal-media-wrap">
                                {selectedAch.mediaType === 'video' ? (
                                    <video
                                        controls
                                        autoPlay
                                        className="ach-modal-media"
                                        src={selectedAch.mediaUrl}
                                    />
                                ) : (
                                    <img
                                        src={selectedAch.mediaUrl}
                                        alt={selectedAch.title}
                                        className="ach-modal-media"
                                    />
                                )}
                                <div className="ach-modal-media-grad" />
                                <motion.button
                                    className="ach-modal-upload-btn"
                                    onClick={() => handleUploadClick(selectedAch.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Upload size={14} /> Replace Image
                                </motion.button>
                            </div>

                            <div className="ach-modal-info">
                                <div className="ach-modal-header-row">
                                    <h3 style={{ color: selectedAch.color }}>{selectedAch.title}</h3>
                                </div>
                                <p className="ach-modal-category">{selectedAch.category}</p>
                                <div className="ach-modal-divider" style={{ background: `linear-gradient(90deg, ${selectedAch.color}40, transparent)` }} />
                                <p className="ach-modal-desc">{selectedAch.details}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Achievements;
