import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        <img src="https://uploads-ssl.webflow.com/57b4d56c1f986d4879b0574d/57be683a4177ba9b56ee367d_BSFsmall.png" width="118.5" height="53"></img>
                    </NavLink>
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink class = "loginNav" to="/login" activeStyle>
                        Login
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;