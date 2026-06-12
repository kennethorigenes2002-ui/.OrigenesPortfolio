import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './Gallery.css';

const galleryItems = [
    { id: 1, title: 'Hackathon Certificate', category: 'Certificates' },
    { id: 2, title: 'AgriChain Dashboard', category: 'Screenshots' },
    { id: 3, title: 'Google Developer Event', category: 'Photos' },
    { id: 4, title: 'AI Completion Cert', category: 'Certificates' },
    { id: 5, title: 'EduTrack Mobile View', category: 'Screenshots' },
    { id: 6, title: 'Web3 Workshop', category: 'Photos' },
];

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <section id="gallery" className="gallery-section">
            <h2 className="section-title text-glow">Gallery & Evidence</h2>

            <div className="gallery-grid">
                {galleryItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="gallery-item glass-panel box-glow"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedImg(item)}
                    >
                        <div className="gallery-img-placeholder">
                            <span>{item.category}</span>
                        </div>
                        <div className="gallery-overlay">
                            <span className="gallery-title">{item.title}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                    >
                        <button className="close-btn" onClick={() => setSelectedImg(null)}>
                            <X size={32} color="#64ffda" />
                        </button>
                        <motion.div
                            className="lightbox-content glass-panel"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="lightbox-img-placeholder">
                                <h2>{selectedImg.title}</h2>
                                <p>({selectedImg.category})</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
