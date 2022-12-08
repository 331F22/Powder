import React from "react";
import AddEntry from "../components/AddEntry";
import CurrentEntries from "../components/CurrentEntries";
import Footer from "../components/Footer-Broyles";
import MyGitHub from "../components/MyGitHub";

const Home = () => {
    return (
        <div className="App">
            {/*<img src = "https://uploads-ssl.webflow.com/57b4d56c1f986d4879b0574d/581d0395c6f121fb068e4d22_BSFlogo.jpg" width = "324px" height ="200px"></img>*/}
            <h1>Entries</h1>
            <AddEntry />
            <hr />
            <CurrentEntries />
            <hr />
            <Footer />
            <MyGitHub></MyGitHub>
        </div>
    );
};

export default Home;