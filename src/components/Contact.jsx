import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('Message sent successfully!');
        setTimeout(() => setFormStatus(''), 3000);
        e.target.reset();
    };

    return (
        <section id="contact" className="contact-section">
            <div className="section-header">
                <h2 className="text-glow">Get In Touch</h2>
                <div className="gradient-line"></div>
            </div>
            <div className="contact-container">

                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="contact-subtitle">Let's build something great together.</h3>
                    <p className="contact-desc">
                        I'm currently looking for new opportunities and collaborations.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="social-links">
                        <a href="#" aria-label="GitHub"><Github /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin /></a>
                        <a href="#" aria-label="Twitter"><Twitter /></a>
                        <a href="mailto:hello@example.com" aria-label="Email"><Mail /></a>
                    </div>
                </motion.div>

                <motion.form
                    className="contact-form dashboard-card"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" required placeholder="KennethOrigenes" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required placeholder="kenneth@example.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="5" required placeholder="Hello! I would like to..."></textarea>
                    </div>

                    <button type="submit" className="submit-btn text-glow">Send Message</button>

                    {formStatus && <p className="form-status">{formStatus}</p>}
                </motion.form>

            </div>
        </section>
    );
};

export default Contact;
