import React from "react";
import {redirect, Route, Routes, useNavigate, withRouter} from "react-router-dom";
import Home from "./home";
import Admin from "./admin";


const Login = () => {
    let navigate = useNavigate();
    const routeChange = () =>{
        navigate('/admin');
    }
    return (
        <div id= "userInput">
            <h1 class = "LoginHeader">Login</h1>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="firstName" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="username" type="text" name="username" />
                </div><br />
                <div class= "center">
                    <button onClick={routeChange}>
                        Login
                    </button>
                    <Routes>
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
            </form>
        </div>
    );
};
export default Login;