import React from 'react';
import './App.css';
import VoucherManagement from '../UploadVouchers';
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
      <VoucherManagement />
      <hr />
      <Footer />
    </div>
  )
}

export default App;

