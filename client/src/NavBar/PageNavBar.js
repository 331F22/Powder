import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './PageNavStyle.css'
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

const PageNavbar = () => {

  
  return (
    <div class="pos-f-t">
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <h4 class="text-white"> <Link to="/">User</Link></h4>
        <h4 class="text-white"> <Link to="/Admin">Admin</Link></h4>
        {/* <span class="text-muted"><Link to="/Admin">Admin</Link></span> */}
      </div>
    </div>
    <nav class="navbar navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
  </div> 
 
 
  //     <nav id="navbar-top">
  //   <ul>
  //     <li>
  //       <Link to="/">User</Link>
  //     </li>
  //     <li>
  //       <Link to="/Admin">Admin</Link>
  //     </li>
  //   </ul>
  // </nav>  

  
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