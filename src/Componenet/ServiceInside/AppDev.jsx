import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const AppDev = ({ onHoverChange }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const particles = useMemo(() => {
    const points = [];
    const addCluster = (startX, startY, endX, endY, density = 40) => {
      for (let i = 0; i < density; i++) {
        const t = Math.random();
        const baseX = startX + t * (endX - startX);
        const baseY = startY + t * (endY - startY);
        const spread = 2.5; 
        points.push({
          originX: baseX + (Math.random() - 0.5) * spread,
          originY: baseY + (Math.random() - 0.5) * spread,
          size: Math.random() * 1.2,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };

    // 1. OUTER GEAR (Circular pattern with teeth)
  // 1. THE GEAR BODY (Outer and Inner Ring)
// This creates the "Circular Track" that connects the teeth
for (let i = 0; i < 360; i += 2) {
  const angle = (i * Math.PI) / 180;
  
  // Outer circle (at the base of the teeth)
  addCluster(
    50 + Math.cos(angle) * 36, 
    50 + Math.sin(angle) * 36, 
    50 + Math.cos(angle) * 36, 
    50 + Math.sin(angle) * 36, 
    3 // Small density to keep it sharp
  );
  
  // Inner circle (defining the hole in the gear)
  addCluster(
    50 + Math.cos(angle) * 30, 
    50 + Math.sin(angle) * 30, 
    50 + Math.cos(angle) * 30, 
    50 + Math.sin(angle) * 30, 
    2
  );
}

// 2. THE GEAR TEETH
// This remains for the jagged outer edge
for (let i = 0; i < 360; i += 5) {
  const angle = (i * Math.PI) / 180;
  const isTooth = i % 30 < 15; 
  if (isTooth) {
    const r = 42;
    addCluster(
        50 + Math.cos(angle) * r, 
        50 + Math.sin(angle) * r, 
        50 + Math.cos(angle) * r, 
        50 + Math.sin(angle) * r, 
        8 // Higher density for the teeth
    );
  }
}

    // 3. CENTRAL MOBILE PHONE
    // Phone Frame
    addCluster(44, 42, 56, 42, 30); // Top
    addCluster(44, 58, 56, 58, 30); // Bottom
    addCluster(44, 42, 44, 58, 40); // Left
    addCluster(56, 42, 56, 58, 40); // Right
    // Home button dot
    addCluster(50, 56, 50, 56, 15);

    return points;
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => {
        onHoverChange(false);
        setMousePos({ x: -100, y: -100 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        cursor: 'none',
        width: '100%',
        maxWidth: 'clamp(250px, 90vw, 450px)',
        minHeight: '250px',
        aspectRatio: '1',
        display: 'block',
        margin: '0 auto',
        padding: '0'
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="particleGold">
            <stop offset="0%" stopColor="#FFE07D" />
            <stop offset="60%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="bloom">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g filter="url(#bloom)">
          {particles.map((p, i) => {
            const dx = mousePos.x - p.originX;
            const dy = mousePos.y - p.originY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radius = 10; 
            
            let forceX = 0;
            let forceY = 0;

            if (distance < radius) {
              const angle = Math.atan2(dy, dx);
              const push = (radius - distance) * 1.8; 
              forceX = -Math.cos(angle) * push;
              forceY = -Math.sin(angle) * push;
            }

            return (
              <motion.circle 
                key={i}
                r={p.size}
                fill="url(#particleGold)"
                animate={{
                  cx: p.originX + forceX,
                  cy: p.originY + forceY,
                  opacity: distance < radius - 1 ? 0.15 : p.opacity 
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.1 }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default AppDev;