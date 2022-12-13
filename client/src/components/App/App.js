import React from 'react';
import './App.css';
import VoucherManagement from '../UploadVouchers';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';
import Footer from '../Footer.jsx'

function App() {

  return (
  <>
    <h1 className='header'>BSF Volunteer Sign-up</h1>
    <div className="App">    
      <AddEntry />
      <hr />
      <CurrentEntries />
      <hr />
      <VoucherManagement />
      <hr />
      <Footer />
    </div>
  </> 
  )
}

export default App;

