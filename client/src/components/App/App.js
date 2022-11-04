import React from 'react';
import './App.css';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';

function App() {

  return (
    <div className="App">
      <h1>Entries</h1>

      <AddEntry />
      <hr />
      <CurrentEntries />
    </div>
  )
}

export default App;

