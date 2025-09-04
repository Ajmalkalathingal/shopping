// src/components/Layout.jsx
import { lazy } from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = lazy(() => import("./nav"));

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
