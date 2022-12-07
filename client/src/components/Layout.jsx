import React from "react";
import {Outlet} from "react-router-dom";
import PageNavBar from "../NavBar/PageNavBar";

const Layout = () => {
   
  return (
    <>
      <PageNavBar />
      <Outlet />
    </>
  );
};

export default Layout;