import React from 'react';
import './App.css';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';
import Footer from '../Footer.jsx'
import Navbar from '../../NavBar/PageNavBar';
import Layout from '../Layout';



function App() {

  return (
    <div>
        <div id='top_header'>
                <img id='header_img' src='https://uploads-ssl.webflow.com/57b4d56c1f986d4879b0574d/581d0395c6f121fb068e4d22_BSFlogo-p-1080x664.jpeg' />
                <h1>volunteer page</h1>
            </div>
      {/* <h1 id='home_page_header'>Entries</h1> */}
      <div className="App">
        <AddEntry />
        <hr />
        <Footer />
      </div>
    </div>
  )
}

export default App;

