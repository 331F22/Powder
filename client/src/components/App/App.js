import React from 'react';
import './App.css';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';
import SelectEvent from '../SelectEvent';
import Footer from '../Footer.jsx'

function App() {

  return (
    <div className="App">
      <h1>Entries</h1>
      <SelectEvent />
      <hr />
      <CurrentEntries />
      <hr />
      <AddEntry />
    </div>
  )
}

export default App;

