import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, ArrowUpRight, Upload, ImagePlus, Film } from 'lucide-react';
import './Projects.css';


const projects = [
    {
        id: 1,
        title: 'AgriChain',
        description: 'Blockchain-Based Farming Assistance System connecting farmers directly with markets, enabling transparent supply chains and fair pricing.',
        tech: [],
        role: '',
        link: '#',
        github: '#',
        image: '/P1.png',
        accent: '#06b6d4',
    },
    {
        id: 2,
        title: 'Zenith',
        description: 'A comprehensive productivity platform designed to help users efficiently manage tasks, set priorities, and monitor progress in real-time.',
        tech: [],
        role: '',
        link: '#',
        github: '#',
        image: '/P2.jpg',
        accent: '#8b5cf6',
    },
    {
        id: 3,
        title: 'Online Gadget Loan Approval',
        description: 'An interactive administrative dashboard featuring dynamic charts, sales analytics, and reporting tools to streamline data-driven business decisions.',
        tech: [],
        role: '',
        link: '#',
        github: '#',
        image: '/P3.jpg',
        accent: '#34d399',
    },
];

/* ─── Framer Motion Variants ────────────────────────────────── */
const fadeUpVariant = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

const cardVariant = {
    hidden: { opacity: 0, y: 48, scale: 0.97 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] },
    }),
};

const badgeVariant = {
    hidden: { opacity: 0, scale: 0.8, y: 6 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] },
    }),
};

const modalContentVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.38, delay: 0.18 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── Media Display ─────────────────────────────────────────── */
const MediaDisplay = ({ src, type, alt, className }) => {
    if (type === 'video') {
        return (
            <video
                className={className}
                src={src}
                autoPlay
                loop
                muted
                playsInline
            />
        );
    }
    return <img src={src} alt={alt} className={className} />;
};

