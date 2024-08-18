import React from "react";
import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export const PublicLayout = () => {
  const {auth} = useAuth()
  return (
    <>
      <Header></Header>
      <section className="layout__content">
        {!auth._id ?
        <Outlet></Outlet>
        : <Navigate to= "/social/"></Navigate>}
      </section>
    </>
  );
};
