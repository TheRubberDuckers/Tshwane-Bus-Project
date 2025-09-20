import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Map from './Map-Component'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id='MapContainer'>
        <MapComponent></MapComponent>
      </div>
    </>
  )
}

export default App
