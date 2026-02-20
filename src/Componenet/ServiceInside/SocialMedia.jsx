import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const SocialMedia = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

 const particles = useMemo(() => {
  const points = [];
  
  // Thicker straight lines
  const addCluster = (startX, startY, endX, endY, density = 60) => {
    for (let i = 0; i < density; i++) {
      const t = Math.random();
      const baseX = startX + t * (endX - startX);
      const baseY = startY + t * (endY - startY);

      points.push({
        originX: baseX + (Math.random() - 0.5) * 0.6, // tighter
        originY: baseY + (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.2 + 0.8,              // bigger particles
        opacity: Math.random() * 0.3 + 0.7,           // darker
        isSwoosh: false
      });
    }
  };

  // Thicker arcs
  const addArc = (radius, startAngle, endAngle, density = 250, isSwoosh = true) => {
    for (let i = 0; i < density; i++) {
      const angle = startAngle + Math.random() * (endAngle - startAngle);
      const r = radius + (Math.random() - 0.5) * 0.8;

      points.push({
        originX: 50 + Math.cos(angle) * r,
        originY: 50 + Math.sin(angle) * r,
        size: Math.random() * 1 + 0.6,
        opacity: Math.random() * 0.2 + 0.8,
        isSwoosh,
        angle
      });
    }
  };

  // --- CENTRAL BOOST ARROW (Thicker) ---
  addCluster(50, 42, 50, 68, 160);
  addCluster(50, 35, 42, 45, 90);
  addCluster(50, 35, 58, 45, 90);
  
  // Heart thicker
  for(let i=0; i<80; i++) {
    const a = Math.random() * Math.PI * 2;
    points.push({
      originX: 50 + Math.cos(a)*3,
      originY: 42 + Math.sin(a)*3,
      size: 0.9,
      opacity: 0.9
    });
  }

  // --- SOCIAL ICONS THICKER ---
  addCluster(36, 52, 42, 52, 40);
  addCluster(36, 58, 42, 58, 40);
  addCluster(36, 52, 36, 58, 40);

  addArc(2.5, 0, Math.PI*2, 40, false);
  addCluster(62, 52, 68, 58, 30);
  addCluster(62, 64, 68, 58, 30);

  // --- GOLDEN SWOOSHES HEAVY ---
  addArc(38, -Math.PI * 0.2, Math.PI * 0.6, 400, true);
  addArc(41, Math.PI * 0.8, Math.PI * 1.6, 400, true);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -100, y: -100 });
      }}
      onMouseMove={handleMouseMove}
      style={{ width: '100%', maxWidth: 'clamp(250px, 90vw, 450px)', minHeight: '250px', aspectRatio: '1', cursor: 'none', display: 'block', margin: '0 auto', padding: '0' }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ display: 'block' }}>
          <defs>
            <radialGradient id="goldGlow">
              <stop offset="0%" stopColor="#FFF4CC" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {particles.map((p, i) => {
            const dx = mousePos.x - p.originX;
            const dy = mousePos.y - p.originY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const activeRadius = 12;

            let forceX = 0;
            let forceY = 0;

            if (distance < activeRadius) {
              const angle = Math.atan2(dy, dx);
              const push = (activeRadius - distance) * 1.6;
              forceX = -Math.cos(angle) * push;
              forceY = -Math.sin(angle) * push;
            }

            return (
              <motion.circle
                key={i}
                r={p.size}
                fill="url(#goldGlow)"
                initial={{ opacity: 0 }}
                animate={{
                  cx: p.originX + forceX,
                  cy: p.originY + forceY,
                  opacity: distance < activeRadius ? 1 : p.opacity,
                  // Slow rotation for the swooshes only
                  rotate: p.isSwoosh ? [0, 360] : 0
                }}
                transition={{
                  cx: { type: 'spring', stiffness: 120, damping: 20, mass: 0.1 },
                  cy: { type: 'spring', stiffness: 120, damping: 20, mass: 0.1 },
                  opacity: { duration: 0.5 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              />
            );
          })}
        </svg>
    </div>
  );
};

export default SocialMedia;