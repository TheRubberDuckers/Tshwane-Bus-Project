import './App.css';
import Banner from "./Components/Banner";
import Background from "./Components/Background";

function App() {
  const appStyle = {
    margin: 0,
    backgroundColor: "white",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={{
      minHeight: "100vh",  
      width: "100%",    
      backgroundColor: "white",
      margin: 0,
      padding: 0,
      fontFamily: "Arial, sans-serif",
      }}>
      <div style={appStyle}>
        <Banner />
        <Background />
      </div>
    </div>
  );
}

export default App;

