//Main Component, used to store User and Doc data

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

export interface userDocsType {
  docID: string;
  fileName: string;
  fileURL: string;
}

export interface userDocsArrayType extends Array<userDocsType> { }

function App() {
  const [route, setRoute] = useState('SignIn');//Stores initial routes
  const [user, setUser] = useState<userType>({//Stores User data after signin
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    numApps: 0,
    lastAppDate: '',
  });

  const [userDocs, setUserDocs] = useState<userDocsArrayType>([{ docID: '', fileName: '', fileURL: '' }]);//Stores records of user's docs, and URL to the S3 hosted doc

  //Function to return the user's doc records from DB
  const getDocs = () => {
    if (user.id) {
      fetch(`https://obscure-dusk-24459.herokuapp.com/docAccess/${user.id}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((userApps) => {
          setUserDocs(userApps);
        });
    }
  };

  //Returns signin or register page at first, and then home page
  return (
    <div className="App">
      {
        (route === 'SignIn') ? <SignIn route={route} setRoute={setRoute} setUser={setUser} />
          : (route === 'Register') ? <Register route={route} setRoute={setRoute} setUser={setUser} />
            : (route === 'Docs') ? <DocumentsPage user={user} setRoute={setRoute} userDocs={userDocs} setUserDocs={setUserDocs} getDocs={getDocs} />
              : <Home user={user} setRoute={setRoute} setUser={setUser} userDocs={userDocs} getDocs={getDocs} />
      }

    </div>
  );
}

export default App;
