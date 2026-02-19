import React from "react";
import { motion } from "framer-motion";

const Assemble = ({ text, onToggle }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'auto' }}>
        <div className="flex space-x-2 relative">
          {text.split("").map((char, i) => (
            <motion.span
              layoutId={`char-${i}`} // CRITICAL: Matches Text.jsx
              key={i}
              onClick={onToggle}
              className="cursor-pointer select-none"
              style={{
                fontSize: "14vw",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                background: "linear-gradient(135deg, #efd178, #d3a737, #c59514)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 8px rgba(201, 168, 76, 0.4))",
                letterSpacing: "2px",
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                mass: 1.4,
                delay: i * 0.05,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Assemble;