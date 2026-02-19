import React from "react";
import { motion } from "framer-motion";

// Receive props from App
const Text = ({ text, charData, onToggle }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
      `}</style>
      {/* Removed 'pointer-events-none' so we can actually click the letters */}
      <div className="absolute inset-0 overflow-hidden" style={{ pointerEvents: 'auto' }}>
        <div className="w-full h-full relative flex justify-center">
          {text.split("").map((char, i) => {
            // Use the data passed from App
            const { randomX, randomRotate } = charData[i];

            return (
              <motion.span
                layoutId={`char-${i}`} // CRITICAL: Must match Assemble.jsx
                key={i}
                onClick={onToggle} // CRITICAL: Triggers the state change
                className="absolute top-0 cursor-pointer select-none"
                style={{
                  fontSize: "20vw", // Big falling size
                  zIndex: 1,
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  background: "linear-gradient(135deg, #efd178, #d3a737, #c59514)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 8px rgba(201, 168, 76, 0.4))",
                  textShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
                  letterSpacing: "2px",
                }}
              initial={{
                x: randomX,
                y: -200,
                rotate: randomRotate,
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                x: randomX,
                y: "60vh",
                rotate: randomRotate,
                scale: [0.9, 1.1, 1],
                opacity: 1,
              }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 80,
                damping: 12,
                mass: 1.4,
              }}
            >
              {char}
            </motion.span>
          );
        })}
        </div>
      </div>
    </>
  );
};

export default Text;