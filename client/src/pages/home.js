import React from "react";
import AddEntry from "../components/AddEntry";
import CurrentEntries from "../components/CurrentEntries";
import Footer from "../components/Footer";
import MyGitHub from "../components/MyGitHub";
import DisplayVouchers from "../components/DisplayVouchers";

const Home = () => {
    return (
        <div className="App">
            <h1>Entries</h1>
            <AddEntry />
            <hr />
            <CurrentEntries />
            <hr />
            <Footer />
        </div>
    );
};

export default Home;