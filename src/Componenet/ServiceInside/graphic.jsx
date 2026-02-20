import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const Graphic = ({ onHoverChange }) => {
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
          size: Math.random() * 1.3,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
    };

    // --- 1. THE CROWN (Top Section) ---
    // Left peak
    addCluster(30, 30, 42, 40, 60); 
    // Center peak
    addCluster(50, 22, 50, 40, 80);
    // Right peak
    addCluster(70, 30, 58, 40, 60);
    // Base curves of the crown
    for (let i = 0; i <= 10; i++) {
        addCluster(30 + i, 30, 42, 40, 5); // Connect left
        addCluster(70 - i, 30, 58, 40, 5); // Connect right
    }

    // --- 2. THE PEN NIB (Body Section) ---
    // Top Horizontal Shoulder
    addCluster(35, 43, 65, 43, 100);
    
    // Left side curve to tip
    addCluster(35, 43, 30, 65, 80);
    addCluster(30, 65, 50, 95, 120);
    
    // Right side curve to tip
    addCluster(65, 43, 70, 65, 80);
    addCluster(70, 65, 50, 95, 120);

    // --- 3. NIB HOLE AND SLIT ---
    // The central circle hole
    for (let i = 0; i < 360; i += 20) {
        const rad = (i * Math.PI) / 180;
        addCluster(50 + Math.cos(rad) * 4, 68 + Math.sin(rad) * 4, 50, 68, 10);
    }
    // The slit (vertical line from hole to tip)
    addCluster(50, 72, 50, 92, 40);

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
                  opacity: distance < radius - 1 ? 0.2 : p.opacity 
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.1 }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Graphic;