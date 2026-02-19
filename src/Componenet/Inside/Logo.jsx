import React from 'react'

const Logo = () => {
  const handleMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--x', `${x}%`)
    el.style.setProperty('--y', `${y}%`)
  }

  return (
    <div className="logo-root">
      <style>{`
        .logo-root { display:flex; align-items:center; justify-content:center; }
        .logo-wrap { position: relative; display: inline-block; cursor: pointer; border-radius: 6px; }
        .logo-img { display:block; width: 220px; height: auto; transition: filter .22s ease, transform .18s ease; filter: brightness(0.06) saturate(0.25) contrast(0.9); }
        .logo-wrap:hover .logo-img { filter: brightness(1.05) saturate(1) contrast(1.05); transform: scale(1.02); }

        /* golden spotlight that follows mouse when hovering */
        .logo-highlight {
          position: absolute; inset: 0; pointer-events: none; border-radius: 6px;
          mix-blend-mode: screen; opacity: 0; transition: opacity .18s ease, transform .18s ease;
          background: radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,245,200,0.95) 0%, rgba(255,235,170,0.6) 8%, rgba(201,168,76,0.25) 18%, transparent 38%);
          transform: scale(0.9);
        }
        .logo-wrap:hover .logo-highlight { opacity: 1; transform: scale(1); }

        @media (max-width: 640px) { .logo-img { width: 160px; } }
      `}</style>

      <div className="logo-wrap" onMouseMove={handleMove}>
        <img src="/logoCompany.png" alt="Company Logo" className="logo-img" />
        <div className="logo-highlight" />
      </div>
    </div>
  )
}

export default Logo