import React, { useRef, Suspense, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Edges, useCursor, Sparkles, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Camera, Upload, User } from 'lucide-react';
import './Hero3D.css';

/* ─── 3D Profile Box ─────────────────────────────────────────── */
const ProfileImage3D = ({ imageUrl }) => {
    const groupRef = useRef();
    const [hovered, setHover] = useState(false);

    useCursor(hovered, 'pointer', 'auto');

    const texture = useTexture(imageUrl);

    const materials = useMemo(() => [
        new THREE.MeshStandardMaterial({ color: '#020c1b', metalness: 0.9, roughness: 0.1 }), // right
        new THREE.MeshStandardMaterial({ color: '#020c1b', metalness: 0.9, roughness: 0.1 }), // left
        new THREE.MeshStandardMaterial({ color: '#020c1b', metalness: 0.9, roughness: 0.1 }), // top
        new THREE.MeshStandardMaterial({ color: '#020c1b', metalness: 0.9, roughness: 0.1 }), // bottom
        new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),                      // front
        new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),                      // back
    ], [texture]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            const targetRotationY = hovered ? 0.3 : 0.05;
            groupRef.current.rotation.y += delta * targetRotationY;

            const targetScale = hovered ? 1.05 : 1;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

            const targetX = (state.pointer.x * Math.PI) / 4;
            const targetY = (state.pointer.y * Math.PI) / 4;
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY + Math.sin(state.clock.elapsedTime * 0.5) * 0.1, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX + state.clock.elapsedTime * targetRotationY, 0.1);
        }
    });

    return (
        <group ref={groupRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
                <mesh scale={1.8} material={materials}>
                    <boxGeometry args={[1.5, 2, 0.12]} />
                    <Edges color="#64ffda" scale={1.02} />
                </mesh>

                <mesh position={[0, 0, -0.07]} scale={1.8}>
                    <planeGeometry args={[1.7, 2.2]} />
                    <meshBasicMaterial color="#64ffda" transparent opacity={hovered ? 0.3 : 0.1} />
                </mesh>

                <Sparkles count={50} scale={3} size={2} speed={0.4} opacity={hovered ? 1 : 0.4} color="#64ffda" />
            </Float>
        </group>
    );
};

/* ─── Loader wrapper — remounts when URL changes ─────────────── */
const SceneContent = ({ imageUrl }) => (
    <Suspense fallback={null}>
        <group position={[1.2, 0.5, 0]} rotation={[0.05, -0.15, 0.05]}>
            <ProfileImage3D imageUrl={imageUrl} />
        </group>
    </Suspense>
);

/* ─── Avatar Upload Overlay ──────────────────────────────────── */
const AvatarUpload = ({ onUpload, hasCustom }) => {
    const inputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return;
        const url = URL.createObjectURL(file);
        onUpload(url);
        e.target.value = '';
    };

    return (
        <div className="avatar-upload-wrap">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="avatar-file-input"
                onChange={handleFileChange}
            />
            <motion.button
                className={`avatar-upload-btn ${hasCustom ? 'avatar-upload-btn--has-photo' : ''}`}
                onClick={() => inputRef.current?.click()}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                title="Upload your avatar photo"
            >
                {hasCustom ? (
                    <>
                        <Camera size={14} />
                        Change Photo
                    </>
                ) : (
                    <>
                        <Upload size={14} />
                        Upload Avatar
                    </>
                )}
            </motion.button>

            {!hasCustom && (
                <motion.div
                    className="avatar-hint"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    <User size={11} />
                    Click the box or upload button to set your photo
                </motion.div>
            )}
        </div>
    );
};

/* ─── Hero3D ─────────────────────────────────────────────────── */
const Hero3D = () => {
    const [imageUrl, setImageUrl] = useState('/cat_avatar2.png');
    const [hasCustom, setHasCustom] = useState(false);
    const prevUrl = useRef(null);

    const handleUpload = (url) => {
        // Revoke previous object URL if it was a blob
        if (prevUrl.current && prevUrl.current.startsWith('blob:')) {
            URL.revokeObjectURL(prevUrl.current);
        }
        prevUrl.current = url;
        setImageUrl(url);
        setHasCustom(true);
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="hero-text"
                >
                    <span className="hi-text text-glow">Hi, my name is</span>
                    <h1 className="name">Kenneth.</h1>
                    <h2 className="role">IT Student / Full Stack Developer.</h2>
                    <p className="intro">
                        I craft modern, robust systems and web applications. Passionate about exploring
                        futuristic design patterns, 3D web experiences, and scalable backend architecture.
                    </p>

                    <div className="hero-cta">
                        <a href="#projects" className="btn primary-btn box-glow">View Projects</a>
                        <a href="#contact" className="btn secondary-btn glass-panel text-glow">Contact Me</a>
                    </div>
                </motion.div>
            </div>

            {/* Avatar upload controls — sits on top of canvas */}
            <AvatarUpload onUpload={handleUpload} hasCustom={hasCustom} />

            <div className="canvas-container">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.2} color="#8be9fd" />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00e6ff" />
                    <Sparkles count={800} scale={50} size={2} speed={0.2} opacity={0.5} color="#8be9fd" />
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                    <SceneContent imageUrl={imageUrl} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>
        </section>
    );
};

export default Hero3D;
