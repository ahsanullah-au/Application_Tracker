import React, { useState } from 'react';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'

function App() {
  const [route, setRoute] = useState("SignIn");
  const [user, setUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    numApps: "",
    lastAppDate: ""
  })

  return (
    <div className="App">
      {
        (route === "SignIn")? <SignIn route={route} setRoute={setRoute} setUser ={setUser}/>:
        (route === 'Register')?<Register route={route} setRoute={setRoute} setUser ={setUser}/>:
        <Home route={route} user={user} />
      }

    </div>
  );
}

export default App;
