import React from "react";
import { motion } from "framer-motion";

const BaseCard = ({
  index = "01",
  category = "Service",
  title,
  description,
  icon,
  footerLeft,
  footerRight,
  onHoverChange,
}) => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1024;

  return (
    <motion.div
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{
        width: isMobile ? "100%" : isTablet ? "320px" : "380px",
        maxWidth: isMobile ? "100%" : "380px",
        height: isMobile ? "400px" : "450px",
        padding: isMobile ? "30px" : "40px",
        background: "rgba(15, 15, 15, 0.45)",
        backdropFilter: "blur(14px)",
        borderRadius: "28px",
        border: "1px solid rgba(212, 175, 55, 0.15)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        cursor: "none",
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      }}
    >
      {/* Unified Golden Glow */}
      <div
        style={{
          position: "absolute",
          top: "-40%",
          right: "-40%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* TOP SECTION */}
      <div>
        <span
          style={{
            color: "#D4AF37",
            fontSize: isMobile ? "0.65rem" : "0.75rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          {category} {index}
        </span>

        <h2
          style={{
            color: "#fff",
            fontSize: isMobile ? "1.6rem" : "2.2rem",
            marginTop: "15px",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            lineHeight: "1.2",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            lineHeight: "1.6",
            marginTop: "20px",
            fontSize: isMobile ? "0.85rem" : "0.95rem",
          }}
        >
          {description}
        </p>
      </div>

      {/* BOTTOM SECTION */}
      <div>
        <div
          style={{
            fontSize: isMobile ? "1.4rem" : "1.8rem",
            color: "#D4AF37",
            marginBottom: "20px",
          }}
        >
          {icon}
        </div>

        {/* Glow Track */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(212, 175, 55, 0.15)",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            style={{
              position: "absolute",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              boxShadow: "0 0 12px rgba(212,175,55,0.5)",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "12px",
            fontSize: "0.7rem",
            color: "rgba(212, 175, 55, 0.4)",
            fontFamily: "monospace",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{footerLeft}</span>
          <span>{footerRight}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BaseCard;