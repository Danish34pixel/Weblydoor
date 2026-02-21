import React, { useEffect, useState } from "react";

const Background = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Background.jpeg')",
        }}
      />

      {/* Dark Overlay with Spotlight Reveal */}
    <div
  className="absolute inset-0 bg-black pointer-events-none"
  style={{
    maskImage: `radial-gradient(circle 180px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`,
    WebkitMaskImage: `radial-gradient(circle 180px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`,
  }}
/>
    </div>
  );
};

export default Background;