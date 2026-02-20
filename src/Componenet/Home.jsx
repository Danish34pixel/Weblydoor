import React, { useState, useMemo } from 'react'
import Nav from './Nav'
import Logo from './Inside/Logo'
import Cursor from './Inside/Cursor'
import Text from './Inside/Text'
import Assemble from './Inside/Assemble'
import DecryptedText from './Inside/Dcrypt'
import Service from './Service'

const Home = () => {
  const [isAssembled, setIsAssembled] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false) // State for cursor blanking
  
  const text = "WEBLYDOOR"

  const charData = useMemo(
    () =>
      text.split("").map(() => ({
        randomX: Math.random() * 400 - 200,
        randomRotate: Math.random() * 30 - 15,
      })),
    [text]
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: '#050505' }}>
      <Nav />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 72px)', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, zIndex: 10, position: 'relative' }}>
          <Logo />
        </div>

        {!isAssembled ? (
          <Text text={text} charData={charData} onToggle={() => setIsAssembled(true)} />
        ) : (
          <Assemble text={text} onToggle={() => setIsAssembled(false)} />
        )}
      </main>

      {/* Stats Section */}
      <div className='flex gap-4 relative z-10 p-4 justify-center bg-transparent'>
        <style>{`
          .decrypt-text h1 {
            font-family: 'Playfair Display', serif;
            color: rgba(232, 201, 122, 0.8);
            transition: all 0.3s ease;
            text-align: center;
            letter-spacing: 1px;
          }
          .decrypt-text h1:hover {
            color: #e8c97a;
            text-shadow: 0 0 20px rgba(232, 201, 122, 0.6);
          }
          .decrypt-text span.font-bold {
            background: linear-gradient(135deg, #F5E6BA, #E8C97A, #C9A84C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
          }
        `}</style>

        <div className='decrypt-text'>
          <h1>
            <span className='font-bold'>
              <DecryptedText text="100%" speed={20} maxIterations={8} animateOn="both" />
            </span>
            <br />
            <DecryptedText text="Customer support" speed={20} maxIterations={18} animateOn="both" />
          </h1>
        </div>

        <div className='decrypt-text'>
          <h1>
            <span className='font-bold'>
              <DecryptedText text="24/7" speed={20} maxIterations={8} animateOn="both" />
            </span>
            <br />
            <DecryptedText text="Support available" speed={20} maxIterations={8} animateOn="both" />
          </h1>
        </div>
      </div>

      {/* Service Section with Blanking Cursor trigger */}
    <Service/>
    </div>
  )
}

export default Home;