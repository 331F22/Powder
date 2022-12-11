import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements"

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <img class="bsfsmall" src="/photos/BSFsmall.png" alt="BSFLogoSmall" />
          <NavLink to="/" activeStyle>
            <div class='links'>Sign Up</div>
          </NavLink>
          <NavLink to="/volunteers" activeStyle>
          <div class='links'>Volunteers</div>
          </NavLink>
          <NavLink to="/events" activeStyle>
          <div class='links'>Events</div>
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;