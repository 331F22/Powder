// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './components/App/App.js';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Admin from "./components/Admin";
import AddEntry from "./components/AddEntry";
import CurrentEntries from "./components/CurrentEntries";
import App from "./components/App/App";


export default function App2() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Admin" element={<Admin />} />
            <Route path="App" element={<App />} />
            {/* <Route path="AddEntry" element={<AddEntry />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  ReactDOM.render(<App2 />, document.getElementById("root"));

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);