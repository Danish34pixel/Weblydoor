import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dev = ({ onHoverChange }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // 1. Generate initial particle data
  const particles = useMemo(() => {
    const points = [];
    const addCluster = (startX, startY, endX, endY, density = 40) => {
      for (let i = 0; i < density; i++) {
        const t = Math.random();
        const baseX = startX + t * (endX - startX);
        const baseY = startY + t * (endY - startY);
        const spread = 6;
        points.push({
          originX: baseX + (Math.random() - 0.5) * spread,
          originY: baseY + (Math.random() - 0.5) * spread,
          size: Math.random() * 1.5,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };

    addCluster(35, 30, 15, 50, 150); 
    addCluster(15, 50, 35, 70, 150); 
    addCluster(58, 20, 42, 80, 200);
    addCluster(65, 30, 85, 50, 150); 
    addCluster(85, 50, 65, 70, 150); 
    return points;
  }, []);

  // 2. Track mouse relative to the SVG
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Convert screen pixels to SVG viewbox units (0-100)
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
        maxWidth: 'clamp(250px, 90vw, 320px)',
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
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g filter="url(#bloom)">
          {particles.map((p, i) => {
            // 3. Calculate Displacement Logic
            const dx = mousePos.x - p.originX;
            const dy = mousePos.y - p.originY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radius = 12; // How far the "blank" area spreads
            
            let forceX = 0;
            let forceY = 0;

            if (distance < radius) {
              const angle = Math.atan2(dy, dx);
              const push = (radius - distance) * 1.5; // Strength of the push
              forceX = -Math.cos(angle) * push;
              forceY = -Math.sin(angle) * push;
            }

            return (
              <motion.circle 
                key={i}
                r={p.size}
                fill="url(#particleGold)"
                initial={false}
                animate={{
                  cx: p.originX + forceX,
                  cy: p.originY + forceY,
                  opacity: distance < radius - 2 ? 0.1 : p.opacity // Optional: fade out inside the blank
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Dev; 