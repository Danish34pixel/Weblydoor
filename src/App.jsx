import React from 'react'
import Home from './Componenet/Home'

const App = () => {
  return (
    <div>
      <style>{`
        /* Hide scrollbar for all browsers */
        html, body {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
          overflow-y: scroll; /* Chrome, Safari and Opera */
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
      <Home/>
    </div>
  )
}

export default App