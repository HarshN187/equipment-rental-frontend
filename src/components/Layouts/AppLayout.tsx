import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useCheckLogin } from "../../hooks/checkLogin";

function AppLayout() {
  useCheckLogin();

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar></Navbar>

        <Outlet></Outlet>
      </div>
    </>
  );
}

export default AppLayout;
