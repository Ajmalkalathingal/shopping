// src/components/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./nav";

const Layout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar/>

      {/*  render the current page */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
