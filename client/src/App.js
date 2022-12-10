import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { HashRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
import About from "./pages/about";
import Admin from "./pages/admin";

function App() {
    return (
        <Router>
            <div className="App">
            <Navbar />
            <Routes>
                <Route path = '/home' element ={<Home />} />
                <Route path = '/admin' element = {<Admin />} />
                <Route path = '/login' element ={<Login />} />
                {/* 👇️ react router link */}
                <Route path = '/about' element ={<About />} />
            </Routes>
            </div>
        </Router>

    )
}

export default App;

