// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './components/App/App.js';

// import SignatureCanvas from 'react-signature-canvas'



// // ReactDOM.render(
// //     <SignatureCanvas penColor='green'
// //       canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />,
// //     document.getElementById('react-container')
// //   )

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App/App.js";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);