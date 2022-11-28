import React from 'react';
import './App.css';
import UploadVouchers from '../UploadVouchers';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';
import Footer from '../Footer.jsx'

function App() {

  return (
    <div className="App">    

      <h1>Entries</h1>
      <AddEntry />
      <hr />
      <CurrentEntries />
      <hr />
      <UploadVouchers />
      <hr />
      <Footer />
    </div>
  )
}

export default App;

