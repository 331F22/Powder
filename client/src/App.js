import React from 'react';
import './App.css';

import AddEntry from './components/AddEntry.jsx';

import CurrentEntries from './components/CurrentEntries.jsx';

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

