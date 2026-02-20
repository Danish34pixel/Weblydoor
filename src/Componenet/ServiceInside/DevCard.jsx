import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, description, icon, onHoverChange }) => {
  return (
    <motion.div
      // This tells your Cursor.jsx to go "blank" when hovering the card
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      
      whileHover={{ y: -10 }}
      style={{
        width: '320px',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        border: '1px solid rgba(232, 201, 122, 0.2)', // Subtle gold border
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none', // Hides default mouse
        transition: 'border-color 0.3s ease'
      }}
      className="service-card"
    >
      {/* Decorative Gradient Glow */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(232, 201, 122, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Icon Area */}
      <div style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1.5rem',
        display: 'inline-block',
        background: 'linear-gradient(135deg, #FFE07D, #B8860B)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {icon}
      </div>

      {/* Content */}
      <h3 style={{ 
        color: '#E8C97A', 
        fontSize: '1.5rem', 
        marginBottom: '1rem',
        fontFamily: "'Playfair Display', serif" 
      }}>
        {title}
      </h3>
      
      <p style={{ 
        color: 'rgba(255, 255, 255, 0.6)', 
        lineHeight: '1.6',
        fontSize: '0.95rem' 
      }}>
        {description}
      </p>

      {/* Bottom Border Accent */}
      <motion.div 
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #B8860B, #FFE07D)',
        }}
      />
    </motion.div>
  );
};

export default Card;