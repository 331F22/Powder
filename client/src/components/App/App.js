import React from 'react';
import './App.css';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';
import Dropdown from '../Dropdown.jsx';

function App() {

  return (
    <div className="App">
      <h1>Trail Maps</h1>
	  <hr />
	  <Dropdown />
      <hr />
    </div>
  )
}

export default App;

