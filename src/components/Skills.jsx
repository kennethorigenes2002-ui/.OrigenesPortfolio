import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, Server, Wrench, Layout, Database, Globe, GitBranch, Figma, MonitorSmartphone, ChevronDown, ChevronUp, Layers, Terminal, Smartphone } from 'lucide-react';

const skillsData = [
    {
        category: 'FRONTEND',
        label: 'Client-Side Experience',
        description: 'Building modern, high-performance web interfaces with focus on interactivity and user experience.',
        icons: [
            { icon: <Layout size={20} />, title: 'React' },
            { icon: <Globe size={20} />, title: 'Web App' },
            { icon: <Smartphone size={20} />, title: 'Responsive' },
        ],
        expanded: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'JavaScript (ES6+)', 'HTML5/CSS3', 'Next.js'],
        color: '#06b6d4',
    },
    {
        category: 'BACKEND',
        label: 'Server & Logic',
        description: 'Designing robust architectures and scalable databases to power complex web applications.',
        icons: [
            { icon: <Server size={20} />, title: 'Server' },
            { icon: <Database size={20} />, title: 'Database' },
            { icon: <Layers size={20} />, title: 'CMS' },
        ],
        expanded: ['Node.js', 'Express', 'PHP', 'MySQL', 'Supabase', 'MongoDB', 'RESTful APIs'],
        color: '#8b5cf6',
    },
    {
        category: 'TOOLS',
        label: 'Workflow & DevOps',
        description: 'Utilizing industry-standard tools for version control, design, and streamlined development cycles.',
        icons: [
            { icon: <GitBranch size={20} />, title: 'Git' },
            { icon: <Terminal size={20} />, title: 'CLI' },
            { icon: <Figma size={20} />, title: 'Figma' },
        ],
        expanded: ['Git & GitHub', 'VS Code', 'Postman', 'Vercel', 'Netlify', 'Docker', 'npm / yarn'],
        color: '#10b981',
    },
];

const SkillCard = ({ skill, index }) => {
    const [expanded, setExpanded] = useState(false);

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="skill-tech-card"
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                '--accent': skill.color
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            {/* Glossy top blob */}
            <div className="skill-card-blob" />
            <div className="skill-card-noise" />

            <div className="skill-card-inner" style={{ transform: "translateZ(50px)" }}>
                <div className="skill-card-header">
                    <span className="skill-card-category">{skill.category}</span>
                    <h3 className="skill-card-label">{skill.label}</h3>
                </div>

                <p className="skill-card-desc">{skill.description}</p>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            className="skill-expanded-grid"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {skill.expanded.map((item, i) => (
                                <motion.span
                                    key={i}
                                    className="skill-tag"
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="skill-card-footer">
                    <div className="skill-icon-row">
                        {skill.icons.map((ic, i) => (
                            <motion.span
                                key={i}
                                className="skill-icon-badge"
                                title={ic.title}
                                whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                                {ic.icon}
                            </motion.span>
                        ))}
                    </div>
                    <button
                        className={`skill-view-more ${expanded ? 'active' : ''}`}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Collapse' : 'Explore tech'}
                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={14} />
                        </motion.div>
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
