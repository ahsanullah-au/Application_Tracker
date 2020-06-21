import React, { useState } from 'react';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import DocumentsPage from './Components/DocumentsPage/DocumentsPage';

export interface userType {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  numApps: number,
  lastAppDate: string
}

interface userDocsType {
  docID: string;
  fileName: string;
  fileURL: string;
}

export interface userDocsArrayType extends Array<userDocsType>{}

function App() {
  const [route, setRoute] = useState('SignIn');
  const [user, setUser] = useState<userType>({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    numApps: 0,
    lastAppDate: '',
  });

  const [userDocs, setUserDocs] = useState<userDocsArrayType>([{docID:"", fileName: "", fileURL: ""}])
  

  return (
    <div className="App">
      {
        (route === 'SignIn') ? <SignIn route={route} setRoute={setRoute} setUser={setUser} />
          : (route === 'Register') ? <Register route={route} setRoute={setRoute} setUser={setUser} />
            : (route === 'Docs') ? <DocumentsPage user={user} setRoute={setRoute} userDocs={userDocs} setUserDocs={setUserDocs} />
              :<Home user={user} setRoute={setRoute} setUser={setUser}  />
      }

    </div>
  );
}

export default App;
