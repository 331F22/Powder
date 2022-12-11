import React from 'react';
import './App.css';
import Navbar from './components/Navbar/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Events from './pages/events';
import Volunteers from './pages/volunteers';

function App() {
  return (
    <div>
    	<Router>
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/volunteers' element={<Volunteers/>} />
          <Route path='/events' element={<Events/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;

