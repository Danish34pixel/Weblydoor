import React, { useState, useEffect } from 'react'

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact']

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@300;400;500&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --gold-pale: #F5E6BA;
          --black: #0A0A0A;
          --black-mid: #141414;
          --black-soft: #1E1E1E;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #0d0d0d;
          min-height: 100vh;
          font-family: 'Cormorant Garamond', serif;
        }

        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-wrapper.scrolled {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(10, 10, 10, 0.92);
          box-shadow: 0 1px 0 rgba(201, 168, 76, 0.2), 0 8px 32px rgba(0,0,0,0.6);
        }

        .nav-border-top {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
          animation: shimmer 3s ease-in-out infinite;
          background-size: 200% 100%;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .nav-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          text-decoration: none;
        }

        .logo-emblem {
          width: 42px;
          height: 42px;
          position: relative;
          flex-shrink: 0;
        }

        .logo-emblem svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 8px rgba(201, 168, 76, 0.4));
          transition: filter 0.3s ease;
        }

        .logo-image {
          width: 42px;
          height: 42px;
          object-fit: contain;
        }

        .nav-logo:hover .logo-emblem svg {
          filter: drop-shadow(0 0 14px rgba(201, 168, 76, 0.7));
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-primary {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--gold-light);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .logo-secondary {
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          font-weight: 300;
          color: var(--gold);
          letter-spacing: 4px;
          text-transform: uppercase;
          opacity: 0.8;
        }

        /* Nav Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
        }

        .nav-link-item {
          position: relative;
        }

        .nav-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(201, 168, 76, 0.65);
          text-decoration: none;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 8px 18px;
          position: relative;
          transition: color 0.3s ease;
          cursor: pointer;
          display: block;
          background: none;
          border: none;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 18px;
          right: 18px;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: left;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--gold-light);
        }

        .nav-link:hover::before,
        .nav-link.active::before {
          transform: scaleX(1);
        }

        .nav-link.active {
          color: var(--gold-light);
        }

        /* Diamond separator */
        .nav-separator {
          color: var(--gold);
          opacity: 0.3;
          font-size: 6px;
          user-select: none;
        }

        /* CTA Button */
        .nav-cta {
          position: relative;
          padding: 10px 28px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--black);
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          border: none;
          cursor: pointer;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(201, 168, 76, 0.3);
        }

        .nav-cta:hover {
          background: linear-gradient(135deg, #F0D890, var(--gold-light));
          box-shadow: 0 6px 28px rgba(201, 168, 76, 0.5);
          transform: translateY(-1px);
        }

        .nav-cta::before {
          content: '';
          position: absolute;
          inset: 1px;
          clip-path: polygon(7px 0%, 100% 0%, calc(100% - 7px) 100%, 0% 100%);
          background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent);
          pointer-events: none;
        }

        /* Hamburger */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 8px;
          background: none;
          border: 1px solid rgba(201, 168, 76, 0.2);
        }

        .hamburger-line {
          width: 24px;
          height: 1.5px;
          background: var(--gold);
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .nav-hamburger.open .hamburger-line:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .nav-hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger.open .hamburger-line:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 74px;
          left: 0;
          right: 0;
          background: rgba(10, 10, 10, 0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201, 168, 76, 0.15);
          padding: 24px 40px 32px;
          transform: translateY(-110%);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-link {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 400;
          color: rgba(201, 168, 76, 0.5);
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid rgba(201, 168, 76, 0.08);
          cursor: pointer;
          transition: color 0.3s ease, padding-left 0.3s ease;
          display: block;
          letter-spacing: 1px;
        }

        .mobile-nav-link:hover {
          color: var(--gold-light);
          padding-left: 12px;
        }

        .mobile-cta {
          margin-top: 24px;
          display: inline-block;
          padding: 14px 36px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--black);
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          cursor: pointer;
          border: none;
        }

        /* Demo Page */
        .demo-page {
          background: radial-gradient(ellipse at top, #1a1300 0%, #0A0A0A 60%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 80px;
        }

        .demo-content {
          text-align: center;
          padding: 60px 20px;
        }

        .demo-eyebrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.7;
          margin-bottom: 20px;
        }

        .demo-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 700;
          color: transparent;
          background: linear-gradient(135deg, var(--gold-pale), var(--gold-light), var(--gold));
          -webkit-background-clip: text;
          background-clip: text;
          line-height: 1.05;
          margin-bottom: 24px;
        }

        .demo-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          color: rgba(201, 168, 76, 0.45);
          letter-spacing: 1px;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .demo-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 32px auto;
        }

        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .nav-hamburger { display: flex; }
        }

        @media (max-width: 480px) {
          .nav-container { padding: 0 20px; }
          .mobile-menu { padding: 24px 20px 32px; }
        }
      `}</style>

      <nav className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-border-top" />
        <div className="nav-container">
          {/* Logo */}
          <a className="nav-logo" href="#">
            <div className="logo-image-wrapper">
              <img src="/logoCompany.png" alt="Company logo" className="logo-image" />
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navItems.map((item, i) => (
              <React.Fragment key={item}>
                <li className="nav-link-item">
                  <button
                    className={`nav-link ${activeItem === item ? 'active' : ''}`}
                    onClick={() => setActiveItem(item)}
                  >
                    {item}
                  </button>
                </li>
                {i < navItems.length - 1 && (
                  <li className="nav-separator">◆</li>
                )}
              </React.Fragment>
            ))}
          </ul>

        

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map(item => (
            <li key={item}>
              <button
                className="mobile-nav-link"
                onClick={() => { setActiveItem(item); setMenuOpen(false); }}
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <button className="mobile-cta">Book Now</button>
      </div>

     
    </>
  )
}

export default Nav