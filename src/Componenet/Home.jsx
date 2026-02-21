import React, { useState, useMemo, useEffect, useRef } from "react";
import Nav from "./Nav";
import Logo from "./Inside/Logo";
import Cursor from "./Inside/Cursor";
import Text from "./Inside/Text";
import Assemble from "./Inside/Assemble";
import DecryptedText from "./Inside/Dcrypt";
import Service from "./Service";

import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const Home = () => {
  const [isAssembled, setIsAssembled] = useState(false);
  const scrollRef = useRef(null);

  const text = "WEBLYDOOR";

  const charData = useMemo(
    () =>
      text.split("").map(() => ({
        randomX: Math.random() * 400 - 200,
        randomRotate: Math.random() * 30 - 15,
      })),
    [text]
  );

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.9,
      lerp: 0.08,
    });

    return () => scroll.destroy();
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        data-scroll-container
        style={{ minHeight: "100vh", position: "relative" }}
      >
        <Nav />

        {/* Hero Section */}
        <main
          data-scroll-section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
            }}
          >
            <Logo />
          </div>

          {!isAssembled ? (
            <Text
              text={text}
              charData={charData}
              onToggle={() => setIsAssembled(true)}
            />
          ) : (
            <Assemble text={text} onToggle={() => setIsAssembled(false)} />
          )}
        </main>

        {/* Stats Section */}
        <div
          data-scroll-section
          className="flex gap-4 relative z-10 p-4 justify-center"
        >
          <div className="decrypt-text">
            <h1>
              <span className="font-bold">
                <DecryptedText
                  text="100%"
                  speed={20}
                  maxIterations={8}
                  animateOn="both"
                />
              </span>
              <br />
              <DecryptedText
                text="Customer support"
                speed={20}
                maxIterations={18}
                animateOn="both"
              />
            </h1>
          </div>

          <div className="decrypt-text">
            <h1>
              <span className="font-bold">
                <DecryptedText
                  text="24/7"
                  speed={20}
                  maxIterations={8}
                  animateOn="both"
                />
              </span>
              <br />
              <DecryptedText
                text="Support available"
                speed={20}
                maxIterations={8}
                animateOn="both"
              />
            </h1>
          </div>
        </div>

        {/* Service Section */}
        <div data-scroll-section>
          <Service />
        </div>
      </div>

      <Cursor />
    </>
  );
};

export default Home;