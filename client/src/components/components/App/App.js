import React from 'react';
import './App.css';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';
import Footer from '../Footer.jsx'
import Dropdown from './Dropdown';
import Header from '/Applications/MAMP/htdocs/Powder/client/src/components/App/Header.js';



function App() {

  return (
    <div className="App">
      <div>
        <Header/>
      </div>
      <h1 id='first'>Welcome Powder enthusiasts!</h1>
      <div className='entry'>
      <AddEntry />
      </div>
      <CurrentEntries />
      <hr />
      <h2 className='trail'>Trail Maps</h2>
	    <div className='drop'>
	    <Dropdown />
      </div>
       <hr />
      <Footer />
    </div>
  )
}

export default App;

