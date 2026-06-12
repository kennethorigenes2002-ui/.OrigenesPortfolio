import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function App() {
    return (
        <div className="App fade-in">
            <Navigation />
            <main className="dashboard-main">
                <Hero />
                <Projects />
                <Skills />
                <Achievements />
                <Contact />
            </main>
        </div>
    );
}

export default App;
