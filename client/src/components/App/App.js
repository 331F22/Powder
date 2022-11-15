import React from 'react';
import './App.css';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';
import MyGitHub from '../MyGitHub.jsx';
import Footer from '../Footer-Broyles.jsx'

function App() {

    return (
        <div className="App">
            <h1>Entries</h1>

            <AddEntry />
            <hr />
            <CurrentEntries />
            <hr />
            <Footer />
            <MyGitHub></MyGitHub>
        </div>
    )
}

export default App;

