import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Cursor from "./Inside/Cursor";
import LightRays from "./ServiceInside/LightRays";

import Dev from "./ServiceInside/Dev";
import DevCard from "./ServiceInside/DevCard";

import AppDev from "./ServiceInside/AppDev";
import AppCard from "./ServiceInside/AppCard";

import Graphic from "./ServiceInside/graphic";
import GraphicCard from "./ServiceInside/GraphicCard";

import DigitalMarketProLogo from "./ServiceInside/DigitalMarketProLogo";
import DigitalCard from "./ServiceInside/DigitalCard";

import SocialMedia from "./ServiceInside/SocialMedia";
import SocialCard from "./ServiceInside/SocialCad";

const Service = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const sectionRef = useRef(null);
  const devRef = useRef(null);
  const appRef = useRef(null);
  const graphicRef = useRef(null);
  const digitalRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = [
        devRef.current,
        appRef.current,
        graphicRef.current,
        digitalRef.current,
        socialRef.current,
      ];

      // Initial state
      sections.forEach((el, index) => {
        gsap.set(el, {
          opacity: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 100,
          pointerEvents: index === 0 ? "auto" : "none",
        });
      });

      const scrollEnd = isMobile ? "+=2000" : "+=3500";
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: scrollEnd,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      sections.forEach((el, index) => {
        if (index !== 0) {
          // Hide previous
          tl.to(sections[index - 1], {
            opacity: 0,
            y: -100,
            duration: 1,
            ease: "none",
            pointerEvents: "none",
          });

          // Show current
          tl.to(
            el,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "none",
              pointerEvents: "auto",
            },
            "<"
          );

          // Stay duration (this creates pause)
          tl.to({}, { duration: 1.2 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LightRays
        raysOrigin="top-left"
        raysColor="#b4a17b"
        followMouse={true}
        mouseInfluence={0.1}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4,
        }}
      >
        {/* DEV */}
        <div
          ref={devRef}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "24px" : "48px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: isMobile ? "20px" : "0",
          }}
        >
          <Dev onHoverChange={setIsLogoHovered} />
          <DevCard
            title="Development"
            description="Building robust, scalable web applications."
            icon="< />"
            onHoverChange={setIsLogoHovered}
          />
        </div>

        {/* APP */}
        <div
          ref={appRef}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "24px" : "48px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: isMobile ? "20px" : "0",
          }}
        >
          <AppDev onHoverChange={setIsLogoHovered} />
          <AppCard
            title="App Development"
            description="Modern mobile and web apps."
            icon="📱"
            onHoverChange={setIsLogoHovered}
          />
        </div>

        {/* GRAPHIC */}
        <div
          ref={graphicRef}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "24px" : "48px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: isMobile ? "20px" : "0",
          }}
        >
          <Graphic onHoverChange={setIsLogoHovered} />
          <GraphicCard
            title="Graphic Design"
            description="Creative branding & visuals."
            icon="🎨"
            onHoverChange={setIsLogoHovered}
          />
        </div>

        {/* DIGITAL */}
        <div
          ref={digitalRef}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "24px" : "48px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: isMobile ? "20px" : "0",
          }}
        >
          <DigitalMarketProLogo onHoverChange={setIsLogoHovered} />
          <DigitalCard
            title="Digital Marketing"
            description="Growth focused marketing strategy."
            icon="🚀"
            onHoverChange={setIsLogoHovered}
          />
        </div>

        {/* SOCIAL */}
        <div
          ref={socialRef}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "24px" : "48px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: isMobile ? "20px" : "0",
          }}
        >
          <SocialMedia onHoverChange={setIsLogoHovered} />
          <SocialCard
            title="Social Media Marketing"
            description="Engaging social presence."
            icon="📲"
            onHoverChange={setIsLogoHovered}
          />
        </div>
      </div>

      <Cursor isHovering={isLogoHovered} />
    </div>
  );
};

export default Service;