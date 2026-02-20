import React, { useState } from 'react'
import LogoServi from './ServiceInside/Dev'
import Cursor from './Inside/Cursor'
import LightRays from './ServiceInside/LightRays'
import Card from './ServiceInside/DevCard'

const Service = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  return (
    <>
      <div style={{ width: '100%', height: '680px', position: 'relative', overflow: 'hidden' }}>
        <LightRays
          raysOrigin="top-left"
          raysColor="#b4a17b"
          followMouse={true}
          mouseInfluence={0.1}
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'auto', zIndex: 4
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '48px' , padding: '0 20px'}}>
            <LogoServi onHoverChange={setIsLogoHovered} />
            <Card className="service-card"
              title="Development"
              description="Building robust, scalable web applications with clean code and high performance."
              icon="< />"
              onHoverChange={setIsLogoHovered}
            />
          </div>
        </div>
        {/* Custom Cursor placed at the root level */}
        <Cursor isHovering={isLogoHovered} />
  </div>
    </>
    
  )
}

export default Service