/* ─── Main Component ────────────────────────────────────────── */
const Projects = () => {
    const [selected, setSelected] = useState(null);
    const [mediaMap, setMediaMap] = useState(() => {
        try {
            const saved = localStorage.getItem('portfolio_projects_media');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    });
    const fileInputRefs = useRef({});

    const handleUploadClick = (e, projectId) => {
        e.stopPropagation();
        fileInputRefs.current[projectId]?.click();
    };

    const handleFileChange = (e, projectId) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const url = reader.result;
            const type = file.type.startsWith('video/') ? 'video' : 'image';

            setMediaMap(prev => {
                const newMap = { ...prev, [projectId]: { url, type } };
                try {
                    localStorage.setItem('portfolio_projects_media', JSON.stringify(newMap));
                } catch (error) {
                    console.error("Local storage quota exceeded", error);
                    alert("File is too large to permanently save. It will reset on reload.");
                }
                return newMap;
            });
        };
        reader.readAsDataURL(file);

        // Reset input so the same file can be re-selected
        e.target.value = '';
    };

    const getMedia = (project) => {
        const uploaded = mediaMap[project.id];
        if (!uploaded) return { src: project.image ?? null, type: 'image' };
        return { src: uploaded.url, type: uploaded.type };
    };

    return (
        <section id="projects" className="projects-section">
            {/* Background blobs */}
            <div className="proj-blob proj-blob-1" />
            <div className="proj-blob proj-blob-2" />
            <div className="proj-noise" />

            {/* Section Header */}
            <motion.div
                className="section-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
            >
                <motion.h2 className="text-glow" variants={fadeUpVariant} custom={0}>
                    Featured Projects
                </motion.h2>
                <motion.div
                    className="gradient-line"
                    variants={{
                        hidden: { scaleX: 0, opacity: 0 },
                        visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    style={{ originX: 0.5 }}
                />
            </motion.div>

            {/* Cards Grid */}
            <div className="projects-grid">
                {projects.map((project, index) => {
                    const { src, type } = getMedia(project);
                    const isUploaded = !!mediaMap[project.id];

                    return (
                        <motion.div
                            key={project.id}
                            className="proj-card"
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            custom={index}
                            style={{ '--accent': project.accent }}
                            whileHover={{ y: -10, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                            onClick={() => setSelected(project)}
                        >
                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept="image/*,video/*"
                                className="proj-file-input"
                                ref={el => (fileInputRefs.current[project.id] = el)}
                                onChange={e => handleFileChange(e, project.id)}
                            />

                            {/* Image / Video */}
                            <div className="proj-img-wrap">
                                {src ? (
                                    <>
                                        <MediaDisplay
                                            src={src}
                                            type={type}
                                            alt={project.title}
                                            className="proj-img"
                                        />
                                        <div className="proj-img-gradient" />
                                        <div className="proj-thumbnail-overlay">
                                            <ArrowUpRight size={28} />
                                            <span>View</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="proj-img-placeholder">
                                        <Upload size={28} style={{ opacity: 0.35, color: `var(--accent, #06b6d4)` }} />
                                        <span>Open Details to add image</span>
                                    </div>
                                )}


                                {project.role && (
                                    <motion.div
                                        className="proj-img-overlay"
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.14 + 0.3 }}
                                    >
                                        <span className="proj-overlay-role">{project.role}</span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Glow border sweep */}
                            <div className="proj-card-glow" />

                            {/* Content */}
                            <div className="proj-body">
                                <motion.h3
                                    className="proj-title"
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: index * 0.14 + 0.22, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {project.title}
                                </motion.h3>

                                <motion.p
                                    className="proj-desc"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.14 + 0.32 }}
                                >
                                    {project.description}
                                </motion.p>


                                {project.tech && project.tech.length > 0 && (
                                    <motion.div
                                        className="proj-tech"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        {project.tech.map((t, i) => (
                                            <motion.span
                                                key={i}
                                                className="proj-badge"
                                                variants={badgeVariant}
                                                custom={i + index * 2}
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                )}

                                <div className="proj-footer">
                                    <div className="proj-icon-row">
                                        <motion.a
                                            href={project.github}
                                            className="proj-icon-btn"
                                            aria-label="GitHub"
                                            onClick={e => e.stopPropagation()}
                                            whileHover={{ scale: 1.15, rotate: -5 }}
                                            whileTap={{ scale: 0.92 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                        >
                                            <Github size={15} />
                                        </motion.a>
                                        <motion.a
                                            href={project.link}
                                            className="proj-icon-btn"
                                            aria-label="Live"
                                            onClick={e => e.stopPropagation()}
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.92 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                        >
                                            <ExternalLink size={15} />
                                        </motion.a>
                                    </div>
                                    <motion.button
                                        className="proj-details-btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.96 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                                    >
                                        Details <ArrowUpRight size={14} className="proj-btn-icon" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal — rendered via portal to escape isolation stacking context */}
            {ReactDOM.createPortal(
                <AnimatePresence mode="wait">
                    {selected && (
                        <motion.div
                            key="proj-modal-overlay"
                            className="proj-modal-bg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            onClick={() => setSelected(null)}
                        >
                            <motion.div
                                className="proj-modal"
                                initial={{ opacity: 0, scale: 0.86, y: 48 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.93, y: 24 }}
                                transition={{ type: 'spring', damping: 24, stiffness: 300, mass: 0.8 }}
                                style={{ '--accent': selected.accent }}
                                onClick={e => e.stopPropagation()}
                            >
                                <motion.button
                                    className="proj-modal-close"
                                    onClick={() => setSelected(null)}
                                    initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 360, damping: 20 }}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.88 }}
                                >
                                    <X size={20} />
                                </motion.button>

                                {/* Modal media */}
                                <motion.div
                                    className="proj-modal-img-wrap"
                                    initial={{ opacity: 0, scale: 1.04 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <MediaDisplay
                                        src={getMedia(selected).src}
                                        type={getMedia(selected).type}
                                        alt={selected.title}
                                        className="proj-modal-img"
                                    />
                                    <div className="proj-modal-img-grad" />

                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        className="proj-file-input"
                                        onChange={e => handleFileChange(e, selected.id)}
                                    />
                                    <motion.button
                                        className="proj-modal-upload-btn"
                                        title="Upload photo or video"
                                        onClick={e => {
                                            e.stopPropagation();
                                            e.currentTarget.previousElementSibling?.click();
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Upload size={14} /> Replace Image
                                    </motion.button>
                                </motion.div>

                                <div className="proj-modal-info">
                                    <div className="proj-modal-header-row">
                                        <motion.h3 className="proj-modal-title" style={{ color: selected.accent }} variants={modalContentVariant} initial="hidden" animate="visible" custom={0}>
                                            {selected.title}
                                        </motion.h3>
                                        <motion.span className="proj-modal-year" style={{ backgroundColor: `${selected.accent}20`, color: selected.accent }} variants={modalContentVariant} initial="hidden" animate="visible" custom={1}>
                                            2025
                                        </motion.span>
                                    </div>


                                    {selected.role && (
                                        <motion.p className="proj-modal-role" variants={modalContentVariant} initial="hidden" animate="visible" custom={2}>
                                            {selected.role}
                                        </motion.p>
                                    )}

                                    <motion.div className="proj-modal-divider" style={{ background: `linear-gradient(90deg, ${selected.accent}40, transparent)` }} variants={modalContentVariant} initial="hidden" animate="visible" custom={3} />

                                    <motion.p className="proj-modal-desc" variants={modalContentVariant} initial="hidden" animate="visible" custom={4}>
                                        {selected.description}
                                    </motion.p>


                                    {selected.tech && selected.tech.length > 0 && (
                                        <motion.div className="proj-tech" variants={modalContentVariant} initial="hidden" animate="visible" custom={5}>
                                            {selected.tech.map((t, i) => (
                                                <motion.span
                                                    key={i}
                                                    className="proj-badge"
                                                    initial={{ opacity: 0, scale: 0.75, y: 8 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    transition={{ delay: 0.38 + i * 0.07, type: 'spring', stiffness: 380, damping: 22 }}
                                                >
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    )}

                                    <motion.div className="proj-modal-links" variants={modalContentVariant} initial="hidden" animate="visible" custom={6}>
                                        <motion.a
                                            href={selected.github}
                                            className="proj-modal-btn"
                                            onClick={e => e.stopPropagation()}
                                            whileHover={{ scale: 1.04, y: -2 }}
                                            whileTap={{ scale: 0.96 }}
                                            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                                        >
                                            <Github size={15} /> GitHub
                                        </motion.a>
                                        <motion.a
                                            href={selected.link}
                                            className="proj-modal-btn accent"
                                            onClick={e => e.stopPropagation()}
                                            whileHover={{ scale: 1.04, y: -2 }}
                                            whileTap={{ scale: 0.96 }}
                                            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                                        >
                                            <ExternalLink size={15} /> Live Demo
                                        </motion.a>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                , document.body)}
        </section>
    );
};

export default Projects;
