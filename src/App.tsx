import React, { useState } from 'react';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'

export interface userType {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  numApps: string,
  lastAppDate: string
}

function App() {
  const [route, setRoute] = useState("SignIn");
  const [user, setUser] = useState<userType>({
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
        (route === "SignIn") ? <SignIn route={route} setRoute={setRoute} setUser={setUser} /> :
          (route === 'Register') ? <Register route={route} setRoute={setRoute} setUser={setUser} /> :
            <Home user={user} setRoute={setRoute} setUser={setUser} />
      }

    </div>
  );
}

export default App;
