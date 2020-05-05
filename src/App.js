import React, { useState } from 'react';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register'

function App() {
  const [route, setRoute] = useState("SignIn");

  return (
    <div className="App">
      {
        (route === "SignIn")? <SignIn route={route} setRoute={setRoute} />:
        <Register route={route} setRoute={setRoute} />
      }

    </div>
  );
}

export default App;
