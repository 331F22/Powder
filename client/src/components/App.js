import React from 'react';
import './App.css';
//import Footer from '../Footer.jsx'
import Dropdown from './Dropdown';
import Header from './Header.js';
import Footer from './Footer.jsx';


function App() {

  return (
    <div className="App">
      <div>
        <Header/>
      </div>
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

