import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Map from './Map-Component'
import './App.css'
import Banner from "./Components/Banner";


function App() {
return (
<div>
    <Banner />
    <p>Welcome to the City Of Tshwane Bus route</p>
</div>
);
  const [count, setCount] = useState(0)

  return (
    <>
      <div id='MapContainer'>
        <MapComponent></MapComponent>
      </div>
    </>
  )
}
export default App;
