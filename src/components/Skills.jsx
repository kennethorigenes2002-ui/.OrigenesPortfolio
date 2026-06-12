import React, { useState } from 'react';
import './Skills.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Wrench, Layout, Database, Globe, GitBranch, Figma, MonitorSmartphone, ChevronDown, ChevronUp } from 'lucide-react';

const skillsData = [
    {
        category: 'FRONTEND',
        label: 'Frontend Development',
        description: 'HTML5, CSS3, JavaScript, React – Building responsive and interactive user interfaces',
        icons: [
            { icon: <Globe size={18} />, title: 'HTML/CSS' },
            { icon: <Code2 size={18} />, title: 'JavaScript' },
            { icon: <Layout size={18} />, title: 'React' },
        ],
        expanded: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Vite', 'TailwindCSS', 'Framer Motion'],
        color: '#d4621a',
    },
    {
        category: 'BACKEND',
        label: 'Backend Development',
        description: 'PHP, MySQL, Supabase – Server-side development and database management',
        icons: [
            { icon: <Server size={18} />, title: 'Server' },
            { icon: <Database size={18} />, title: 'Database' },
            { icon: <Globe size={18} />, title: 'APIs' },
        ],
        expanded: ['PHP', 'MySQL', 'Supabase', 'Node.js', 'Express', 'RESTful APIs'],
        color: '#c45a15',
    },
    {
        category: 'TOOLS',
        label: 'Tools & Platforms',
        description: 'Git, GitHub, Figma, VS Code – Development tools and version control systems',
        icons: [
            { icon: <GitBranch size={18} />, title: 'Git' },
            { icon: <Code2 size={18} />, title: 'VS Code' },
            { icon: <Figma size={18} />, title: 'Figma' },
        ],
        expanded: ['Git', 'GitHub', 'Figma', 'VS Code', 'Postman', 'Docker'],
        color: '#b85210',
    },
];

const SkillCard = ({ skill, index }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            className="skill-tech-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: index * 0.12 }}
            whileHover={{ y: -6, scale: 1.02 }}
        >
            {/* Glossy top blob */}
            <div className="skill-card-blob" />

            <div className="skill-card-inner">
                <span className="skill-card-category">{skill.category}</span>
                <p className="skill-card-desc">{skill.description}</p>

                <AnimatePresence>
                    {expanded && (
                        <motion.ul
                            className="skill-expanded-list"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {skill.expanded.map((item, i) => (
                                <li key={i}>
                                    <span className="skill-dot-sm" />
                                    {item}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>

                <div className="skill-card-footer">
                    <div className="skill-icon-row">
                        {skill.icons.map((ic, i) => (
                            <span key={i} className="skill-icon-badge" title={ic.title}>
                                {ic.icon}
                            </span>
                        ))}
                    </div>
                    <button
                        className="skill-view-more"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'View less' : 'View more'}
                        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-glow">Skills &amp; Technologies</h2>
                <div className="gradient-line" />
            </motion.div>

            <div className="skills-tech-grid">
                {skillsData.map((skill, index) => (
                    <SkillCard key={index} skill={skill} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Skills;
