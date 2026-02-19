import { useState, useEffect, useRef } from "react"

const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState([])
  const [clicking, setClicking] = useState(false)
  const frameRef = useRef()
  const trailRef = useRef([])
  const posRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
      // expose cursor position as CSS variables for other components to use
      try {
        document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`)
        document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`)
      } catch (err) {
        // ignore (server-side rendering / restricted env)
      }
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)

    const tick = () => {
      trailRef.current = [
        { x: posRef.current.x, y: posRef.current.y, id: Date.now() + Math.random() },
        ...trailRef.current.slice(0, 14),
      ]
      setTrail([...trailRef.current])
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        body {
          min-height: 100vh;
          font-family: 'Georgia', serif;
          color: rgba(201,168,76,0.95);
        }

        /* Ripple rings on click (golden) */
        .ripple {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          animation: rippleOut 0.8s ease-out forwards;
          border: 1.5px solid rgba(232, 201, 122,0.8);
          z-index: 99998;
        }
        @keyframes rippleOut {
          from { width: 0px; height: 0px; opacity: 0.9; transform: translate(-50%, -50%); }
          to   { width: 96px; height: 96px; opacity: 0; transform: translate(-50%, -50%); }
        }

        /* Trail drops (golden) */
        .drop {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99997;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s;
        }

        /* Main cursor blob (gold) */
        .cursor-main {
          position: fixed;
          pointer-events: none;
          z-index: 999999;
          transform: translate(-50%, -50%);
          transition: transform 0.05s ease;
        }

        .cursor-inner {
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255,250,205,1), rgba(232, 201, 122,0.95) 48%, rgba(201,168,76,0.85) 100%);
          box-shadow:
            0 0 20px rgba(201,168,76,0.9),
            0 0 40px rgba(232, 201, 122,0.6),
            0 0 60px rgba(201,168,76,0.4),
            inset 0 -3px 8px rgba(140,100,30,0.45),
            inset 0 3px 6px rgba(140,100,30,0.45);
          transition: width 0.12s cubic-bezier(0.34,1.56,0.64,1), height 0.12s cubic-bezier(0.34,1.56,0.64,1);
        }

        .cursor-inner::after {
          content: '';
          position: absolute;
          top: 14%;
          left: 18%;
          width: 32%;
          height: 20%;
          background: rgba(140,100,30,0.45);
          border-radius: 50%;
          filter: blur(2px);
        }

        /* Ambient particles (golden glow) */
        .ambient {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99996;
          opacity: 0;
          animation: floatUp var(--dur) ease-in infinite;
          animation-delay: var(--delay);
          background: radial-gradient(circle, rgba(232,201,122,0.6), transparent);
        }
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0) scale(0.5); }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-40px) scale(1.1); }
        }
      `}</style>

      {/* Trail drops */}
      {trail.map((t, i) => {
        const age = i / trail.length
        const size = Math.max(2, 14 * (1 - age))
        const opacity = (1 - age) * 0.7
        return (
          <div
            key={t.id}
            className="drop"
            style={{
              left: t.x,
              top: t.y,
              width: size,
              height: size,
              background: `radial-gradient(circle at 35% 35%, rgba(255,250,205,${opacity}), rgba(232,201,122,${opacity * 0.7}))`,
              boxShadow: `0 0 ${size * 2}px rgba(232,201,122,${opacity * 0.8})`,
              filter: `blur(${age * 1.5}px)`,
            }}
          />
        )
      })}

      {/* Ambient particles near cursor */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="ambient"
          style={{
            left: pos.x + (i % 2 === 0 ? 1 : -1) * (6 + i * 3),
            top: pos.y + (i % 3 === 0 ? 2 : -2) * (4 + i * 2),
            width: 4 + i * 1.5,
            height: 4 + i * 1.5,
            "--dur": `${1.2 + i * 0.3}s`,
            "--delay": `${i * 0.2}s`,
          }}
        />
      ))}

      {/* Main cursor */}
      <div className="cursor-main" style={{ left: pos.x, top: pos.y }}>
        <div
          className="cursor-inner"
          style={{
            width: clicking ? 28 : 22,
            height: clicking ? 28 : 22,
            position: "relative",
          }}
        />
      </div>

      {/* Click ripples handled via CSS animation on re-render — simple version */}
      <ClickRipple pos={pos} clicking={clicking} />
    </>
  )
}

const ClickRipple = ({ pos, clicking }) => {
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    if (clicking) {
      const id = Date.now()
      setRipples(r => [...r, { id, x: pos.x, y: pos.y }])
      setTimeout(() => setRipples(r => r.filter(r => r.id !== id)), 900)
    }
  }, [clicking])

  return (
    <>
      {ripples.map(r => (
        <div
          key={r.id}
          className="ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  )
}

export default Cursor