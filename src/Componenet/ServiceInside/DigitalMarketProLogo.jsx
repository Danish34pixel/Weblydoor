import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const DigitalMarketProLogo = ({ onHoverChange = () => {} }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const particles = useMemo(() => {
    const points = [];
    
    const addCluster = (startX, startY, endX, endY, density = 80) => {
      for (let i = 0; i < density; i++) {
        const t = Math.random();
        const baseX = startX + t * (endX - startX);
        const baseY = startY + t * (endY - startY);
        const spread = 0.8; // tighter = thicker look
        points.push({
          originX: baseX + (Math.random() - 0.5) * spread,
          originY: baseY + (Math.random() - 0.5) * spread,
          size: Math.random() * 1.4 + 0.8, // bigger particles
          opacity: Math.random() * 0.4 + 0.6,
        });
      }
    };

    const addCircle = (centerX, centerY, radius, density, variance = 0.3) => {
      for (let i = 0; i < density; i++) {
        const angle = (i / density) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        points.push({
          originX: x + (Math.random() - 0.5) * variance,
          originY: y + (Math.random() - 0.5) * variance,
          size: Math.random() * 1.3 + 0.7,
          opacity: Math.random() * 0.4 + 0.6,
        });
      }
    };

    // 1. OUTER GEAR
    const gearRadius = 45;
    const teeth = 16;
    for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const nextAngle = ((i + 0.5) / teeth) * Math.PI * 2;
        addCluster(
            50 + Math.cos(angle) * gearRadius,
            50 + Math.sin(angle) * gearRadius,
            50 + Math.cos(nextAngle) * gearRadius,
            50 + Math.sin(nextAngle) * gearRadius,
            60 // thicker gear teeth
        );
    }

    addCircle(50, 50, 42, 350);

    // 2. INNER CIRCLES
    addCircle(50, 40, 15, 150);
    addCircle(50, 40, 12, 120);

    // 3. ARROW
    addCluster(50, 55, 55, 25, 180);
    addCluster(53, 26, 56, 26, 60);

    addCluster(48, 40, 35, 35, 120);
    addCluster(48, 43, 38, 42, 90);
    addCluster(52, 40, 65, 35, 120);
    addCluster(52, 43, 62, 42, 90);

    // 4. TYPO
    addCluster(32, 62, 68, 62, 200);
    addCluster(38, 70, 62, 70, 150);
    addCluster(42, 75, 48, 75, 50);
    addCircle(50, 75, 1, 30);
    addCluster(52, 75, 58, 75, 50);

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
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="goldGrad">
            <stop offset="0%" stopColor="#FFF6C0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g filter="url(#glow)">
          {particles.map((p, i) => {
            const dx = mousePos.x - p.originX;
            const dy = mousePos.y - p.originY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radius = 14;
            
            let forceX = 0;
            let forceY = 0;

            if (distance < radius) {
              const angle = Math.atan2(dy, dx);
              const push = (radius - distance) * 1.6;
              forceX = -Math.cos(angle) * push;
              forceY = -Math.sin(angle) * push;
            }

            return (
              <motion.circle 
                key={i}
                r={p.size}
                fill="url(#goldGrad)"
                animate={{
                  cx: p.originX + forceX,
                  cy: p.originY + forceY,
                  opacity: distance < radius - 2 ? 0.4 : p.opacity 
                }}
                transition={{ type: 'spring', stiffness: 140, damping: 18, mass: 0.1 }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default DigitalMarketProLogo;