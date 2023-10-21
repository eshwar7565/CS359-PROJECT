import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const MainLayout = () => {
  const {isLoggedIn} = useSelector((state) => state.auth) ;

  if (isLoggedIn) {
    return <Navigate to={"/src/App.js"} />;
  }
  return (
    <>
      <div>Main Layout</div>

      <Outlet />
    </>
  );
};

export default MainLayout;
