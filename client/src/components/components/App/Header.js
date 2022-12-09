import React from "react";
import logo from '../BSF.png';
import './Header.css'

const Header = () =>{
    return(
        <nav>
            <div className="div-header">
                <div className="div-logo">
                    <img src={logo} alt="horse"/>
                </div>
            </div>
        </nav>
    )
}

export default Header;