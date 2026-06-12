import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Certificates', href: '#certificates' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navigation ${isScrolled ? 'scrolled glass-panel' : ''}`}>
            <div className="nav-container">
                <a href="#home" className="logo">

                </a>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X color="#06b6d4" /> : <Menu color="#06b6d4" />}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu glass-panel">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
