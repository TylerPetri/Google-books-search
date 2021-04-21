import React, { useState, useEffect, useRef } from 'react'
import BIRDS from 'vanta/dist/vanta.birds.min'
import Navbar from '../Navbar/Navbar'
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

const Vanta = () => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(BIRDS({
        el: myRef.current
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return <div ref={myRef} style={{minHeight: '100vh', backgroundColor: 'rgb(10, 25, 48)'}}>
    <Navbar/>
  </div>
}

export default Vanta