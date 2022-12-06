import React from 'react';
import CurrentEntries from './CurrentEntries';


function Admin() {
    const top_container_style = {
        'width': '40%',
        // 'border': '3px solid black',
        // 'text-align': 'center'
    };

    return (
        <div>
            <h1 style={{'text-align': 'center'}}>Admin page</h1>
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
