import React from 'react';
import './App.css';
import { useState } from "react";
import EntryNstuff from '../EntryNstuff.jsx'
import Login from '../Login.jsx'
import Footer from '../Footer.jsx'

function App() {

  const [ Entry, setEntry ] = useState(false);
  const [ ShowLogin, setShowLogin ] = useState(false);

  const ShowEntries = () => {
    setEntry(true);
    setShowLogin(false);
  }


  const ViewLogin = () => {
    setEntry(false);
    setShowLogin(true);
  }

  return (
    <div className="App">
      <h1>BSF WebApp</h1>
      <div id="Menu">
        <button onClick={ShowEntries}>Load starting</button>
        <button onClick={ViewLogin}>View Login</button>
      </div>
      { Entry ? <EntryNstuff/> : null}
      {ShowLogin ? <Login/> : null}
      
    </div>
  )
}

export default App;

