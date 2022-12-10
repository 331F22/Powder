import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './PageNavStyle.css'

<div>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
  <link rel="stylesheet" type="text/css" href="PageNavStyle.css"></link>
</div>
const PageNavbar = () => {

  function promptMe() {
    var curr_href = window.location.href;
    if (!(curr_href === 'http://localhost:5068/Admin')) {
      var userAdjective = prompt("Enter the passcode.");
      if (!(userAdjective == "777")) {
        window.location.reload();
      }
    }
  }

  function reload_page() {
    window.location.reload();
  }
  

  return (
    
      <div class="pos-f-t" id="navbar">
        <div class="collapse navbar_dropdown" id="navbarToggleExternalContent">
          <div class="bg-light p-4">
            <h4 onClick={reload_page} class="text-white"> <Link to="/">User</Link></h4>
            <h4 onClick={reload_page} class="text-white"> <Link to="/Admin">Admin</Link></h4>
            {/* <span class="text-muted"><Link to="/Admin">Admin</Link></span> */}
          </div>
        </div>
        <nav class="navbar navbar-light bg-light" id="bottom_navbar">
          <button onClick={promptMe} class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="img_container">
            <img id="nav_bar_img" src="https://uploads-ssl.webflow.com/57b4d56c1f986d4879b0574d/57be683a4177ba9b56ee367d_BSFsmall.png" alt="logo" />
          </div>
        </nav>
      </div>
    
  );
}

export default PageNavbar;


// function PageNavbar() {

//   return (
//     <nav>
//     <ul>
//       <li>
//         <Link to="/">User</Link>
//       </li>
//       <li>
//         <Link to="/Admin">Admin</Link>
//       </li>
//     </ul>
//   </nav>   
//   );
// }
// export default PageNavbar;


   // <>
    //   <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
    //     <Container>
    //       <Navbar.Toggle aria-controls="responsive-navbar-nav" >
    //         <Navbar.Collapse id='responsive-navbar-nav' >
    //           <Nav>
    //             <Nav.Link href="/"><span class="nav_item">User</span></Nav.Link>
    //             <Nav.Link href="/Admin"><span class="nav_item">Admin</span></Nav.Link>
    //             <Nav.Link href="/Admin"><span class="nav_item">Admin</span></Nav.Link>
    //             <Nav.Link href="/Admin"><span class="nav_item">Admin</span></Nav.Link>
    //             <Nav.Link href="/Admin"><span class="nav_item">Admin</span></Nav.Link>
    //           </Nav>
    //         </Navbar.Collapse>
    //       </Navbar.Toggle>
    //     </Container>
    //   </Navbar>
    // </>