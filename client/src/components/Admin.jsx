import React from 'react';
import CurrentEntries from './CurrentEntries';


function Admin() {
    const top_container_style = {
        'width': '100%',
        // 'border': '3px solid black',
        // 'text-align': 'center'
    };

    return (
        <div>
            <div id='top_header'>
                <img id='header_img' src='https://uploads-ssl.webflow.com/57b4d56c1f986d4879b0574d/581d0395c6f121fb068e4d22_BSFlogo-p-1080x664.jpeg' />
                <h1>Admin page</h1>
            </div>
            <hr />
            <div style={top_container_style}>
            <CurrentEntries />
            </div>
            
        </div>
    );
}

export default Admin;



// class Admin extends Component {
//   render() {
//     return (
//         <div>
//           <h2>This is the admin page.</h2>
//         </div>
//     );
//   }
// }

// export default Admin;

// function Admin() {

//   return (
//     <div className="Admin">
//       <h1>Entries</h1>
//       <h2>Welcome to the admin page</h2>
//       <hr />
//       <CurrentEntries />
//       <hr />
//       <Footer />
//     </div>
//   )
// }

// export default Admin;
